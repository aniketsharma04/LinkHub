# LinkHub - Link Aggregation Platform

A modern link aggregation platform similar to Linktree, built with Next.js frontend and Express.js backend.

## 📁 Project Structure

```
LinkHub/
├── frontend/           # Next.js React application
│   ├── app/           # App router pages and API routes
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utility functions and configurations
│   ├── hooks/        # Custom React hooks
│   └── package.json  # Frontend dependencies
├── backend/           # Express.js API server
│   ├── routes/       # API route handlers
│   ├── models/       # Database models
│   ├── middleware/   # Custom middleware
│   ├── lib/         # Backend utilities
│   ├── server.js    # Express server entry point
│   └── package.json # Backend dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:3000`

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend will run on `http://localhost:5000`

## 🔧 Environment Variables

Create `.env.local` files in both frontend and backend directories:

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 📦 Features

- 🔐 User authentication (signup/login)
- 👤 Profile customization
- 🔗 Link management (add/edit/delete)
- 🎨 Theme customization
- 📱 Responsive design
- 🚀 Fast and optimized

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/UI** - UI components
- **Lucide Icons** - Icons

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🔄 Development Workflow

1. Start MongoDB (local or Atlas)
2. Start backend server: `cd backend && npm run dev`
3. Start frontend server: `cd frontend && npm run dev`
4. Open `http://localhost:3000` in browser

## 📝 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/links` - Get user links
- `POST /api/links` - Create new link
- `PUT /api/links/:id` - Update link
- `DELETE /api/links/:id` - Delete link
- `GET /api/public/:username` - Get public profile

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set environment variables
3. Deploy

### Backend (Railway/Heroku)
1. Connect your GitHub repo
2. Set environment variables
3. Deploy

## 📄 License

MIT License - see LICENSE file for details.