"""
JARVIS - Your First AI Assistant
=================================
Mission: Build a chatbot that can understand you and give personalized advice.

Your Task: Fill in the blanks (marked with TODO) to complete Jarvis.
"""

# --- STEP 1: GREETING ---
print("🤖 JARVIS: Hello! I'm your AI assistant.")
print("🤖 JARVIS: What's your name?")

name = input("👤 YOU: ").strip()

print(f"\n🤖 JARVIS: Nice to meet you, {name}!")

# --- STEP 2: ASSESS MOOD ---
print("\n🤖 JARVIS: How are you feeling today?")
print("   Options: tired, excited, stressed, happy, annoyed ,  you need help ")

mood = input("👤 YOU: ").strip().lower()

# --- STEP 3: GET CONTEXT ---
print("\n🤖 JARVIS: What are you working on today?")

task = input("👤 YOU: ").strip()

# --- STEP 4: GENERATE ADVICE (THE BRAIN) ---
advice = ""
emoji = ""

if "tired" in mood:
    advice = "Take a 15-minute break, grab some water, and come back refreshed"
    emoji = "😴"
elif "exited" in mood :
    advice = "Use that energy and do something bro "
    emoji = "🚀"
elif "stressed" in mood :
    advice = "Take a deep breath. Chill life is not supposed to be bad its supposed to be fun have some fun"
    emoji = "🧘"
elif "happy" in mood :
    advice = "Love the positive energy! Enjoy your happines"
    emoji = "😊"
elif "annoyed" in mood :
    advice = " Drink water eat food and calm down and relax"
    emoji = ""
elif " i need help" in mood :
    advice = " Go and search what your stuck on"

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
CHALLENGES:
===========

Level 1 - Add More Moods:
- Add support for: anxious, motivated, confused, bored

Level 2 - Time-Based Responses:
- Import the datetime module
- Give different advice based on the time of day
- Example: If it's late at night, suggest they get some sleep

Level 3 - Remember the User:
- Save the user's name to a file called 'user_data.txt'
- Next time they run the program, greet them by name automatically

Level 4 - Multiple Advice Types:
- Ask if they want: coding advice, health advice, or motivation
- Give different responses based on their choice

Level 5 - Jarvis Evolution:
- Research the 'random' module
- Make Jarvis give different responses each time (more human-like)
"""