# 🗂️ TASK 3: Project Management Tool

A full-stack collaborative project management tool inspired by Trello and Asana, designed to help teams manage projects, assign tasks, and communicate efficiently in real time.

---

## 📌 Project Overview

The Project Management Tool allows multiple users to collaborate on group projects. Users can create projects, organize tasks into boards, assign tasks to team members, and communicate through comments within tasks.

The system includes secure authentication, project boards, task cards, and a role-based workflow, making it suitable for academic projects and real-world team collaboration.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Secure authentication using JWT
- Protected routes for authorized users only

### 👥 Group Projects
- Create and manage group projects
- Add multiple members to a project
- Each project has its own task boards

### 📋 Project Boards & Tasks
- Create project boards (To-Do, In Progress, Done)
- Add tasks under specific boards
- Edit, update, and delete tasks
- Assign tasks to team members
- Update task status dynamically

### 📊 Dashboard
- Overview of all projects
- Task statistics and progress tracking
- User-specific project visibility

---

## 🛠️ Tech Stack

### Frontend
- JavaScript (ES6+)
- React.js
- HTML5
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- RESTful APIs

### Database
- MongoDB Atlas

---

## 🔔 Bonus Features

- 🔔 Notifications for task updates
- ⚡ Real-time updates using WebSockets (Socket.io)
- Instant task and comment updates without page refresh

---

## 🧱 Backend Responsibilities

The backend handles:

- User authentication & authorization
- Project creation and member management
- Task CRUD operations
- Comment handling
- Real-time event broadcasting
- Secure API endpoints

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd project-root
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

- Backend deployed on Render
- Frontend deployed on Vercel
- Database hosted on MongoDB Atlas

---


## 📚 Learning Outcomes

- Full-stack application development
- REST API design
- Authentication & authorization
- Database modeling with MongoDB
- Real-time communication using WebSockets
- Team collaboration workflow

---

## 👩‍💻 Author

**Asma Shahzadi**  
Full-Stack Web Development Project

---

## 📜 License

This project is created for educational purposes.
