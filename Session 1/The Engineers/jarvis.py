"""
JARVIS - Your First AI Assistant
=================================
Mission: Build a chatbot that can understand you and give personalized advice.

Your Task: Fill in the blanks (marked with TODO) to complete Jarvis.
"""

# --- STEP 1: GREETING ---
print("🤖 JARVIS: Hello! I'm your AI assistant.")
print("🤖 JARVIS: What's your name?")

# TODO: Get the user's name and store it in a variable called 'name'
name = ""  # Replace this with input()

print(f"🤖 JARVIS: Nice to meet you, {name}!")

# --- STEP 2: ASSESS MOOD ---
print("\n🤖 JARVIS: How are you feeling today?")
print("   Options: tired, excited, stressed, happy")

# TODO: Get the user's mood and store it in a variable called 'mood'
mood = ""  # Replace this with input()

# --- STEP 3: GET CONTEXT ---
print("\n🤖 JARVIS: What are you working on today?")

# TODO: Get what they're working on and store it in 'task'
task = ""  # Replace this with input()

# --- STEP 4: GENERATE ADVICE (THE BRAIN) ---
# TODO: Create an if/elif/else statement to give different advice based on mood

advice = ""  # This will store Jarvis's advice

# Example structure (you need to complete this):
# == basically means "are these two things equal?"

# if mood == "tired":
#     advice = "Take a 15-minute break and grab some water"
# elif mood == "excited":
#     advice = "Channel that energy! You're going to crush it"
# elif mood == "stressed":
#     advice = "..."
# elif mood == "happy":
#     advice = "..."
# else:
#     advice = "Whatever you're feeling, I'm here to help"

# --- STEP 5: PERSONALIZED RESPONSE ---
# TODO: Create a personalized response using an f-string
# It should include: name, mood, task, and advice

response = f""  # Create your f-string here

print(f"\n🤖 JARVIS: {response}")

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
