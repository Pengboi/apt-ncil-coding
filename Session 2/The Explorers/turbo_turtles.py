import turtle
import random

# --- SETUP THE GAME WINDOW ---
screen = turtle.Screen()
screen.title("Turbo Turtles - 2 Player Race")
screen.bgcolor("forestgreen")

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

# --- PLAYER 1 (Red Turtle) ---
# TODO 1: Change color and shape
player_1 = turtle.Turtle()
player_1.color("red")
player_1.shape("turtle")
player_1.penup()
player_1.goto(-200, 50)  # Starting position

# --- PLAYER 2 (Blue Turtle) ---
# TODO 1: Change color and shape
player_2 = turtle.Turtle()
player_2.color("blue")
player_2.shape("turtle")
player_2.penup()
player_2.goto(-200, -50) # Starting position

# Game state
game_active = True

# --- MOVEMENT FUNCTIONS ---
def move_p1():
    # TODO 2: Experiment with the speed
    if not game_active:
        return
    player_1.forward(10)
    check_winner()

def move_p2():
    # TODO 2: Experiment with the speed
    if not game_active:
        return
    player_2.forward(10)
    check_winner()

# --- WINNER CHECK ---
def check_winner():
    """
    TODO (Challenge 3): Fix the winner detection!
    
    Right now, this function does nothing. Your job is to:
    1. Check if player_1 has crossed the finish line (x > 200)
    2. Check if player_2 has crossed the finish line (x > 200)
    3. Display the correct winner message!
    
    HINTS:
    - Use player_1.xcor() to get Player 1's x position
    - Use player_2.xcor() to get Player 2's x position
    - The finish line is at x = 200
    
    EXAMPLE CODE TO GET YOU STARTED:
    """
    
    global game_active
    
    # Check if Player 1 crossed the line
    if player_1.xcor() > 200:
        game_active = False  # Stop the game
        writer.goto(0, 20)
        writer.write("YOUR MESSAGE HERE", align="center", font=("Arial", 24, "bold"))
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))
    
    # TODO: Add the same code for Player 2!
    # TODO: What if BOTH players cross at the same time? (Use 'elif' and 'else')
    
    pass  # Remove this line when you start coding!


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
