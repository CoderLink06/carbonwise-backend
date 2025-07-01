from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json
import os
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

# Carbon emission factors (kg CO2 per unit)
EMISSION_FACTORS = {
    'transport': {
        'car': 0.21,  # per km
        'bus': 0.05,  # per km
        'metro': 0.04,  # per km
        'flight_domestic': 0.255,  # per km
        'flight_international': 0.195,  # per km
        'bike': 0,
        'walk': 0
    },
    'energy': {
        'electricity': 0.43,  # per kWh
        'gas': 2.04,  # per cubic meter
        'heating_oil': 2.52  # per liter
    },
    'food': {
        'beef': 27.0,  # per kg
        'pork': 12.1,  # per kg
        'chicken': 6.9,  # per kg
        'fish': 6.1,  # per kg
        'dairy': 3.2,  # per kg
        'vegetables': 2.0,  # per kg
        'grains': 1.4  # per kg
    },
    'shopping': {
        'clothing': 33.4,  # per item
        'electronics': 300.0,  # per item
        'furniture': 150.0,  # per item
        'books': 1.8  # per item
    }
}

def extract_data_from_csv(file_content):
    """Extract carbon-relevant data from CSV using AI-like processing"""
    try:
        # Parse CSV content
        lines = file_content.strip().split('\n')
        header = lines[0].lower().split(',')
        
        extracted_activities = []
        
        for line in lines[1:]:
            values = line.split(',')
            row_data = dict(zip(header, values))
            
            # AI-like pattern recognition for different data types
            activity = {
                'type': 'unknown',
                'description': '',
                'amount': 0,
                'unit': '',
                'carbon_emissions': 0
            }
            
            # Transport pattern detection
            if any(word in ' '.join(row_data.values()).lower() for word in ['km', 'mile', 'drive', 'car', 'bus', 'train', 'flight']):
                activity['type'] = 'transport'
                # Extract distance and mode
                for key, value in row_data.items():
                    if 'distance' in key or 'km' in key:
                        activity['amount'] = float(re.findall(r'\d+\.?\d*', value)[0]) if re.findall(r'\d+\.?\d*', value) else 0
                        activity['unit'] = 'km'
                    if 'mode' in key or 'type' in key:
                        activity['description'] = value
                
                # Calculate emissions based on mode
                mode = activity['description'].lower()
                if 'car' in mode:
                    activity['carbon_emissions'] = activity['amount'] * EMISSION_FACTORS['transport']['car']
                elif 'bus' in mode:
                    activity['carbon_emissions'] = activity['amount'] * EMISSION_FACTORS['transport']['bus']
                elif 'train' in mode or 'metro' in mode:
                    activity['carbon_emissions'] = activity['amount'] * EMISSION_FACTORS['transport']['metro']
                elif 'flight' in mode:
                    activity['carbon_emissions'] = activity['amount'] * EMISSION_FACTORS['transport']['flight_domestic']
            
            # Energy pattern detection
            elif any(word in ' '.join(row_data.values()).lower() for word in ['kwh', 'electricity', 'gas', 'energy', 'bill']):
                activity['type'] = 'energy'
                for key, value in row_data.items():
                    if 'kwh' in key.lower() or 'usage' in key.lower():
                        activity['amount'] = float(re.findall(r'\d+\.?\d*', value)[0]) if re.findall(r'\d+\.?\d*', value) else 0
                        activity['unit'] = 'kWh'
                        activity['carbon_emissions'] = activity['amount'] * EMISSION_FACTORS['energy']['electricity']
                        activity['description'] = 'Electricity consumption'
            
            # Food pattern detection
            elif any(word in ' '.join(row_data.values()).lower() for word in ['food', 'meal', 'restaurant', 'grocery']):
                activity['type'] = 'food'
                activity['amount'] = 1
                activity['unit'] = 'meal'
                activity['carbon_emissions'] = 5.5  # Average meal
                activity['description'] = 'Food consumption'
            
            if activity['type'] != 'unknown':
                extracted_activities.append(activity)
        
        return extracted_activities
    
    except Exception as e:
        return []

def extract_data_from_bill(file_content, filename):
    """Extract data from utility bills using text analysis"""
    try:
        # Simple pattern matching for bills
        text = file_content.lower()
        activities = []
        
        # Electricity bill pattern
        if 'electricity' in text or 'kwh' in text:
            # Extract kWh usage
            kwh_matches = re.findall(r'(\d+\.?\d*)\s*kwh', text)
            if kwh_matches:
                kwh = float(kwh_matches[0])
                activities.append({
                    'type': 'energy',
                    'description': 'Electricity bill',
                    'amount': kwh,
                    'unit': 'kWh',
                    'carbon_emissions': kwh * EMISSION_FACTORS['energy']['electricity']
                })
        
        # Gas bill pattern
        if 'gas' in text or 'cubic meter' in text:
            gas_matches = re.findall(r'(\d+\.?\d*)\s*(cubic meter|m3)', text)
            if gas_matches:
                gas_usage = float(gas_matches[0][0])
                activities.append({
                    'type': 'energy',
                    'description': 'Gas bill',
                    'amount': gas_usage,
                    'unit': 'cubic meters',
                    'carbon_emissions': gas_usage * EMISSION_FACTORS['energy']['gas']
                })
        
        return activities
    
    except Exception as e:
        return []

def calculate_carbon_footprint(activities):
    """Calculate total carbon footprint and provide category breakdown"""
    categories = {
        'transport': {'total': 0, 'activities': []},
        'energy': {'total': 0, 'activities': []},
        'food': {'total': 0, 'activities': []},
        'shopping': {'total': 0, 'activities': []}
    }
    
    total_emissions = 0
    
    for activity in activities:
        category = activity['type']
        if category in categories:
            categories[category]['total'] += activity['carbon_emissions']
            categories[category]['activities'].append(activity)
            total_emissions += activity['carbon_emissions']
    
    return {
        'total_emissions': round(total_emissions, 2),
        'categories': categories,
        'breakdown': [
            {
                'category': cat,
                'emissions': round(data['total'], 2),
                'percentage': round((data['total'] / total_emissions * 100) if total_emissions > 0 else 0, 1)
            }
            for cat, data in categories.items()
        ]
    }

def generate_ai_suggestions(analysis_result):
    """Generate AI-powered suggestions based on carbon footprint analysis"""
    suggestions = []
    categories = analysis_result['categories']
    
    # Transport suggestions
    if categories['transport']['total'] > 50:
        suggestions.append({
            'type': 'alert',
            'category': 'transport',
            'title': 'High Transport Emissions',
            'description': f'Your transport emissions are {categories["transport"]["total"]:.1f}kg CO₂, which is above average.',
            'recommendation': 'Try using public transport or carpooling 2-3 times per week to reduce emissions by up to 40%.',
            'potential_savings': categories['transport']['total'] * 0.4
        })
    
    # Energy suggestions
    if categories['energy']['total'] > 30:
        suggestions.append({
            'type': 'tip',
            'category': 'energy',
            'title': 'Energy Optimization',
            'description': f'Your energy consumption generated {categories["energy"]["total"]:.1f}kg CO₂.',
            'recommendation': 'Switch to LED bulbs and use energy-efficient appliances to reduce consumption by 15-20%.',
            'potential_savings': categories['energy']['total'] * 0.18
        })
    
    # Food suggestions
    if categories['food']['total'] > 20:
        suggestions.append({
            'type': 'tip',
            'category': 'food',
            'title': 'Sustainable Diet',
            'description': f'Food choices contributed {categories["food"]["total"]:.1f}kg CO₂ to your footprint.',
            'recommendation': 'Reduce meat consumption by 1-2 meals per week and choose local, seasonal produce.',
            'potential_savings': categories['food']['total'] * 0.25
        })
    
    # Achievement suggestions
    if analysis_result['total_emissions'] < 100:
        suggestions.append({
            'type': 'achievement',
            'category': 'overall',
            'title': 'Eco Champion!',
            'description': 'Your carbon footprint is below the recommended monthly target.',
            'recommendation': 'Keep up the excellent work and inspire others to follow your example!',
            'potential_savings': 0
        })
    
    return suggestions

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload and data extraction"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        file_content = file.read().decode('utf-8')
        filename = file.filename.lower()
        
        # Process different file types
        if filename.endswith('.csv'):
            extracted_data = extract_data_from_csv(file_content)
        elif filename.endswith(('.pdf', '.txt')):
            extracted_data = extract_data_from_bill(file_content, filename)
        else:
            return jsonify({'error': 'Unsupported file type'}), 400
        
        return jsonify({
            'success': True,
            'extracted_data': extracted_data,
            'message': f'Successfully extracted {len(extracted_data)} activities from {file.filename}'
        })
    
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_carbon_footprint():
    """Analyze carbon footprint from uploaded data and manual inputs"""
    try:
        data = request.get_json()
        
        all_activities = []
        
        # Add extracted data from files
        if 'extracted_data' in data:
            all_activities.extend(data['extracted_data'])
        
        # Add manual activities
        if 'manual_activities' in data:
            for activity in data['manual_activities']:
                if activity.get('type') and activity.get('value'):
                    # Calculate emissions based on type and amount
                    emissions = 0
                    activity_type = activity['type']
                    amount = float(activity['value'])
                    
                    if activity_type == 'transport':
                        # Default to car emissions if mode not specified
                        emissions = amount * EMISSION_FACTORS['transport']['car']
                    elif activity_type == 'energy':
                        emissions = amount * EMISSION_FACTORS['energy']['electricity']
                    elif activity_type == 'food':
                        emissions = amount * 5.5  # Average meal
                    elif activity_type == 'shopping':
                        emissions = amount * 20  # Average shopping item
                    
                    all_activities.append({
                        'type': activity_type,
                        'description': activity.get('description', ''),
                        'amount': amount,
                        'unit': activity.get('unit', ''),
                        'carbon_emissions': emissions
                    })
        
        # Calculate carbon footprint
        analysis_result = calculate_carbon_footprint(all_activities)
        
        # Generate AI suggestions
        suggestions = generate_ai_suggestions(analysis_result)
        
        # Calculate weekly trend data (mock data for demo)
        weekly_data = [
            {'week': 'Week 1', 'emissions': analysis_result['total_emissions'] * 1.2, 'target': 150},
            {'week': 'Week 2', 'emissions': analysis_result['total_emissions'] * 1.1, 'target': 150},
            {'week': 'Week 3', 'emissions': analysis_result['total_emissions'] * 1.05, 'target': 150},
            {'week': 'Week 4', 'emissions': analysis_result['total_emissions'], 'target': 150}
        ]
        
        result = {
            'success': True,
            'analysis': {
                'total_emissions': analysis_result['total_emissions'],
                'breakdown': analysis_result['breakdown'],
                'weekly_trend': weekly_data,
                'suggestions': suggestions,
                'eco_score': max(0, min(100, 100 - (analysis_result['total_emissions'] / 200 * 100))),
                'comparison': {
                    'vs_target': analysis_result['total_emissions'] - 150,
                    'vs_average': analysis_result['total_emissions'] - 180
                }
            },
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'Error analyzing data: {str(e)}'}), 500

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    """Get dashboard data for logged-in user"""
    try:
        # In a real app, this would fetch data from database based on user ID
        # For demo, return mock data
        
        dashboard_data = {
            'user': {
                'name': 'Sarah Johnson',
                'email': 'sarah@example.com',
                'eco_level': 'EcoStarter',
                'streak_days': 7
            },
            'current_month': {
                'total_emissions': 156.7,
                'target': 150,
                'trend': -18,  # percentage change
                'eco_score': 82
            },
            'categories': [
                {'name': 'Transport', 'emissions': 68.4, 'percentage': 44, 'trend': -12},
                {'name': 'Energy', 'emissions': 45.2, 'percentage': 29, 'trend': 8},
                {'name': 'Food', 'emissions': 28.7, 'percentage': 18, 'trend': -5},
                {'name': 'Shopping', 'emissions': 14.4, 'percentage': 9, 'trend': 3}
            ],
            'weekly_trend': [
                {'week': 'Week 1', 'emissions': 180, 'target': 150},
                {'week': 'Week 2', 'emissions': 165, 'target': 150},
                {'week': 'Week 3', 'emissions': 170, 'target': 150},
                {'week': 'Week 4', 'emissions': 157, 'target': 150}
            ],
            'recent_activities': [
                {'activity': 'Took metro to work', 'time': '2 hours ago', 'impact': -2.1, 'type': 'positive'},
                {'activity': 'Used reusable coffee cup', 'time': '4 hours ago', 'impact': -0.1, 'type': 'positive'},
                {'activity': 'Ordered food delivery', 'time': 'Yesterday', 'impact': 1.8, 'type': 'negative'}
            ]
        }
        
        return jsonify(dashboard_data)
    
    except Exception as e:
        return jsonify({'error': f'Error fetching dashboard data: {str(e)}'}), 500

@app.route('/api/ping', methods=['GET'])
def ping():
    """Health check endpoint"""
    return jsonify({'message': 'Carbonwise API is running!', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
