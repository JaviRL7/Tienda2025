# 🚀 Deployment Guide - Doña Araña Tienda

## Railway Deployment

### 1. Frontend Deployment
1. Connect your GitHub repository to Railway
2. Create a new service and select this repository
3. Set the following environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://your-backend.railway.app/api`)

### 2. Backend Deployment
1. Create another service for the backend
2. Set the following environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SPRING_PROFILES_ACTIVE`: `prod`

### 3. Database Setup
1. Add a PostgreSQL database to your Railway project
2. Use the connection string provided by Railway
3. Run database migrations if needed

### Build Configuration
- Frontend builds automatically using `npm run build`
- Backend builds using Maven: `mvn clean package`

### Files Created for Deployment
- `railway.json`: Railway configuration
- `nixpacks.toml`: Build configuration
- `.env.example`: Environment variables template

### Project Structure
```
tienda2025/
├── frontend/          # Next.js 15 application
├── backend/           # Spring Boot 3.2.1 application
├── railway.json       # Railway deploy config
├── nixpacks.toml      # Build configuration
└── .env.example       # Environment variables template
```

## Local Development
1. Start PostgreSQL database
2. Run backend: `./start-backend.sh`
3. Run frontend: `./start-frontend.sh`
4. Access: http://localhost:3000

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Spring Boot 3.2.1, Java 21, PostgreSQL
- **Deployment**: Railway, Nixpacks