# MERN Auth Boilerplate (JWT + Refresh + Roles)

Secure auth starter with:
- React + Vite + TS + Tailwind
- Express + MongoDB + JWT (access + refresh tokens in HttpOnly cookie)
- Role-based routes (user/admin), ProtectedRoute, Axios interceptors

## 1) Quick Start (Dev, <10 min)

### Prereqs
- Node 20 (`nvm use 20`)
- MongoDB Atlas cluster (URI)
- Two terminals

### Env
Create `server/.env` from `.env.example`:


### Install
```bash
# server
cd server && npm i

# client
cd ../client && npm i
```