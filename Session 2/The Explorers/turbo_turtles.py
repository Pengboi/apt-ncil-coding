import turtle
import random

# ============================================
# TURBO TURTLES - 2 PLAYER RACING GAME! 🐢💨
# ============================================

# --- SETUP THE GAME WINDOW ---
screen = turtle.Screen()
screen.title("Turbo Turtles - 2 Player Race")
screen.bgcolor("forestgreen")  # CHALLENGE 1: Try changing this to "black", "navy", or "hotpink"!

# --- MESSAGE WRITER ---
writer = turtle.Turtle()
writer.hideturtle()
writer.penup()

# --- DRAW THE FINISH LINE ---
referee = turtle.Turtle()
referee.penup()
referee.goto(200, 200)
referee.pendown()
referee.right(90)
referee.width(5)
referee.forward(400)
referee.hideturtle()

# ========================================
# CHALLENGE 1: CUSTOMIZE YOUR TURTLES! 🎨
# ========================================

# --- PLAYER 1 (Red Turtle) ---
player_1 = turtle.Turtle()
player_1.color("red")       # CHALLENGE 1: Change me! Try "purple", "orange", "lime"
player_1.shape("turtle")    # CHALLENGE 1: Change me! Try "arrow", "circle", "square"
player_1.penup()
player_1.goto(-200, 50)  # Starting position

# --- PLAYER 2 (Blue Turtle) ---
player_2 = turtle.Turtle()
player_2.color("blue")      # CHALLENGE 1: Change me! Try "cyan", "yellow", "pink"
player_2.shape("turtle")    # CHALLENGE 1: Change me! Try "arrow", "circle", "square"
player_2.penup()
player_2.goto(-200, -50) # Starting position

# Game state
game_active = True

# ========================================
# CHALLENGE 2: SPEED CONTROL! ⚡
# ========================================

# --- MOVEMENT FUNCTIONS ---
def move_p1():
    if not game_active:
        return
    player_1.forward(10)  # CHALLENGE 2: Change this number! Try 5 (slow) or 20 (FAST!)
    check_winner()

def move_p2():
    if not game_active:
        return
    player_2.forward(10)  # CHALLENGE 2: Change this number! Make it different from Player 1!
    check_winner()

# ========================================
# CHALLENGE 3: FIX THE WINNER MESSAGE! 🏆
# ========================================

def check_winner():
    """
    Right now, when someone wins... nothing happens! 😱
    
    YOUR MISSION:
    1. Check if player_1 crossed the finish line (hint: use player_1.xcor() > 200)
    2. Check if player_2 crossed the finish line
    3. Show a cool winner message on the screen!
    
    COPY THIS CODE TO GET STARTED:
    (Remove the 'pass' line below first!)
    """
    
    global game_active
    
    # STEP 1: Check if Player 1 won
    if player_1.xcor() > 200:
        game_active = False  # Stop the game so players can't keep moving
        writer.goto(0, 20)   # Move to the middle of the screen
        writer.write("HAHAHAHA I WON U LOSER LOLL SO BADD AT THIS GAMEEE!", align="center", font=("Arial", 24, "bold"))  # Your message!
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))
    

    if player_2.xcor() > 200:
        game_active = False  # Stop the game so players can't keep moving
        writer.goto(0, 20)   # Move to the middle of the screen
        writer.write("Amina the slayest one wins AND U LOST LOSER LOSER BLEHH!", align="center", font=("Arial", 24, "bold"))  # Your message!
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))
    
    # STEP 2: Now YOU write the code for Player 2! (Copy the code above and change it)
    # Use 'elif' instead of 'if' so only ONE player can win
    
    # STEP 3 (BONUS): What if BOTH turtles cross at the EXACT same time?
    # Add an 'else' at the end with a tie message like "It's a tie!"
    
    pass  # DELETE THIS LINE when you start writing your code!


def reset_game():
    """Reset turtles to starting positions and clear messages."""
    global game_active
    player_1.goto(-200, 50)
    player_2.goto(-200, -50)
    writer.clear()
    game_active = True

# --- KEYBOARD CONTROLS ---
screen.listen()

# Player 1 uses 'a' key
screen.onkey(move_p1, "a")
screen.onkey(move_p1, "A")

# Player 2 uses 'l' key
screen.onkey(move_p2, "l")
screen.onkey(move_p2, "L")

# Restart on spacebar
screen.onkey(reset_game, "space")

print("GAME STARTED! Mash 'A' (Player 1) and 'L' (Player 2) to win!")

# Keep the window open
screen.mainloop()
