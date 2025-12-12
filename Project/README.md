# Minimal MERN Ticket CRUD (no CSS)

## Backend (Express + MongoDB)
1) In `backend/`, create `.env` with:
```
MONGODB_URI=your_atlas_uri
PORT=4000
```
2) Install deps (already added): `cd backend && npm install`
3) Run dev: `npm run dev` (nodemon) or prod: `npm start`

Endpoints:
- GET/POST `http://localhost:4000/tickets`
- GET/PUT/DELETE `http://localhost:4000/tickets/:id`

## Frontend (React + Vite)
1) `cd frontend && npm install` (already done by scaffolder)
2) Create `frontend/.env` if API not localhost:
```
VITE_API_URL=http://localhost:4000
```
3) Run: `npm run dev` (Vite on 5173)

## Flow
- Create tickets with title, eventDate, price, quantity.
- List, edit inline, delete; refresh button re-fetches.

## Quick test
- Start backend, frontend.
- Open Vite URL, create a ticket, edit, delete; verify updates in MongoDB Atlas.

