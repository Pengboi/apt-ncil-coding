# 🐍 Session 1: Snake Game - The Explorers

Welcome to your first coding project! Today you'll learn how games work by building and customizing the classic Snake game.

## 🎯 Learning Goals

By the end of this session, you will understand:
- **Variables:** Storing information (like colors and speed)
- **Loops:** Making things repeat (the game loop)
- **Conditionals:** Making decisions (if the snake hits a wall...)
- **Functions:** Organizing code into reusable pieces

---

## 🚀 Getting Started

### 1. Open the Game
```bash
cd "Session 1/The Explorers"
python snake_template.py
```

### 2. Play the Game!
- Use **WASD** or **Arrow Keys** to move
- Eat the blue food to grow
- Don't hit the walls or yourself!

---

## 🎨 Your Challenge: Customize It!

Open `snake_template.py` and find the **CONFIG** section at the top:

```python
# --- CONFIG (TEAM EXPLORERS EDIT THIS SECTION) ---
DELAY = 0.1          # How fast is the game?
SNAKE_COLOR = "red"  # What color is your snake?
BG_COLOR = "white"   # What color is the background?
FOOD_COLOR = "blue"  # What color is the food?
SHAPE = "circle"     # What shape is your snake?
# ----------------------------------------------
```

### Try These Experiments:

#### Experiment 1: Speed Control
```python
DELAY = 0.05  # Makes the game faster!
DELAY = 0.2   # Makes the game slower!
```

#### Experiment 2: Color Party
```python
SNAKE_COLOR = "purple"
BG_COLOR = "black"
FOOD_COLOR = "yellow"
```
Try: `"red"`, `"blue"`, `"green"`, `"yellow"`, `"purple"`, `"orange"`, `"pink"`

#### Experiment 3: Shape Shifter
```python
SHAPE = "square"    # Square snake!
SHAPE = "triangle"  # Triangle snake!
SHAPE = "circle"    # Round snake!
```

---

## 🏆 Bonus Challenges (For Advanced Explorers)

### Challenge 1: Make it Easier
Can you make the game **impossible to lose**? 
*Hint: Look at lines 107-114 (border collision)*

### Challenge 2: Rainbow Snake
Can you make each segment of the snake a different color?
*Hint: Look at line 131 where new segments are created*

### Challenge 3: Super Speed Mode
Make the snake get **faster** as it eats more food
*Hint: Look at line 137 where delay changes*

---

## 📚 How It Works (For Curious Minds)

### The Game Loop
```python
while True:
    wn.update()           # Refresh the screen
    # ... check for collisions ...
    move()                # Move the snake
    # ... update score ...
```
This loop runs **forever** (until you close the window), making the game "alive"!

### Collision Detection
```python
if head.distance(food) < 20:
    # Snake ate food!
```
The computer measures the distance between the snake's head and the food. If they're close enough, you score!

---

## 🎓 Key Concepts You've Learned

| Concept | What It Does | Example |
|---------|-------------|---------|
| **Variable** | Stores a value | `DELAY = 0.1` |
| **Function** | Reusable code | `def go_up():` |
| **Loop** | Repeats code | `while True:` |
| **Conditional** | Makes decisions | `if head.xcor() > 290:` |

---

## 🌟 Show & Tell

At the end of the session, be ready to:
1. Show your customized snake game
2. Explain **one thing** you changed
3. Share what you learned

---

## 📝 Take It Home

**Weekend Challenge:** Can you add a **score counter** to the game? 
*Hint: You'll need to create a turtle to display text!*

---

*Remember: Every game you've ever played was built using these same basic concepts. You're learning the language of game developers! 🎮*
