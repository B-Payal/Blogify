# Backend API Project

A secure backend application built with Node.js, Express.js, and MongoDB featuring authentication, authorization, JWT-based login, cookies, and custom middleware.

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User Registration
- Secure Login
- JWT Token Generation
- Token Verification
- Protected Routes
- Role-based Access Control

---

## 🍪 Cookie Security

- Token stored in **HTTP-only cookies**
- Prevents access from client-side JavaScript
- Better security than localStorage

---

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT Secret Protection
- Unauthorized route blocking
- Middleware-based request validation
- Environment variables using dotenv


---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser
- dotenv

---

## 📂 Project Structure

```bash
project-folder/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── services/
│── .env
│── index.js
│── package.json
