# Task Manager — MERN Stack

A full-stack task management app built with MongoDB, Express, React, and Node.js. Supports user authentication (JWT) and per-user task CRUD with real-time optimistic UI updates.

---

## Features

- **Auth** — Register / Login with JWT (7-day expiry), bcrypt password hashing
- **Protected routes** — Frontend and backend both guard unauthenticated access
- **Task CRUD** — Create, read, update (title), toggle (complete/incomplete), delete
- **Optimistic UI** — Toggle and delete update instantly, revert on server error
- **Filter tabs** — All / Active / Completed with live counts
- **Inline editing** — Double-click a task or press Edit to rename in place
- **Error handling** — Centralized Express error middleware; 401 auto-redirects to login

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, React Router v6 |
| Backend   | Node.js, Express                        |
| Database  | MongoDB, Mongoose                       |
| Auth      | JWT (`jsonwebtoken`), bcryptjs          |

---

## Project Structure

```
task-manager/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js      # register / login API calls
│   │   │   └── tasks.js     # CRUD API calls (auto-attaches Bearer token)
│   │   ├── components/
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # user state, signin/signup/logout
│   │   ├── hooks/
│   │   │   └── useTaskApi.js    # all task state + API logic
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── server/                  # Express backend
    ├── controllers/
    │   ├── authController.js
    │   └── taskController.js
    ├── middleware/
    │   ├── authMiddleware.js    # JWT protect middleware
    │   └── errorMiddleware.js  # notFound + errorHandler
    ├── models/
    │   ├── Task.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── taskRoutes.js
    ├── .env
    ├── package.json
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Task-Manager-App.git
cd Task-Manager-App
```

---

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_super_secret_key_here
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3. Setup the frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

### Server (`server/.env`)

| Variable        | Description                        |
|-----------------|------------------------------------|
| `PORT`          | Port the Express server listens on |
| `MONGO_URI`     | MongoDB connection string          |
| `JWT_SECRET`    | Secret key for signing JWTs        |
| `CLIENT_ORIGIN` | Allowed CORS origin (frontend URL) |
| `NODE_ENV`      | `development` or `production`      |

### Client (`client/.env`)

| Variable        | Description                  |
|-----------------|------------------------------|
| `VITE_API_URL`  | Base URL of the Express API  |

---

## Scripts

### Server

```bash
npm run dev    # Start with nodemon (hot reload)
npm start      # Start in production
```

### Client

```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run preview # Preview production build
```

---

## Deployment Notes

- Set `NODE_ENV=production` on the server to hide error stack traces
- Set `CLIENT_ORIGIN` to your deployed frontend URL to avoid CORS issues
- Use a strong random string for `JWT_SECRET` in production
- For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string

---

## Author

**Afrooz Habib**
