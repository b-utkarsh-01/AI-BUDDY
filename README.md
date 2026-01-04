# AI Buddy – VS Code Extension

AI Buddy is a custom VS Code extension that helps you **explain code**, **find bugs**, and **optimize code** using an AI-powered backend.

---

## 📁 Project Structure

```
AI_BUDDY/
├── ai-buddy/              ← VS Code Extension
└── ai-buddy-backend/      ← Node.js Backend
```

---

## 🚀 How to Run the Project (Step-by-Step)

---

## 🔹 Step 1: Start the Backend Server

1. Open terminal
2. Go to backend folder:
    
    ```bash
    cd ai-buddy-backend
    ```
    
3. Install dependencies:
    
    ```bash
    npm install
    ```
    
4. Create a `.env` file inside **ai-buddy-backend** folder
5. Add your Gemini API key inside `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

⚠️[**WARNING](https://www.bing.com/ck/a?!&&p=b06442acaab5e38140686d85188d9860ded444f9b348697a184aaacdb4b82b4bJmltdHM9MTc2NzQ4NDgwMA&ptn=3&ver=2&hsh=4&fclid=1fd9ce05-ef22-64ad-3893-d8d2ee88655a&psq=warning&u=a1aHR0cHM6Ly93d3cubWVycmlhbS13ZWJzdGVyLmNvbS9kaWN0aW9uYXJ5L3dhcm5pbmc&ntb=1) :- don’t use comas nor space in API**⚠️

1. Start backend server:
    
    ```bash
    node index.js
    ```
    
2. You should see:
    
    ```
    Backend running at http://localhost:5000
    ```
    

⚠️ **Keep this terminal running**

---

## 🔹 Step 2: Start the VS Code Extension

1. Open a **new VS Code window**
2. Open folder:
    
    ```
    ai-buddy
    ```
    
3. Open terminal inside VS Code
4. Install dependencies:
    
    ```bash
    npm install
    ```
    
5. Compile the extension:
    
    ```bash
    npm run compile
    ```
    
6. Press:
    
    ```
    F5
    ```
    

➡️ A **new VS Code window** will open called:

**Extension Development Host**

---

## 🔹 Step 3: Use AI Buddy Extension

Inside the **Extension Development Host** window:

1. Open **any code file** (C / C++ / Java / JavaScript, etc.)
2. **Select a portion of code**
3. Press:
    
    ```
    Ctrl + Shift + P
    ```
    
4. Search and select:
    
    ```
    AI Buddy
    ```
    
5. Choose one option:
    - ✅ Explain this code
    - 🐞 Find bugs in this code
    - ⚡ Optimize this code
6. AI Buddy will show the response in a side panel.

---

## 🛠 Features

- 📖 Code explanation in simple language
- 🐛 Bug detection
- 🚀 Code optimization suggestions
- 💬 Follow-up questions support
- 🧠 Markdown formatted responses

---

## ⚠️ Important Notes

- Do **NOT** open the parent `AI_BUDDY` folder while running the extension
- Backend and extension must be run **separately**
- Make sure backend is running before using the extension

---