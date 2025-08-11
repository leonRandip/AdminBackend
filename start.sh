#!/bin/bash

# Copy config file to .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from config.env..."
    cp config.env .env
    echo "Please update .env with your database credentials before starting"
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the application
echo "Starting Job Management Backend..."
npm run start:dev
