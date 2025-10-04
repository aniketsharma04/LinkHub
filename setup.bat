@echo off
echo 🚀 Starting LinkHub Development Environment
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the LinkHub root directory
    exit /b 1
)

echo 📦 Installing dependencies...
echo.

REM Install root dependencies (if any)
echo Installing root dependencies...
call npm install

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install backend dependencies
echo Installing backend dependencies...
cd backend  
call npm install
cd ..

echo.
echo ✅ All dependencies installed!
echo.
echo 🚀 To start development:
echo   Frontend: npm run dev:frontend
echo   Backend:  npm run dev:backend  
echo   Both:     npm run dev
echo.
echo 🔧 Available commands:
echo   npm run build         - Build frontend
echo   npm run typecheck     - TypeScript check
echo   npm run install:all   - Install all dependencies
echo.
echo 📂 Project structure:
echo   frontend/             - Next.js React app (port 3000)
echo   backend/              - Express.js API (port 5000)
echo.
echo Happy coding! 🎉
pause