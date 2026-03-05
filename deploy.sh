#!/bin/bash
# Custom deployment script for Azure App Service (Kudu)
# Ensures npm install and build run so dist/ exists before startup
set -e
echo "Installing dependencies..."
npm install
echo "Building application..."
npm run build
echo "Deployment build complete."
