# 📌 Project Tracker – IT PPJ

A web-based project tracking app to monitor task progress, calculate total points, and view detailed project histories. Built with React, Fastify, Prisma, and MySQL.

## 🚀 Features

* ✅ Add, edit, and delete projects
* 🗓️ Set deadlines and assign point values
* 📋 Add step-by-step task checklists
* 📊 Generate printable reports with filters
* 🔐 Confirmation before marking as done or deleting
* 🔄 Real-time sync between frontend and backend
* 📦 Persistent data using MySQL + Prisma

## 🖼️ Demo

> [https://projecttracker.putrapanggiljaya.id](https://projecttracker.putrapanggiljaya.id)

---

## ⚙️ Tech Stack

| Frontend     | Backend           | Database | Tools       |
| ------------ | ----------------- | -------- | ----------- |
| React + Vite | Fastify (Node.js) | MySQL    | Prisma ORM  |
| Tailwind CSS | REST API          |          | SweetAlert2 |

---

## 📁 Folder Structure

```
project-tracker/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db/ (Prisma setup)
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/project-tracker.git
cd project-tracker
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit DB connection string in .env

npm install
npx prisma generate
npx prisma migrate dev --name init

# Start server (HTTPS)
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 .env Example (Backend)

```env
DATABASE_URL="mysql://username:password@localhost:3306/yourdb"
SSL_CERT_PATH="./ssl/cert.pem"
SSL_KEY_PATH="./ssl/key.pem"
```

---

## 🛡️ Security

* Admin-only access planned
* Robots disabled (`meta` + `robots.txt`)
* Confirmation required for irreversible actions

---

## 📝 License

This project is developed by the IT team of **Putra Panggil Jaya**. All rights reserved.

---

## 🤝 Contribution

Pull requests welcome! If you’d like to suggest improvements or new features, feel free to open an issue.

---

## 📧 Contact

Built with ❤️ by the **IT PPJ Team**

