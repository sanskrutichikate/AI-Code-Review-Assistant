# 🤖 AI Code Review Assistant

An AI-powered web application that helps developers improve code quality by combining static code analysis with Google Gemini AI. Users can submit code snippets in multiple programming languages and receive detailed reviews, including bug detection, security recommendations, code smells, complexity analysis, and performance improvements.

---

## 📌 Features

### 🔐 User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 💻 Code Submission
- Submit code snippets
- Select programming language
- Save code with a custom title

### 🤖 AI Code Review
- AI-powered review using Google Gemini
- Code summary
- Bug detection
- Improvement suggestions
- Best practices
- Security recommendations
- Performance optimization suggestions

### 📊 Static Code Analysis
- JavaScript analysis using ESLint
- Complexity Analysis
- Code Smell Detection
- Automatic Documentation Generation

### 📂 Review Management
- View previous code reviews
- Dashboard with review history
- Store analysis results in PostgreSQL

---

# 🛠️ Technology Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Authentication
- JSON Web Token (JWT)
- bcrypt

## AI Integration
- Google Gemini API

## Static Analysis
- ESLint

## Deployment
- Vercel (Frontend)
- Render (Backend)
- PostgreSQL Database

---

# 📁 Project Structure

```
AI-Code-Review-Assistant/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

DATABASE_URL=YOUR_POSTGRESQL_DATABASE_URL

JWT_SECRET=YOUR_JWT_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📝 How to Use

1. Register a new account.
2. Log in using your credentials.
3. Open the **Paste Code** page.
4. Enter a title.
5. Select a programming language.
6. Paste your source code.
7. Click **Submit Code**.
8. Review the AI-generated suggestions and static analysis results.

---

# 📊 AI Review Output

The application provides:

- 📝 Summary
- 🐞 Bugs
- 🚀 Improvements
- 📚 Best Practices
- 🔒 Security Suggestions
- ⚡ Performance Suggestions
- 📈 Complexity Analysis
- 🧹 Code Smell Detection
- 📖 Generated Documentation

---

# 🗄️ Database Schema

The project uses the following tables:

- users
- code_snippets
- analysis_results
- review_results

---



# 📚 Learning Outcomes

Through this project, I gained practical experience in:

- Full-Stack Web Development
- REST API Development
- React.js
- Express.js
- PostgreSQL Database Design
- JWT Authentication
- AI API Integration with Google Gemini
- Static Code Analysis
- Git & GitHub
- Deployment using Render and Vercel

---

# 👩‍💻 Author

**Sanskruti Chikate**




