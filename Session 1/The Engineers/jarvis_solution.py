"""
JARVIS - Your First AI Assistant (SOLUTION)
============================================
This is one possible solution. There are many ways to solve this!
Don't look at this until you've tried the challenge yourself.
"""

# --- STEP 1: GREETING ---
print("🤖 JARVIS: Hello! I'm your AI assistant.")
print("🤖 JARVIS: What's your name?")

name = input("👤 YOU: ").strip()

print(f"\n🤖 JARVIS: Nice to meet you, {name}!")

# --- STEP 2: ASSESS MOOD ---
print("\n🤖 JARVIS: How are you feeling today?")
print("   Options: tired, excited, stressed, happy")

mood = input("👤 YOU: ").strip().lower()

# --- STEP 3: GET CONTEXT ---
print("\n🤖 JARVIS: What are you working on today?")

task = input("👤 YOU: ").strip()

# --- STEP 4: GENERATE ADVICE (THE BRAIN) ---
advice = ""
emoji = ""

if mood == "tired":
    advice = "Take a 15-minute break, grab some water, and come back refreshed"
    emoji = "😴"
elif mood == "excited":
    advice = "Channel that energy! You're going to crush it today"
    emoji = "🚀"
elif mood == "stressed":
    advice = "Take a deep breath. Break your task into smaller steps. You've got this"
    emoji = "🧘"
elif mood == "happy":
    advice = "Love the positive energy! Keep that momentum going"
    emoji = "😊"
else:
    advice = "Whatever you're feeling, remember that you're capable of amazing things"
    emoji = "💪"

# --- STEP 5: PERSONALIZED RESPONSE ---
response = f"{emoji} {name}, since you're feeling {mood}, here's my advice: {advice}."

print(f"\n🤖 JARVIS: {response}")
print(f"🤖 JARVIS: Focus on {task} and make today count!")

# --- BONUS: ADD A MOTIVATIONAL QUOTE ---
print("\n🤖 JARVIS: Remember: 'The best way to predict the future is to invent it.' - Alan Kay")
print(f"🤖 JARVIS: Good luck with {task}, {name}! 🚀")

"""
IMPROVEMENTS YOU COULD MAKE:
============================

1. Add validation to check if the mood is valid
2. Add support for multiple languages
3. Save conversation history to a file
4. Add time-based greetings (Good morning/afternoon/evening)
5. Integrate with a real AI API (like Gemini or OpenAI)
"""
