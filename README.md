# 🎤 AI Interview Platform – Full-Stack Interview Preparation System

<p align="center">
  <img src="assets/banner.png" alt="AI Interview Platform Banner" width="100%">
</p>

<p align="center">
  <b>Practice • Analyze • Improve • Get AI Feedback</b><br>
  A modern AI-powered interview preparation platform built with React, Spring Boot, and AI.
</p>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwindcss)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-brightgreen?style=for-the-badge&logo=springboot)
![JWT](https://img.shields.io/badge/JWT-Secure-black?style=for-the-badge&logo=jsonwebtokens)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)
![Render](https://img.shields.io/badge/Backend-Render-purple?style=for-the-badge&logo=render)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)

---

# 📖 Overview

AI Interview Platform is a full-stack web application that helps students and professionals prepare for technical interviews through AI-powered mock interviews, coding challenges, aptitude tests, resume analysis, and personalized feedback.

The platform provides an interactive interview experience with real-time evaluation, detailed performance analytics, and learning resources to improve interview skills.

---

# 📸 Application Preview

| Dashboard | AI Interview |
|-----------|--------------|
| ![](assets/dashboard.png) | ![](assets/interview.png) |

| Coding Assessment | Performance Analytics |
|-------------------|-----------------------|
| ![](assets/coding.png) | ![](assets/analytics.png) |

| Resume Analysis | Learning Resources |
|-----------------|--------------------|
| ![](assets/resume.png) | ![](assets/resources.png) |

---

# ✨ Features

## 🎨 Frontend

- 🤖 AI Mock Interview
- 💬 Real-time Chat Interview
- 🎙 Voice Interview Support
- 💻 Coding Interview Editor
- 📝 MCQ & Aptitude Tests
- 📊 Performance Dashboard
- 📄 Resume Analyzer
- 🎯 Personalized Feedback
- 📈 Progress Tracking
- 🌙 Dark & Light Mode
- 📱 Fully Responsive Design

---

## ⚙️ Backend

- 🔐 JWT Authentication
- 👤 User Management
- 🎤 Interview Management APIs
- 💻 Coding Challenge APIs
- 📄 Resume Analysis APIs
- 📊 Performance Analytics APIs
- 📈 User Progress Tracking
- 🏆 Leaderboard System
- 🔒 Spring Security
- 🐳 Docker Ready

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, Framer Motion |
| State Management | TanStack React Query |
| HTTP Client | Axios |
| Backend | Spring Boot 3, Java 17 |
| Security | Spring Security, JWT |
| Database | PostgreSQL |
| ORM | Spring Data JPA |
| AI Integration | Gemini / OpenAI API |
| API Documentation | Swagger |
| Build Tool | Maven |
| Deployment | Vercel, Render |
| Containerization | Docker |

---

# 📂 Project Structure

```text
AI-Interview-Platform/
│
├── assets/
│   ├── banner.png
│   ├── dashboard.png
│   ├── interview.png
│   ├── coding.png
│   ├── analytics.png
│   ├── resume.png
│   └── resources.png
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── application.properties
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/AI-Interview-Platform.git

cd AI-Interview-Platform
```

---

# ⚙️ Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

Swagger UI:

```
http://localhost:8080/swagger-ui.html
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔧 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:8080/api/v1

VITE_GEMINI_API_KEY=YOUR_API_KEY
```

---

## Backend (application.properties)

```properties
PORT=8080

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/interviewdb

SPRING_DATASOURCE_USERNAME=postgres

SPRING_DATASOURCE_PASSWORD=password

JWT_SECRET=your-secret-key
```

---

# 🎯 Platform Modules

- AI Mock Interview
- Technical Interview
- HR Interview
- Behavioral Interview
- Coding Challenges
- Aptitude Tests
- DSA Practice
- Resume Analyzer
- AI Feedback
- Progress Analytics
- Interview History
- User Profile
- Leaderboard
- Admin Dashboard

---

# 🚀 Future Enhancements

- 🎥 Video Interview Support
- 🗣 Speech Emotion Detection
- 🎙 AI Voice Interviewer
- 📹 Camera-Based Interview
- Live Coding Collaboration
- Company-Specific Interview Sets
- Interview Scheduling
- Certificates
- Mobile App
- Multiplayer Mock Interviews

---

# 👨‍💻 Author

**Rishiraj Prasad Yadav**

Java Full Stack Developer | Spring Boot | React | AI Integration

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
