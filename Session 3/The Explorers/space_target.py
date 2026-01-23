# ============================================
# 🎯 MISSION: SPACE TARGET 🎯
# ============================================
# Click the target as fast as you can!
# But wait... there's no score? That's YOUR job to fix!

import turtle
import random

# ========================================
# CHALLENGE 1: CUSTOMIZE THE GAME! 🎨
# ========================================
# Change these values to make the game YOUR OWN!

bg_color = "white"       # Try: "black", "navy", "purple", "darkgreen"
target_color = "green"   # Try: "red", "yellow", "cyan", "hotpink"
target_shape = "circle"  # Try: "square", "triangle", "turtle", "arrow"
game_speed = 1.0         # How long the target stays still (seconds). Try: 0.8, 0.5, 0.3!

# --- SETUP THE GAME WINDOW ---
screen = turtle.Screen()
screen.title("🎯 Mission: Space Target")
screen.bgcolor(bg_color)
screen.setup(600, 600)

# --- THE TARGET (The thing you click!) ---
target = turtle.Turtle()
target.shape(target_shape)
target.color(target_color)
target.penup()
target.speed(0)

# --- THE SCOREBOARD ---
pen = turtle.Turtle()
pen.hideturtle()
pen.penup()
pen.goto(0, 260)
pen.color("black" if bg_color == "white" else "white")  # Auto-contrast!

# --- GAME VARIABLES ---
score = 0
game_running = True

# ========================================
# CHALLENGE 2: FIX THE SCOREBOARD! 🏆
# ========================================

def update_scoreboard():
    """
    This function should display the score on screen.
    Right now it does NOTHING!
    
    YOUR MISSION:
    1. Use pen.clear() to erase the old score
    2. Use pen.write() to show the new score
    
    EXAMPLE:
        pen.clear()
        pen.write(f"Score: {score}", align="center", font=("Arial", 24, "bold"))
    """
    pass  # DELETE THIS LINE and write your code!


def move_target():
    """Moves the target to a random spot on the screen"""
    if game_running:
        x = random.randint(-250, 250)
        y = random.randint(-250, 230)
        target.goto(x, y)
        
        # Schedule the next move automatically!
        screen.ontimer(move_target, int(game_speed * 1000))


def player_clicked(x, y):
    """This runs when you click the target!"""
    global score
    
    # ========================================
    # CHALLENGE 2 (CONTINUED): UPDATE THE SCORE!
    # ========================================
    # Right now clicking does nothing useful.
    # 
    # YOUR MISSION:
    # 1. Add 1 to the score variable
    # 2. Call update_scoreboard() to show the new score
    #
    # HINT: score = score + 1
    
    print("You got it!")  # This only prints to the console (boring!)
    
    # Make the target jump immediately when clicked
    target.hideturtle()
    x = random.randint(-250, 250)
    y = random.randint(-250, 230)
    target.goto(x, y)
    target.showturtle()


# ========================================
# CHALLENGE 3: MISSION COMPLETE! 🚀
# ========================================
# Can you make the game END when score reaches 10?
#
# HINT: Inside player_clicked, after updating the score:
#   if score >= 10:
#       game_running = False
#       target.hideturtle()
#       pen.goto(0, 0)
#       pen.write("MISSION COMPLETE!", align="center", font=("Arial", 32, "bold"))


# --- CONNECT THE CLICK EVENT ---
target.onclick(player_clicked)

# --- START THE GAME! ---
print("🎯 GAME STARTED! Click the target as fast as you can!")
move_target()
screen.mainloop()
