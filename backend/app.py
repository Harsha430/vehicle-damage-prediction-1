import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from ultralytics import YOLO
import cv2
from datetime import datetime
import traceback
import numpy as np
import google.generativeai as genai
from PIL import Image
import io
import base64

app = Flask(__name__)
# Enable detailed logging
logging.basicConfig(level=logging.DEBUG)

# Configure CORS with more explicit settings
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"],
                                "allow_headers": ["Content-Type", "Authorization"]}})

# Configuration
UPLOAD_FOLDER = 'static/uploads'
RESULTS_FOLDER = 'static/results'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULTS_FOLDER'] = RESULTS_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Configure Gemini API
genai.configure(api_key='AIzaSyCaiCtwdbOuUrWmuR6Z_RZPSPKj4v5dHT0')
model = genai.GenerativeModel('gemini-1.5-flash')

# Load YOLO model
try:
    model = YOLO('models/best.pt')
    print("✅ YOLO model loaded")
except Exception as e:
    print("❌ Error loading model:", e)
    model = None  # Allow server to start even if model fails to load for debugging

# Severity and cost mappings
DAMAGE_SEVERITY = {
    'bonnet': {'minor': 1, 'moderate': 2, 'severe': 3},
    'bumper': {'minor': 1, 'moderate': 2, 'severe': 3},
    'dickey': {'minor': 1, 'moderate': 2, 'severe': 3},
    'door': {'minor': 1, 'moderate': 2, 'severe': 4},
    'fender': {'minor': 1, 'moderate': 2, 'severe': 3},
    'light': {'minor': 1, 'moderate': 2, 'severe': 3},
    'windshield': {'minor': 1, 'moderate': 3, 'severe': 4}
}

# Update the REPAIR_COSTS dictionary with realistic Indian Rupee values
REPAIR_COSTS = {
    'bonnet': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 25000  # Severe denting or replacement
    },
    'bumper': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 20000  # Complete bumper replacement
    },
    'dickey': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 25000  # Trunk lid replacement
    },
    'door': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 30000  # Door panel replacement
    },
    'fender': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 20000  # Fender replacement
    },
    'light': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 15000  # Complete light assembly replacement
    },
    'windshield': {
        'minor': 5000,
        'moderate': 10000,
        'severe': 20000  # Full windshield replacement
    }
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_image(file_path):
    img = cv2.imread(file_path)
    return img is not None, "Invalid image" if img is None else None

def get_severity(confidence):
    if confidence < 0.4:
        return 'minor'
    elif confidence < 0.7:
        return 'moderate'
    return 'severe'

def generate_repair_suggestion(damage_type, severity):
    suggestions = {
        'bonnet': {
            'minor': "Light dent repair and touch-up paint",
            'moderate': "Dent removal and repainting required",
            'severe': "Bonnet replacement recommended"
        },
        'bumper': {
            'minor': "Scratch repair and polish",
            'moderate': "Bumper repair and repainting needed",
            'severe': "Bumper replacement required"
        },
        'dickey': {
            'minor': "Small dent repair",
            'moderate': "Panel beating and repainting",
            'severe': "Trunk lid replacement needed"
        },
        'door': {
            'minor': "Door ding repair",
            'moderate': "Door panel repair and painting",
            'severe': "Complete door replacement"
        },
        'fender': {
            'minor': "Small dent repair",
            'moderate': "Fender repair and repainting",
            'severe': "Fender replacement required"
        },
        'light': {
            'minor': "Lens polishing",
            'moderate': "Light assembly repair",
            'severe': "Complete light replacement"
        },
        'windshield': {
            'minor': "Chip repair possible",
            'moderate': "Partial windshield replacement",
            'severe': "Full windshield replacement required"
        }
    }
    return suggestions.get(damage_type.lower(), {}).get(severity.lower(), "Professional inspection recommended")

def estimate_repair_cost(damage_type, severity):
    base = REPAIR_COSTS.get(damage_type.lower(), {}).get(severity.lower(), 0)
    # Add 15% variance for high/low estimates
    return {'low': int(base * 0.85), 'high': int(base * 1.15)}

def analyze_damage(image_path):
    # Load and process image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not load image")
    
    # Convert image to base64 for Gemini
    with open(image_path, 'rb') as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
    
    # Prepare prompt for Gemini
    prompt = f"""
    Analyze this car damage image and provide:
    1. Overall severity (mild, moderate, severe)
    2. Repair urgency (immediate, soon, later)
    3. List of detected damages with:
       - Component type
       - Severity level
       - Repair suggestion
       - Confidence score
       - Cost estimate range (low and high)
    
    Image: {img_base64}
    """
    
    # Get response from Gemini
    response = model.generate_content(prompt)
    
    # Process Gemini's response
    try:
        # Parse the response to extract structured data
        # This is a simplified example - you'll need to adjust based on Gemini's actual response format
        analysis = {
            "overall_severity": "severe",  # Extract from response
            "repair_urgency": "immediate",  # Extract from response
            "detections": [
                {
                    "type": "Bumper",
                    "severity": "moderate",
                    "repair_suggestion": "Bumper repair and repainting needed",
                    "confidence": 0.85,
                    "cost_estimate": {
                        "low": 200,
                        "high": 500
                    }
                }
                # Add more detections as needed
            ]
        }
        
        # Generate annotated image (you can use your existing CV code here)
        annotated_image_path = os.path.join(app.config['RESULTS_FOLDER'], f'result_{os.path.basename(image_path)}')
        cv2.imwrite(annotated_image_path, image)  # This is a placeholder - add actual annotation
        
        return {
            "original_image": f"/static/uploads/{os.path.basename(image_path)}",
            "annotated_image": f"/static/results/{os.path.basename(annotated_image_path)}",
            **analysis
        }
        
    except Exception as e:
        print(f"Error processing Gemini response: {e}")
        raise

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response
    
    try:
        app.logger.info("Received upload request")
        
        if 'file' not in request.files:
            app.logger.error("No file in request")
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        app.logger.info(f"File received: {file.filename}")
        
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        app.logger.info(f"File saved to {filepath}")

        valid, msg = validate_image(filepath)
        if not valid:
            os.remove(filepath)
            return jsonify({'error': msg}), 400

        # Check if model is loaded
        if model is None:
            return jsonify({'error': 'Model not loaded. Server is in debug mode.'}), 500

        img = cv2.imread(filepath)
        app.logger.info("Running inference on image")
        results = model(img)

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        result_filename = f"result_{timestamp}.jpg"
        result_path = os.path.join(RESULTS_FOLDER, result_filename)
        annotated_img = results[0].plot()
        cv2.imwrite(result_path, annotated_img)
        app.logger.info(f"Annotated image saved to {result_path}")

        detections = []
        max_severity = 0

        if len(results[0].boxes) > 0:
            for box in results[0].boxes:
                cls_id = int(box.cls[0])
                damage_type = results[0].names[cls_id]
                confidence = float(box.conf[0])
                severity = get_severity(confidence)
                severity_score = DAMAGE_SEVERITY.get(damage_type.lower(), {}).get(severity, 0)
                max_severity = max(max_severity, severity_score)

                detections.append({
                    'type': damage_type,
                    'confidence': confidence,
                    'severity': severity,
                    'bbox': box.xyxy[0].tolist(),
                    'repair_suggestion': generate_repair_suggestion(damage_type, severity),
                    'cost_estimate': estimate_repair_cost(damage_type, severity)
                })
        else:
            detections.append({
                'type': 'No damage detected',
                'confidence': 0,
                'severity': 'none',
                'bbox': [0, 0, 0, 0],
                'repair_suggestion': 'No repairs needed',
                'cost_estimate': {'low': 0, 'high': 0}
            })

        if max_severity >= 4:
            overall_severity = 'critical'
        elif max_severity >= 3:
            overall_severity = 'severe'
        elif max_severity >= 2:
            overall_severity = 'moderate'
        elif max_severity >= 1:
            overall_severity = 'minor'
        else:
            overall_severity = 'none'

        # Return full URL so React can access the images
        base_url = request.host_url.rstrip('/')
        response = {
            'status': 'success',
            'original_image': f"{base_url}/static/uploads/{filename}",
            'annotated_image': f"{base_url}/static/results/{result_filename}",
            'detections': detections,
            'overall_severity': overall_severity,
            'repair_urgency': 'immediate' if overall_severity in ['severe', 'critical'] else 'soon' if overall_severity == 'moderate' else 'when convenient',
            'timestamp': datetime.now().isoformat()
        }
        
        app.logger.info("Successfully processed image")
        return jsonify(response)
    
    except RequestEntityTooLarge:
        app.logger.error("File too large")
        return jsonify({'error': 'File too large. Maximum size is 16MB.'}), 413
    except Exception as e:
        app.logger.error(f"Error processing upload: {str(e)}")
        app.logger.error(traceback.format_exc())
        return jsonify({'error': f'Server error: {str(e)}'}), 500

# Add this fallback route for /upload to catch misrouted requests
@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_file_fallback():
    app.logger.info("Received request to /upload, redirecting to /api/upload")
    return upload_file()

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

# Add a health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'model_loaded': model is not None}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)