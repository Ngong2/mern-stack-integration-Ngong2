# MERN Blog Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains a **full-stack MERN (MongoDB, Express, React, Node.js) blog application** with separate **frontend** and **backend** directories.

- **Frontend**: React + Vite (see [frontend README](./frontend/mern-blog-frontend/README.md))
- **Backend**: Node.js + Express + MongoDB (see [backend README](./Backend/README.md))

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [License](#license)

---

## Project Structure

mern-stack-integration-Ngong2/
├─ Backend/ # Backend API
├─ frontend/
│ └─ mern-blog-frontend/ # Frontend React app
├─ .gitignore
└─ README.md

yaml
Copy code

---

## Getting Started

For detailed setup and usage instructions:

- **Frontend**: [frontend README](./frontend/mern-blog-frontend/README.md)  
- **Backend**: [backend README](./Backend/README.md)

---

## License

This project is licensed under the MIT License.
2️⃣ Frontend README.md (frontend/mern-blog-frontend/README.md)
markdown
Copy code
# MERN Blog Frontend

This is the **frontend** of the MERN Blog Project, built with **React** and **Vite**.

---

## Features

- Responsive UI
- User authentication (register/login/logout)
- CRUD for blog posts
- Search and pagination
- Axios integration with backend API

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- CSS / Bootstrap

---

## Setup

### 1. Install dependencies

```bash
npm install
2. Create environment variables
Create .env in this folder:

bash
Copy code
VITE_API_URL=http://localhost:5000/api
3. Start development server
bash
Copy code
npm run dev
The app will run on http://localhost:5173.

Usage
Open browser and navigate to the app

Register a new user or login

Manage blog posts using the UI

All API requests communicate with the backend

License
MIT

yaml
Copy code

---

## **3️⃣ Backend `README.md` (`Backend/README.md`)**

```markdown
# MERN Blog Backend

This is the **backend** of the MERN Blog Project, built with **Node.js**, **Express**, and **MongoDB**.

---

## Features

- RESTful API for blog posts
- User authentication with JWT
- Password hashing with bcryptjs
- Pagination and search endpoints

---

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv

---

## Setup

### 1. Install dependencies

```bash
npm install
2. Create environment variables
Create .env in this folder:

ini
Copy code
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
3. Start backend server
bash
Copy code
npm run dev
Server runs on http://localhost:5000.

API Endpoints
POST /api/auth/register - Register new user

POST /api/auth/login - Login user

GET /api/posts - Get posts

POST /api/posts - Create a post

PUT /api/posts/:id - Update a post

DELETE /api/posts/:id - Delete a post

License
MIT

yaml
Copy code

---

✅ **Benefits of this approach:**

1. Frontend and backend can be **cloned and used independently**.  
2. Root README gives a **clear overview** of the project.  
3. Clean separation prevents confusion for other developers.  

---

I can also make a **ready-to-copy folder structure with all three READMEs** fully formatted for GitHub, so you just place them in the repo.  