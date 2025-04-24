✅ Here's a Polished README.md You Can Copy:

# 🧠 Flask Quiz App with Bookmarking

A web-based MCQ quiz app built using **Flask** and **MySQL**, featuring:

- ✅ 20 randomly selected questions from a question bank
- 🔖 Bookmark any question (stored in database)
- 📊 Score report with correct/wrong answers highlighted
- 🟣 Bookmarked-only quiz mode
- 💾 Data stored and fetched via MySQL

---

## 🚀 Features

- Dynamic question rendering with HTML + JavaScript
- Realtime bookmarking with purple highlights
- Color-coded quiz report (green = correct, red = wrong)
- Bookmark persistence using MySQL `bookmark` table
- Routes:
  - `/` – Random quiz
  - `/bookmarked` – Quiz from bookmarked questions
  - `/get-quiz` – JSON API for all questions
  - `/get-bookmarked` – JSON API for bookmarked ones

---

## 💡 How to Run

### 1. Clone the Repo
```bash
git clone https://github.com/basithsulaiman/flask-quiz-app.git
cd flask-quiz-app

2. Create a Virtual Environment

python3 -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate

3. Install Dependencies

pip install flask mysql-connector-python

4. Set Up MySQL Database

CREATE DATABASE quizdb;

-- Table: questions
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option CHAR(1)
);

-- Table: bookmark
CREATE TABLE bookmark (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert your questions here...

5. Run the App

python app.py

Go to: http://localhost:5000
📸 Screenshots

(Add your screenshots here for UI/UX showcase)
🛠 Technologies Used

    Python + Flask

    MySQL

    HTML/CSS + JavaScript (Vanilla)

    Bootstrap (optional)

👨‍💻 Author

Dr. BasithSulaiman 
OncoSurgeon | Medical Technologist | Creator | Innovator
🔗 GitHub
⭐ Contributions Welcome!

Want to improve the UI, add login, timer, or analytics? Fork it and start building!


---

Let me know if you'd like:
- A dark mode toggle 🌙
- Export scores as PDF 📄
- Leaderboard system 🏆

Ready for phase 3? 😎


ChatGPT can make mistakes. Check important 
