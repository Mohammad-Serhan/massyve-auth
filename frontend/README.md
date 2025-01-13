# Basic Authentication System

## Overview
This project demonstrates a basic authentication system using Node.js, Next.js, and MongoDB. The goal is to implement a full-stack solution for user login, including backend authentication endpoints and a frontend login page. The system utilizes JWT for secure authentication and integrates the frontend with the backend.

---

## Tech Stack
- **Backend:** Node.js, Express.js/Fastify.js
- **Frontend:** Next.js
- **Database:** MongoDB

---

## Steps to Implement

### **Backend (Node.js)**
1. **Initialize a Node.js Server:**
   - Use a package manager like Yarn, npm, or pnpm to set up the server.
   - Example:
     ```bash
     mkdir frontend && cd frontend
     npm init -y
     ```

2. **Install Required Packages:**
   - Install necessary dependencies:
     ```bash
     npm install express jsonwebtoken mongoose dotenv cors body-parser
     ```

3. **Set Up Express.js/Fastify.js:**
   - Create routes and endpoints for authentication.

4. **Create Authentication Endpoints:**
   - **Sign Up Endpoint:** To register new users.
   - **Login Endpoint:** To authenticate users and return a JWT token.
   - Use middlewares to validate JWT tokens for protected routes.

5. **Set Up MongoDB:**
   - Connect to a MongoDB database and add mock user data.
   - Example Schema:
     ```javascript
     const userSchema = new mongoose.Schema({
       username: String,
       password: String,
     });
     ```

---

## How to Run the Project

### **Backend**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### **Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

---

## Example API Endpoints
1. **POST /login**
   - **Request Body:**
     ```json
     {
       "username": "example",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "your.jwt.token"
     }
     ```

2. **GET /user**
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer your.jwt.token"
     }
     ```
   - **Response:**
     ```json
     {
       "username": "example",
       "email": "example@example.com"
     }
     ```

---
