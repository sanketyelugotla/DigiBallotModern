# 🗳️ DigiBallot

DigiBallot is a secure, real-time digital voting platform built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The system allows **Admins** to create elections, **Candidates** to register for elections, and **Voters** to cast their votes. Admin approval is required before candidates and voters can participate. The app is containerized using Docker and deployed on Vercel.

---

## 🌐 Live Demo

[🔗 View Live Site](https://your-vercel-link.vercel.app)  
[📦 Backend API on Vercel](https://your-backend-api-link.vercel.app)

---

## 📑 Table of Contents

- [Features](#-features)
- [Technologies Used](#️-technologies-used)
- [Getting Started](#-getting-started)
  - [Option 1: Run with Docker](#option-1-run-with-docker)
  - [Option 2: Run Frontend and Backend Individually](#option-2-run-frontend-and-backend-individually)
- [Environment Variables](#-environment-variables)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🧠 Features

### ✅ Authentication & Roles

- JWT-based login system
- Role-based dashboards for Voter, Candidate, and Admin
- Users must be verified by Admin before participating

### 🗳️ Voting System

- Admins create elections and manage users
- Voters can vote **once per election**
- Real-time vote counting and results display
- Candidates can view elections and their participation status

### 📊 Admin Panel

- Approve/Reject voters and candidates
- Create and manage elections and parties
- View result analytics

### 🛡️ Security

- JWT stored in HttpOnly cookies
- Middleware-protected routes for role-specific actions
- Vote submission secured with validations

### 🐳 DevOps

- Fully containerized with Docker
- MongoDB Atlas as the database
- CI/CD-ready and deployable on Vercel

---

## ⚙️ Technologies Used

| Frontend                | Backend                  | DevOps & DB           |
|-------------------------|--------------------------|------------------------|
| React (Vite)            | Node.js + Express        | Docker                 |
| Tailwind CSS            | MongoDB + Mongoose       | MongoDB Atlas          |
| JWT Authentication      | RESTful API              | Vercel Deployment      |
| Framer Motion + Charts  | Role-based Middleware    | Docker Compose         |

---

## 🚀 Getting Started

### ✅ Option 1: Run with Docker

#### 📦 Prerequisites

- [Docker](https://www.docker.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)

#### 🛠️ Setup

```bash
git clone https://github.com/yourusername/DigiBallot.git
cd DigiBallot
docker-compose up --build
```
