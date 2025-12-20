# 🤖 Session 1: Building Jarvis - Your First AI Assistant

**Theme:** Professional, "Startup," and Ambitious  
**Age Group:** 13-18 (The Engineers)

---

## 🎯 The Mission

This isn't a classroom. It's a lab. Over the next 30 weeks, you'll go from **"User" to "Creator"** using industry tools:
- ✅ VS Code (professional code editor)
- ✅ Python (language of AI and data science)
- ✅ GitHub (where real developers collaborate)

**Your Goal Today:** Build a basic AI assistant that can understand you, remember your name, and give personalized advice.

---

## 🚀 The Setup

### Step 1: Verify Your Environment
Open your terminal in VS Code and run:
```bash
python --version
```
You should see `Python 3.11.x`

### Step 2: Your First Program
```bash
cd "Session 1/The Engineers"
python hello_world.py
```

---

## 🧠 Anatomy of a Chatbot

Every chatbot (from Siri to ChatGPT) has three core components:

### 1. Input (Getting Information)
```python
user_name = input("What's your name? ")
```

### 2. Logic (Making Decisions)
```python
if feeling == "tired":
    advice = "Go get a coffee!"
elif feeling == "excited":
    advice = "Channel that energy into your project!"
```

### 3. Output (Responding)
```python
print(f"Hey {user_name}, {advice}")
```

---

## 💻 The "Jarvis" Coding Challenge

Your mission is to complete the `jarvis.py` template to create a basic AI assistant.

### Requirements:
1. ✅ Ask the user for their **name**
2. ✅ Ask the user for their **mood** (tired, excited, stressed, happy)
3. ✅ Ask the user what they're **working on** today
4. ✅ Use `if/elif/else` to give different advice based on their mood
5. ✅ Use an **f-string** to create a personalized response

### Example Interaction:
```
🤖 JARVIS: Hello! I'm your AI assistant.
🤖 JARVIS: What's your name?
👤 USER: Alex

🤖 JARVIS: Nice to meet you, Alex!
🤖 JARVIS: How are you feeling today? (tired/excited/stressed/happy)
👤 USER: excited

🤖 JARVIS: What are you working on today?
👤 USER: building a website

🤖 JARVIS: Awesome, Alex! Since you're feeling excited, 
channel that energy into building a website. 
You've got this! 🚀
```

---

## 🏆 Bonus Challenges

### Level 1: Multiple Questions
Add more questions to make Jarvis smarter:
- What's their favorite programming language?
- What time of day do they code best?
- What's their biggest coding goal?

### Level 2: Smart Responses
Make Jarvis respond differently based on combinations:
- If tired AND working on something hard → suggest a break
- If excited AND working on something easy → suggest tackling something harder

### Level 3: Memory
Can you make Jarvis "remember" the user's name by saving it to a file?
*Hint: Look up Python's `open()` and `write()` functions*

---

## 🎓 Key Concepts You're Learning

| Concept | What It Does | Real-World Use |
|---------|-------------|----------------|
| **`input()`** | Gets user data | Every form, login, search bar |
| **Variables** | Stores information | User profiles, game states |
| **Conditionals** | Makes decisions | Recommendation algorithms |
| **f-strings** | Formats text | Personalized emails, chatbots |
| **Functions** | Reusable code | Any professional software |

---

## 🗺️ The Roadmap (30 Weeks)

### Phase 1: Master the Logic (Weeks 1-10)
- Python fundamentals
- Data structures
- Problem-solving patterns

### Phase 2: Build the Face (Weeks 11-20)
- HTML/CSS basics
- JavaScript interactivity
- Building your portfolio website

### Phase 3: Give it a Brain (Weeks 21-30)
- API integration
- AI/ML basics (Gemini API)
- Deploy your project online

**End Goal:** A professional portfolio + trip to Visa HQ 🏢

---

## 📝 Homework Challenge

Expand your Jarvis assistant with:
1. At least **5 different moods** it can respond to
2. **3 different types of advice** (coding, health, motivation)
3. A **farewell message** that uses the user's name

### Stretch Goal:
Research the **Gemini API** (Google's AI). Next session, we'll integrate real AI into your assistant.

---

## 💡 Industry Insight

**Fun Fact:** The chatbot you're building uses the same fundamental concepts as:
- Customer service bots
- Virtual assistants (Siri, Alexa, Google Assistant)
- Even ChatGPT (just with way more data and training)

You're learning the building blocks that power billion-dollar companies.

---

## 🔗 Resources

- [Python Official Docs](https://docs.python.org/3/)
- [Real Python Tutorials](https://realpython.com/)
- [Gemini API Documentation](https://ai.google.dev/)

---

**Welcome to the team. Let's build something incredible.** 🚀

*- Arlidio Dobra, Senior Software Engineer @ Visa*
