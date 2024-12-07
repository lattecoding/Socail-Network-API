#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install || { echo "npm install failed"; exit 1; }

# Build the TypeScript files
echo "Building TypeScript files..."
npm run build || { echo "Build failed"; exit 1; }

# Seed the database
echo "Seeding the database..."
npm run seed || { echo "Seeding failed"; exit 1; }

echo "Setup complete!"
