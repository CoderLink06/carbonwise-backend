#!/usr/bin/env python3
"""
Carbonwise Backend Server
Start script for the Flask API server
"""

import sys
import os
import subprocess


def install_requirements():
    """Install Python requirements if needed"""
    try:
        import flask
        import flask_cors
        import pandas
        print("✅ All Python dependencies are installed")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("📦 Installing Python requirements...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully")

def start_server():
    """Start the Flask development server"""
    print("🚀 Starting Carbonwise Backend Server...")
    print("📍 API will be available at: http://localhost:5000")
    print("🔗 Endpoints:")
    print("   - GET  /api/ping           - Health check")
    print("   - POST /api/upload         - File upload & data extraction")
    print("   - POST /api/analyze        - Carbon footprint analysis")
    print("   - GET  /api/dashboard      - Dashboard data")
    print("\n" + "="*50)
    
    os.chdir('server')
    os.system("python carbon_analyzer.py")


if __name__ == "__main__":
    print("🌱 Carbonwise - AI-Powered Carbon Footprint Analysis")
    print("=" * 50)
    
    install_requirements()
    start_server()
