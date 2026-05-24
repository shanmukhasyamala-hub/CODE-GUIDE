# 🚀 Code- guide  
AI-Powered Code Review Assistant for Engineering Teams
📌 Problem Statement
Developers spend a lot of time reviewing Pull Requests manually. During this process, important issues like bugs, security vulnerabilities, and performance problems can be easily missed.
💡 Solution
ReviewVerse AI is an AI-powered assistant that automatically reviews GitHub Pull Requests and provides smart feedback.
It:
Fetches PR changes from GitHub
Uses AI to analyze code diffs
Detects issues like:
🐞 Bugs
🔐 Security vulnerabilities
⚡ Performance issues
🧹 Code smells
Provides:
Issue severity (Low / Medium / High / Critical)
Clear explanations
Suggested fixes
AI-generated PR summary
🛠️ Tech Stack
Frontend
Next.js
React.js
Tailwind CSS
Backend
Node.js
Express.js
AI Engine
Google Gemini API
APIs
GitHub REST API
🔄 How It Works
User enters:
GitHub repo owner
Repository name
Pull Request number
Backend:
Fetches PR diff using GitHub API
Sends code to Gemini AI
AI:
Analyzes code
Detects issues
Generates fixes
Frontend:
Displays structured AI review dashboard
✨ Features
⚡ Real-time PR analysis
🧠 AI-powered code review
🔐 Security vulnerability detection
🐞 Bug detection
⚡ Performance optimization suggestions
📊 Severity scoring system
🧾 Clean UI dashboard
📸 Demo Idea (Hackathon Tip)
Show a PR with intentional bad code like:
SQL Injection risk
Hardcoded password
Poor coding practices
Then demonstrate: 👉 AI detecting issues instantly
👉 Showing severity + fixes
🚀 Future Improvements
GitHub OAuth login
Auto PR comments on GitHub
Multi-language support (Python, Java, C++)
CI/CD integration
AI auto-fix suggestions
👨‍💻 Author
Built for hackathon using:
AI (Gemini)
Full Stack Development
GitHub API integration
🏁 Goal
To reduce developer workload and improve code quality using AI-powered automation.