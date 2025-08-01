# 📊 Stock Portfolio Dashboard with News & AI Assistant

A **React + Firebase** web application that allows users to manage their stock portfolio, read the latest stock-related news, and interact with an AI assistant powered by **Google Gemini API**.

---

## 🚀 Features

### 🔐 User Authentication

- Sign Up / Login with Firebase Authentication.
- Persistent user sessions.

### 📈 Portfolio Management

- Add, update, and remove stocks from your portfolio.
- Real-time synchronization with Firestore Database.
- Displays live stock prices via custom hooks.

### 📰 News Feed

- Fetches latest financial news from **Yahoo Finance API (RapidAPI)**.
- Personalized news based on stocks in user's portfolio.
- Click on a news item to view detailed content.
- “Load More” button to paginate through more articles.

### 🤖 Ask AI (Gemini Assistant)

- Integrated with **Google Gemini API**.
- Users can ask questions related to stocks or finance.
- AI responses are formatted for readability.

---

## 🛠️ Tech Stack

- **React** (with Hooks & Context API)
- **React Router v6**
- **Tailwind CSS** for UI styling
- **Firebase Auth & Firestore**
- **RapidAPI (Yahoo Finance News API)**
- **Google Gemini API** for AI Assistant
- **Axios** for API calls

---

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stock-portfolio-dashboard.git
cd stock-portfolio-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

- Create a .env file in the root directory and add the following:

```bash
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_RAPIDAPI_KEY=your-rapidapi-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```
