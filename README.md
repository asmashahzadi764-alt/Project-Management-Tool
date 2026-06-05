# 🗂️ Project Management Tool

> A full-stack collaborative project management system inspired by **Trello** and **Asana** — built for real teams with real-time updates.

🔗 **Live Demo:** [project-management-tool-six-olive.vercel.app](https://project-management-tool-six-olive.vercel.app/)

---

## 📌 Project Overview

The **Project Management Tool** is a production-ready, full-stack web application that enables teams to collaborate on projects in real time. It provides a structured, intuitive workspace where users can create projects, organize tasks into visual Kanban-style boards, assign work to team members, and track progress from a central dashboard.

The system is built on a secure **JWT-based authentication** architecture, ensuring that only authorized users can access and manage project data. Real-time communication is powered by **Socket.io**, enabling instant task updates and notifications without requiring page refreshes — delivering a seamless, collaborative experience comparable to industry tools like Trello and Asana.

---

## ✨ Features

### 🔐 Authentication & Security

| Feature | Description |
|---|---|
| User Registration | New users can create an account with name, email, and password. Passwords are securely hashed before storage. |
| JWT Login | Users authenticate via email/password. A signed JWT token is issued and stored client-side for all subsequent API requests. |
| Protected Routes | All dashboard, project, and task routes are guarded — unauthenticated users are automatically redirected to the login page. |
| Token Persistence | Auth state is preserved across page refreshes using localStorage token validation on app load. |
| Auto Logout | Invalid or expired tokens are automatically cleared, forcing re-authentication to maintain session integrity. |

### 👥 Group Projects & Team Management

| Feature | Description |
|---|---|
| Create Projects | Users can create new projects with a title and description. Projects are immediately visible on the dashboard. |
| Add Members | Project owners can invite team members, giving them access to the project board and its tasks. |
| Role-Based Access | Each project has a defined owner with admin control, while members have scoped access to collaborate without altering project settings. |
| Project Overview | Each project card on the dashboard shows title, member count, task progress, and quick-access links to the board. |

### 📋 Project Boards & Task Management

| Feature | Description |
|---|---|
| Kanban Boards | Tasks are organized into three columns: **To-Do**, **In Progress**, and **Done** — providing a clear visual overview of progress. |
| Task Creation | Users can create detailed task cards with title, description, due date, priority level, and assigned member. |
| Task Assignment | Tasks can be assigned to any project member, with the assignee's name displayed directly on the task card. |
| Task Editing | All task fields are fully editable post-creation — titles, descriptions, assignees, priorities, and due dates. |
| Status Updates | Tasks can be updated to reflect real-time workflow progress across board columns. |
| Task Deletion | Tasks can be permanently removed by authorized project members when no longer needed. |

### 📊 Dashboard & Analytics

| Feature | Description |
|---|---|
| Project Cards | Displays all projects the user owns or is a member of, each with summary metadata for quick access. |
| Task Statistics | Each project shows a progress indicator reflecting the ratio of completed tasks to total tasks. |
| User Visibility | Users only see projects they are part of — ensuring data privacy and a clean, focused workspace. |
| Navigation | Sidebar navigation allows instant switching between dashboard, project boards, and project creation. |

---

## 🔔 Bonus Features

| Feature | Description |
|---|---|
| ⚡ Real-Time Updates | Powered by **Socket.io WebSockets** — task changes, new comments, and status updates are broadcast instantly to all active project members without a page reload. |
| 🔔 Live Notifications | Users receive real-time in-app notifications when tasks are assigned to them or when updates occur on tasks they are involved in. |
| 🔄 Instant Sync | All connected clients on the same project board see changes reflected immediately, enabling true concurrent collaboration. |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### DevOps & Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── models/          # Mongoose schemas (User, Project, Task, Comment)
│   ├── routes/          # Express route definitions
│   ├── controllers/     # Business logic handlers
│   ├── middleware/      # JWT auth middleware
│   └── server.js        # Entry point, Socket.io setup
│
├── frontend/
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard, ProjectBoard
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # AuthContext for global state
│   │   ├── services/    # Axios API service
│   │   └── layouts/     # MainLayout with sidebar & topbar
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js v18+ and npm installed
- MongoDB Atlas account (free tier at [mongodb.com/atlas](https://www.mongodb.com/atlas))
- Git installed on your machine

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd project-root
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

Server runs at `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 🌐 Deployment

| Layer | Platform | Details |
|---|---|---|
| 🌐 Frontend | **Vercel** | Auto-deploy on every git push, global CDN |
| ⚙️ Backend | **Render** | Node.js server with auto-scaling |
| 🗄️ Database | **MongoDB Atlas** | Cloud-hosted with automated backups |

---

## 🔌 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user account |
| POST | `/api/auth/login` | Login and receive a JWT token |
| GET | `/api/auth/me` | Get currently authenticated user profile |
| GET | `/api/projects` | Fetch all projects for the logged-in user |
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects/:id` | Get full project details with members and boards |
| POST | `/api/projects/:id/members` | Add a new member to a project |
| GET | `/api/tasks/:projectId` | Get all tasks for a specific project |
| POST | `/api/tasks` | Create a new task under a project |
| PUT | `/api/tasks/:id` | Update task details, status, or assignee |
| DELETE | `/api/tasks/:id` | Delete a task permanently |
| POST | `/api/comments` | Add a comment to a task |
| GET | `/api/comments/:taskId` | Retrieve all comments for a specific task |

---

## 📚 Learning Outcomes

Working on this project provided hands-on experience across the full software development lifecycle:

- **Full-Stack Development** — Architected and built a complete web application from database schema design to frontend UI, covering every layer of the stack independently.
- **REST API Design** — Designed clean RESTful endpoints following industry conventions for resource naming, HTTP methods, and response structures.
- **Authentication Systems** — Implemented stateless JWT-based authentication including token signing, middleware-based route protection, and secure token storage patterns.
- **Database Modeling** — Designed MongoDB schemas with Mongoose, handling relationships between Users, Projects, Tasks, and Comments.
- **Real-Time Communication** — Integrated Socket.io for WebSocket-based bidirectional communication, enabling live updates across multiple connected clients.
- **React Architecture** — Built a scalable React SPA using hooks, Context API for global state, React Router for navigation, and component-based design patterns.
- **Cloud Deployment** — Deployed a multi-service application across Vercel, Render, and MongoDB Atlas, configuring environment variables, CORS, and production builds.
- **Team Collaboration Workflow** — Modeled real-world agile workflows with role-based access, task status management, and comment-based async communication.

---

## 👩‍💻 Author

**Asma Shahzadi**
 

Student : BS Information Technology, Women University Multan (2023–2027)

---

## 📜 License

This project is created for educational purposes.
Free to reference and learn from — attribution appreciated.

---

<p align="center">Built with ❤️ by <strong>Asma Shahzadi</strong> &nbsp;•&nbsp; <a href="https://project-management-tool-six-olive.vercel.app/">Live Demo</a></p>
