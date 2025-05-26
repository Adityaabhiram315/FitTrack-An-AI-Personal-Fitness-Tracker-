# FitTrack-An-AI-Personal-Fitness-Tracker-


````markdown
# 🏋️‍♂️ FitSync – AI-Powered Fitness & Nutrition Tracker

![Banner](./screenshots/banner.png)

**FitSync** is a sleek and minimalistic web-based fitness tracker that helps users monitor their health goals, track calories, receive smart food and workout suggestions, and interact with an integrated AI chatbot for personalized advice.

Built using **Python (FastAPI)**, **Tailwind CSS**, and powered by the **Gemini AI API**, FitSync offers a smooth, personalized, and motivating fitness experience.

---

## 📸 Screenshots

### 👤 Signup / Login Page  
![Signup](./screenshots/signup.png)

### 🧍 Profile Dashboard  
![Dashboard](./screenshots/dashboard.png)

### 🥗 Nutrition Suggestions  
![Nutrition](./screenshots/nutrition.png)

### 🏋️ Workout Recommendations  
![Workout](./screenshots/workout.png)

### 🤖 AI Chatbot  
![Chatbot](./screenshots/chatbot.png)

### 🔥 Daily Streak UI  
![Streak](./screenshots/streak.png)

---

## 🚀 Features

- 🔐 **Secure Login & Signup** with password hashing
- 👤 User Profile with age, gender, height, weight, activity level & goals
- 🍽️ **Personalized Nutrition Plans** with veg/non-veg toggle
- 🏋️ **Workout Recommendations** categorized by intensity & calorie burn
- 🔢 **Calorie Intake Calculator** (Mifflin-St Jeor formula)
- 🧠 **AI Chatbot** (via Gemini API) for fitness & diet Q&A
- 🎯 **Step Count Suggestions** based on activity level
- 📊 Dashboard with calories, steps, progress, and streaks
- 🔥 **Animated Daily Streak Tracker** for motivation
- 📱 Responsive design for mobile & desktop
- ✨ Minimalist UI in soft green & white shades

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Backend      | Python (FastAPI) or Flask |
| Frontend     | HTML, Tailwind CSS        |
| Auth         | JWT / Flask-Login         |
| Database     | SQLite / PostgreSQL       |
| AI Chatbot   | Gemini API (Google AI)    |
| Deployment   | Render / Vercel / Heroku  |

---

## 🔧 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fitsync.git
cd fitsync
````

### 2. Set Up Python Environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 3. Add Environment Variables

Create a `.env` file and add your Gemini API Key:

```
GEMINI_API_KEY=AIzaSyCRm5Uuvb-jl_kJ55WcW5keatIV7Jhmpu4
```

### 4. Run the Server

```bash
uvicorn main:app --reload
```

### 5. Access the App

Go to `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
/fitsync
├── /static
├── /templates
├── main.py
├── auth.py
├── models.py
├── chatbot.py
├── routes/
│   ├── nutrition.py
│   ├── workout.py
│   └── user.py
├── database.py
└── /screenshots
```

---

## 🙌 Contributions

Feel free to fork the repo, open issues, or submit pull requests. All contributions to improve FitSync are welcome!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Credits

* Designed & Developed by [Your Name](https://github.com/yourusername)
* AI Integration powered by **Gemini API**
* UI inspired by Apple Health & Google Fit

---

**Stay fit. Stay curious. Track with FitSync. 💪**

```

---

Let me know if you'd like this to be auto-generated with your GitHub username or if you'd like me to prepare a version with screenshot thumbnails and real file links.
```
