# Turbo Turtles: The Button Masher Race 🐢💨

Welcome to Session 2! Today we are building a multiplayer game.

## How to Play
1. Run the code.
2. Find a partner.
3. **Player 1** mashes the **`A`** key.
4. **Player 2** mashes the **`L`** key.
5. First to the finish line wins... but there's a problem!

## 🛠️ Your Mission: Complete the Game

The game is ALMOST ready, but it needs your help!

---

### 🎨 Challenge 1: Customize Your Turtles (5 minutes)
Make the game look cooler by changing:

**Colors:**
```python
player_1.color("red")  # Try: "purple", "orange", "pink"
```

**Shapes:**
```python
player_1.shape("turtle")  # Try: "arrow", "circle", "square"
```

**Background:**
```python
screen.bgcolor("forestgreen")  # Try: "black", "navy", "hotpink"
```

---

### ⚡ Challenge 2: Speed Control (5 minutes)
Right now the turtles move 10 steps per key press. Make them faster or slower!

Find the `move_p1()` and `move_p2()` functions:
```python
def move_p1():
    if not game_active:
        return
    player_1.forward(10)  # TODO: Change this number!
    check_winner()
```

**Experiments to try:**
- `forward(5)` - Slower race (more button mashing!)
- `forward(20)` - TURBO MODE!
- Different speeds for each player (sneaky advantage!)

---

### 🏆 Challenge 3: Fix the Winner Message (15 minutes)
**THE BIG PROBLEM:** Right now, when someone wins... nothing happens! 😱

Your job is to complete the `check_winner()` function so it displays a winner message.

**What you need to do:**
1. Find the `check_winner()` function (around line 60).
2. Read the hints in the comments.
3. Check if `player_1.xcor() > 200` (crossed the finish line).
4. Display a victory message using `writer.write()`.
5. Do the same for Player 2!
6. **BONUS:** What if both players cross at the same time?

**Success Criteria:**
- When Player 1 wins, a message appears on screen.
- When Player 2 wins, a different message appears.
- The spacebar restarts the game (already working!).

---

### 🚀 BONUS Challenges (If you finish early)

**Level 4: Victory Spin**
Make the winning turtle spin around:
```python
player_1.right(360)
```

**Level 5: Power-Up Button**
Add a "boost" that moves your turtle 50 steps (but you can only use it once!).

**Level 6: Sound Effects**
Research the `winsound` module (Windows) or `os.system("afplay /System/Library/Sounds/Glass.aiff")` (Mac) to play a sound when someone wins!
