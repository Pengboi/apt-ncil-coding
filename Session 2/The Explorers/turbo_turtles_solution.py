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
player_1 = turtle.Turtle()
player_1.color("red")
player_1.shape("turtle")
player_1.penup()
player_1.goto(-200, 50)

# --- PLAYER 2 (Blue Turtle) ---
player_2 = turtle.Turtle()
player_2.color("blue")
player_2.shape("turtle")
player_2.penup()
player_2.goto(-200, -50)

# Game state
game_active = True

# --- MOVEMENT FUNCTIONS ---
def move_p1():
    if not game_active:
        return
    player_1.forward(10)
    check_winner()

def move_p2():
    if not game_active:
        return
    player_2.forward(10)
    check_winner()

# --- WINNER CHECK (SOLUTION) ---
def check_winner():
    """
    SOLUTION: This is the completed version for the instructor.
    Students will implement this themselves in Challenge 3.
    """
    global game_active
    
    # Check if either player crossed the finish line
    p1_crossed = player_1.xcor() > 200
    p2_crossed = player_2.xcor() > 200
    
    # Only check winners if game is still active
    if not game_active:
        return
    
    # Both players crossed at the same time (tie)
    if p1_crossed and p2_crossed:
        game_active = False
        writer.goto(0, 20)
        writer.write("I don't know who won :(", align="center", font=("Arial", 24, "bold"))
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))
    
    # Player 1 won
    elif p1_crossed:
        game_active = False
        writer.goto(0, 20)
        writer.write("PLAYER 1 WINS!", align="center", font=("Arial", 24, "bold"))
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))
    
    # Player 2 won
    elif p2_crossed:
        game_active = False
        writer.goto(0, 20)
        writer.write("PLAYER 2 WINS!", align="center", font=("Arial", 24, "bold"))
        writer.goto(0, -20)
        writer.write("Press SPACE to play again", align="center", font=("Arial", 16, "normal"))


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
