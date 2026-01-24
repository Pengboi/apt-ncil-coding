# 🎯 Mission: Space Target

Welcome to Session 3! Today you're building a **clicking game** — hit the target before it moves!

## How to Play
1. Run the code
2. Click the moving target as fast as you can
3. But wait... there's no score! That's YOUR job to fix!

---

## 🎨 Challenge 1: Customize the Game (5 minutes)

Make the game look like a REAL space mission!

Find these lines at the top of the file:
```python
bg_color = "white"       # Try: "black", "navy", "purple"
target_color = "green"   # Try: "red", "yellow", "cyan"
target_shape = "circle"  # Try: "square", "triangle", "turtle"
game_speed = 1.0         # Try: 0.8 (faster!), 0.5 (very fast!)
```

**Recommended Space Theme:**
- `bg_color = "black"`
- `target_color = "red"`
- `game_speed = 0.8`

---

## 🏆 Challenge 2: Fix the Scoreboard (15 minutes)

Right now, clicking the target just prints to the console. Boring!

**YOUR MISSION:**

### Step 1: Find the `update_scoreboard` function
It looks like this:
```python
def update_scoreboard():
    pass  # DELETE THIS LINE and write your code!
```

### Step 2: Make it show the score
Replace `pass` with:
```python
    pen.clear()
    pen.write(f"Score: {score}", align="center", font=("Arial", 24, "bold"))
```

### Step 3: Find the `player_clicked` function
Look for where it says `print("You got it!")`

### Step 4: Add these lines AFTER the print:
```python
    score = score + 1
    update_scoreboard()
```

**DON'T FORGET:** You also need to add `global score` at the top of the function!

---

## 🚀 Challenge 3: Mission Complete! (10 minutes)

Can you make the game END when you reach 10 points?

**HINT:** Inside `player_clicked`, after updating the score, add:
```python
    if score >= 10:
        game_running = False
        target.hideturtle()
        pen.goto(0, 0)
        pen.write("MISSION COMPLETE!", align="center", font=("Arial", 32, "bold"))
```

**DON'T FORGET:** Add `game_running` to your `global` line!

---

## 🌟 BONUS Challenges

### Make the Target Shrink
Every time you click, make the target a bit smaller:
```python
target.shapesize(0.8)  # Smaller! Try different numbers
```

### Add a Miss Counter
What if clicking the background LOSES a point? 
Research: `screen.onclick()`

### Two Players
Can you add a SECOND target in a different color for a friend?
