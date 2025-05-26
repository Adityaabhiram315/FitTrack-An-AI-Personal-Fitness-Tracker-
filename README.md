
# 🏋️‍♂️ FitTrack – AI-Powered Fitness & Nutrition Tracker

<img width="944" alt="image" src="https://github.com/user-attachments/assets/f94fb259-1230-450f-922e-632d4089b55f" />


**FitSync** is a sleek and minimalistic web-based fitness tracker that helps users monitor their health goals, track calories, receive smart food and workout suggestions, and interact with an integrated AI chatbot for personalized advice.

Built using **Python (FastAPI or Flask)**, **Tailwind CSS**, and powered by the **Gemini AI API**, FitSync offers a personalized, motivating, and beautifully simple user experience.

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

### 🔥 Daily Streak Tracker  
![Streak](./screenshots/streak.png)

---

## 🚀 Features

- 🔐 Secure Login & Signup with password hashing
- 👤 User Profile setup (name, age, gender, weight, height, goals)
- 🍽️ Personalized nutrition recommendations with **Veg / Non-Veg toggle**
- 🏋️ Workout suggestions categorized by **Low**, **Medium**, and **High** intensity
- 🔢 Calorie intake calculator based on Mifflin-St Jeor Equation
- 📈 Progress dashboard with calories, steps, and workout tracking
- 🔥 Daily streak tracker with fun and curious popup design
- 🧠 AI chatbot integration using **Gemini API** for fitness guidance
- 📱 Mobile responsive and minimalistic UI
- 🎨 Light theme with very pale green and white color scheme

---

## 🛠️ Tech Stack

| Layer         | Technology               |
|---------------|---------------------------|
| Backend       | Python (FastAPI / Flask)  |
| Frontend      | HTML, Tailwind CSS        |
| Auth          | JWT or Flask-Login        |
| Database      | SQLite or PostgreSQL      |
| AI Chatbot    | Gemini API (Google AI)    |
| Deployment    | Render / Vercel / Heroku  |

---

## 🔧 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fitsync.git
cd fitsync
````

### 2. Set Up the Environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Gemini API key:

```
GEMINI_API_KEY=AIzaSyCRm5Uuvb-jl_kJ55WcW5keatIV7Jhmpu4
```

### 4. Run the Server

```bash
uvicorn main:app --reload  # for FastAPI
# OR
python app.py  # for Flask
```

### 5. Visit the App

Open your browser and go to:

```
http://localhost:8000
```

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
├── database.py
├── /routes
│   ├── nutrition.py
│   ├── workout.py
│   └── user.py
├── /screenshots
│   └── *.png
└── .env
```

---

## 💡 AI Chatbot

The AI chatbot is powered by **Google Gemini API**, which provides smart, personalized responses to fitness, diet, and lifestyle questions.

### Example Prompts:

* “What are good high-protein vegetarian meals?”
* “Suggest a 30-min low-intensity workout.”
* “How many calories do I burn doing jump rope?”

---

## 🙌 Contributing

We welcome contributions! If you'd like to improve FitSync, feel free to:

* ⭐ Star this repo
* 🍴 Fork the project
* ✅ Open a pull request
* 🐛 Report bugs or request features in [Issues](https://github.com/yourusername/fitsync/issues)

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## ✨ Credits

* Developed by [Your Name](https://github.com/yourusername)
* UI inspired by Apple Fitness, Google Fit, and Noom
* AI functionality powered by Google Gemini API

---

**Stay fit. Stay curious. Track with FitSync. 💪**

```

---

### ✅ Next Steps:
- Save your screenshots in a `screenshots/` folder at your project root.
- Replace `yourusername` with your GitHub handle.
- Replace the image filenames with the actual ones you’ll use.
- Upload this `README.md` to your GitHub repo.

Let me know if you’d like a **dark mode toggle**, **progress export feature**, or an **admin dashboard** added next!
```
