import turtle
import time
import random

# --- CONFIG (TEAM EXPLORERS EDIT THIS SECTION) ---
DELAY = 0.1          # How fast is the game? (Lower is faster. Try 0.05)
SNAKE_COLOR = "green" # Try "blue", "red", "yellow", "white", "purple"
BG_COLOR = "black"    # Try "white", "navy", "darkred"
FOOD_COLOR = "red"    # Color of the food
SHAPE = "square"      # Try "circle" or "triangle"
# ----------------------------------------------

# Set up the screen
wn = turtle.Screen()
wn.title("Snake Game by Session 1")
wn.bgcolor(BG_COLOR)
wn.setup(width=600, height=600)
wn.tracer(0) # Turns off the screen updates (makes game smoother)

# Snake Head
head = turtle.Turtle()
head.speed(0)
head.shape(SHAPE)
head.color(SNAKE_COLOR)
head.penup()
head.goto(0, 0)
head.direction = "stop"

# Snake Food
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color(FOOD_COLOR)
food.penup()
food.goto(0, 100)

segments = []

# Functions
def go_up():
    if head.direction != "down":
        head.direction = "up"

def go_down():
    if head.direction != "up":
        head.direction = "down"

def go_left():
    if head.direction != "right":
        head.direction = "left"

def go_right():
    if head.direction != "left":
        head.direction = "right"

def move():
    if head.direction == "up":
        y = head.ycor()
        head.sety(y + 20)

    if head.direction == "down":
        y = head.ycor()
        head.sety(y - 20)

    if head.direction == "left":
        x = head.xcor()
        head.setx(x - 20)

    if head.direction == "right":
        x = head.xcor()
        head.setx(x + 20)

# Keyboard bindings
wn.listen()
wn.onkey(go_up, "w")
wn.onkey(go_down, "s")
wn.onkey(go_left, "a")
wn.onkey(go_right, "d")
wn.onkey(go_up, "Up")
wn.onkey(go_down, "Down")
wn.onkey(go_left, "Left")
wn.onkey(go_right, "Right")

# Main Game Loop
try:
    while True:
        wn.update()

        # Check for collision with border
        if head.xcor() > 290 or head.xcor() < -290 or head.ycor() > 290 or head.ycor() < -290:
            time.sleep(1)
            head.goto(0, 0)
            head.direction = "stop"

            # Hide the segments
            for segment in segments:
                segment.goto(1000, 1000)
            segments.clear()
            DELAY = 0.1

        # Check for collision with food
        if head.distance(food) < 20:
            # Move the food to a random spot
            x = random.randint(-280, 280)
            y = random.randint(-280, 280)
            food.goto(x, y)

            # Add a segment
            new_segment = turtle.Turtle()
            new_segment.speed(0)
            new_segment.shape(SHAPE)
            new_segment.color(SNAKE_COLOR)
            new_segment.penup()
            segments.append(new_segment)

            # Shorten the delay slightly to make it harder
            DELAY -= 0.001

        # Move the end segments first in reverse order
        for index in range(len(segments) - 1, 0, -1):
            x = segments[index - 1].xcor()
            y = segments[index - 1].ycor()
            segments[index].goto(x, y)

        # Move segment 0 to where the head is
        if len(segments) > 0:
            x = head.xcor()
            y = head.ycor()
            segments[0].goto(x, y)

        move()

        # Check for collision with body
        for segment in segments:
            if segment.distance(head) < 20:
                time.sleep(1)
                head.goto(0, 0)
                head.direction = "stop"
                for segment in segments:
                    segment.goto(1000, 1000)
                segments.clear()
                DELAY = 0.1

        time.sleep(DELAY)

except turtle.Terminator:
    print("Game closed.")
