# 🧠 NoteMind AI

An AI-powered MERN note-taking application that helps users create, organize, and interact with their notes intelligently using Google's Gemini AI.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt

### 📝 Notes
- Create Notes
- Edit Notes
- Delete Notes
- Search Notes

### 📂 Organization
- Folders
- Favorites
- Archive
- Trash

### 🤖 AI Features
- AI Chat Assistant
- AI Note Summarization
- Smart Writing Assistance
- Content Generation

### 📄 File Support *(Upcoming)*
- PDF Upload
- Image OCR
- Voice Notes
- Document Import

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Google Gemini API

---

## 📁 Project Structure

```
NoteMind-AI/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/arun8921/NoteMind-AI.git
cd NoteMind-AI
```

### Backend

```bash
cd backend
npm install
```

Create `.env`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
PORT=5000
```

Run

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

### Notes

| Method | Endpoint |
|---------|----------|
| GET | /api/notes |
| POST | /api/notes |
| PUT | /api/notes/:id |
| DELETE | /api/notes/:id |

---

## 📸 Screenshots

Coming Soon...

---

## 📌 Current Progress

- ✅ Project Setup
- ✅ MERN Architecture
- ✅ MongoDB Atlas Integration
- ✅ JWT Authentication
- ✅ Login/Register API
- ✅ Frontend Dashboard
- 🚧 Notes CRUD
- 🚧 AI Integration
- 🚧 PDF Support
- 🚧 Deployment

---

## 🎯 Future Enhancements

- AI Note Summarization
- AI Chat Assistant
- PDF Summarizer
- OCR Scanner
- Voice Notes
- Dark/Light Theme
- Real-time Sync
- Mobile Responsive Improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Arun S**

GitHub: https://github.com/arun8921

---

⭐ If you found this project useful, consider giving it a star.
