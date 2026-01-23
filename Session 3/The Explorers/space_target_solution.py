# ============================================
# 🎯 MISSION: SPACE TARGET - SOLUTION 🎯
# ============================================
# This is the COMPLETED version for instructors.

import turtle
import random

# ========================================
# CHALLENGE 1: CUSTOMIZE THE GAME! 🎨 (SOLVED)
# ========================================
bg_color = "black"       # Space theme!
target_color = "red"     # The enemy!
target_shape = "circle"
game_speed = 0.8         # Faster!

# --- SETUP THE GAME WINDOW ---
screen = turtle.Screen()
screen.title("🎯 Mission: Space Target")
screen.bgcolor(bg_color)
screen.setup(600, 600)

# --- THE TARGET ---
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
pen.color("white")  # White text on black background

# --- GAME VARIABLES ---
score = 0
game_running = True

# ========================================
# CHALLENGE 2: FIX THE SCOREBOARD! 🏆 (SOLVED)
# ========================================

def update_scoreboard():
    """Display the score on screen"""
    pen.clear()
    pen.write(f"Score: {score}", align="center", font=("Arial", 24, "bold"))


def move_target():
    """Moves the target to a random spot on the screen"""
    if game_running:
        x = random.randint(-250, 250)
        y = random.randint(-250, 230)
        target.goto(x, y)
        screen.ontimer(move_target, int(game_speed * 1000))


def player_clicked(x, y):
    """This runs when you click the target!"""
    global score, game_running
    
    # CHALLENGE 2 SOLUTION: Update the score
    score = score + 1
    update_scoreboard()
    
    # CHALLENGE 3 SOLUTION: Check for win condition
    if score >= 10:
        game_running = False
        target.hideturtle()
        pen.goto(0, 0)
        pen.color("lime")
        pen.write("🎉 MISSION COMPLETE! 🎉", align="center", font=("Arial", 28, "bold"))
        return
    
    # Make the target jump immediately when clicked
    target.hideturtle()
    x = random.randint(-250, 250)
    y = random.randint(-250, 230)
    target.goto(x, y)
    target.showturtle()


# --- CONNECT THE CLICK EVENT ---
target.onclick(player_clicked)

# --- START THE GAME! ---
print("🎯 GAME STARTED! Click the target as fast as you can!")
update_scoreboard()  # Show initial score
move_target()
screen.mainloop()
