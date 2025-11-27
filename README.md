# Request Management System  
Full-stack application with authentication, role-based access (Employee + Manager), request creation, approval, rejection, and dashboards.

## 📁 Project Structure

root/
 ├── backend/     # Node.js + Express + PostgreSQL + Drizzle ORM
 ├── frontend/    # React + Vite + Redux Toolkit
 └── README.md

# 🚀 Backend (Node.js + Express)

## ✔ Tech Stack
- Node.js + Express
- PostgreSQL
- Drizzle ORM
- JWT Authentication
- Bcrypt for hashing
- Helmet, CORS, Morgan
- Node Cache
- Prometheus Metrics

## 📦 Installation

cd backend
npm install

## ⚙️ Environment Variables (`.env`)

PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/yourdb
JWT_SECRET=supersecretkey

## ▶️ Run Backend

npm run dev
npm start

## 🧪 API Endpoints

### Auth Routes
POST /auth/signup  
POST /auth/login  
GET /auth/manager  

### Request Routes
POST /requests  
GET /requests/my  
GET /requests/pending  
GET /requests/:id  
PATCH /requests/:id/approve  
PATCH /requests/:id/reject  

# 🎨 Frontend (React + Vite)

## ✔ Tech Stack
React, Vite, Redux Toolkit, Axios, Router DOM

## 📦 Installation

cd frontend  
npm install

## ⚙️ Environment Variables (`.env`)

VITE_API_URL=http://localhost:5000

## ▶️ Run Frontend

npm run dev

# 🛡 ProtectedRoute (Summary)

- Redirects unauthenticated → /signin  
- Redirects wrong role → dashboard  
- Loads children when valid  

# 🛠 Scripts

Backend:
- npm run dev
- npm start
- npm run db:push
- npm run db:studio

Frontend:
- npm run dev
- npm run build
- npm run preview

Postman collection:
- https://documenter.getpostman.com/view/29785161/2sB3dLSr6T

# ❤️ Created by Abishek
