# 🗳️ DigiBallot

DigiBallot is a secure, real-time digital voting platform built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The system allows **Admins** to create elections, **Candidates** to register for elections, and **Voters** to cast their votes. Admin approval is required before candidates and voters can participate. The app is containerized using Docker and deployed on Vercel.

---

## 🌐 Live Demo

[🔗 View Live Site](https://digiballot-frontend.onrender.com/)

---

## 📑 Table of Contents

- [Features](#-features)
- [Technologies Used](#️-technologies-used)
- [Project Setup](#project-setup)
- [Getting Started](#-getting-started)
  - [Option 1: Run with Docker](#-option-1-run-with-docker)
  - [Option 2: Run Frontend and Backend Individually](#-option-2-run-frontend-and-backend-individually)
- [Running the project](#running-the-project)

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

## Project Setup

Before you begin, ensure you have the following installed for both the **frontend** and **backend**:

- **npm** (comes with Node.js): For managing dependencies.
- **Node.js**: [Download Node.js](https://nodejs.org/)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)
- [Docker](https://www.docker.com/) )(If using docker)

## 🚀 Getting Started

### ✅ Option 1: Run with Docker

#### 🛠️ Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sanketyelugotla/DigiBallotModern.git
    cd DigiBallot
    ```

2. **Setup environment variable for backend**

    Rename example-env to .env

    ```bash
    mv ./Backend/example-env ./Backend/.env
    ```

    - Replace `<your-mongodb-connection-string>` with your MongoDB URI. If using MongoDB Atlas, you can find this in your Atlas dashboard.
    - Replace `secret-key` with your jwt secret.
    - The `PORT` variable specifies the port on which the backend server will run (default is 5000).

3. **Build docker images using docker compose**

    ```bash
    docker-compose up --build
    ```

    It will take some time to build the images and start the container

4. After both the container starts you can open the app in your browser at [http://localhost:80](http://localhost:80).

### ✅ Option 2: Run Frontend and Backend Individually

#### Frontend Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sanketyelugotla/DigiBallotModern.git
    cd Frontend
    ```

2. **Install dependencies:**
    Install the required dependencies by running the following command in the frontend directory:

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. After the server starts, you can open the app in your browser at [http://localhost:5173](http://localhost:5173).

    - The project should automatically open in your default web browser.
    - If it does not, manually open the browser and go to [http://localhost:5173](http://localhost:5173).

---

#### Backend Installation

1. **Clone the repository (Backend folder):**

    ```bash
    git clone https://github.com/sanketyelugotla/skygeni
    cd Backend
    ```

2. **Install dependencies:**
    Install the required dependencies by running the following command in the backend directory:

    ```bash
    npm install
    ```

3. **Set up the database:**
    - If using **MongoDB**, ensure the database is set up and running locally or use a cloud database provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Ensure the connection string is configured properly in the backend.

4. **Setup environment variable for backend**

    Rename example-env to .env

    ```bash
    mv ./Backend/example-env ./Backend/.env
    ```

    - Replace `<your-mongodb-connection-string>` with your MongoDB URI. If using MongoDB Atlas, you can find this in your Atlas dashboard.
        - Replace `secret-key` with your jwt secret.
    - The `PORT` variable specifies the port on which the backend server will run (default is 5000).

5. **Run the backend server:**

    ```bash
    npm run dev
    ```

    This will start the backend server on [http://localhost:5000](http://localhost:5000) (or the port specified in your `.env` file).

---

## Running the Project

Once both the **frontend** and **backend** are running, follow these steps:

1. **Frontend:** Should be running on [http://localhost:80](http://localhost:80) (If using docker) else [http://localhost:5173](http://localhost:5173) (If not using docker).
2. **Backend:** Should be running on [http://localhost:5000](http://localhost:5000) or the configured port.

The frontend will make API requests to the backend, fetch the data, and render it in charts and statistics.

---
