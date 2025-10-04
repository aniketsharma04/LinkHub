#!/bin/bash

# LinkHub Development Setup Script
echo "🚀 Starting LinkHub Development Environment"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the LinkHub root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
echo ""

# Install root dependencies (if any)
echo "Installing root dependencies..."
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies  
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🚀 To start development:"
echo "  Frontend: npm run dev:frontend"
echo "  Backend:  npm run dev:backend"
echo "  Both:     npm run dev"
echo ""
echo "🔧 Available commands:"
echo "  npm run build         - Build frontend"
echo "  npm run typecheck     - TypeScript check"
echo "  npm run install:all   - Install all dependencies"
echo ""
echo "📂 Project structure:"
echo "  frontend/             - Next.js React app (port 3000)"
echo "  backend/              - Express.js API (port 5000)"
echo ""
echo "Happy coding! 🎉"