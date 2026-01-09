# 🕵️ Project: Password Strength Tester (Brute Force)

Today you are White Hat Hackers. You are building a tool to demonstrate why simple passwords are dangerous.

## ⚠️ ETHICS WARNING
**We are "Ethical Hackers".** 
- We only test our OWN code/passwords.
- We never use these scripts on other people's devices or accounts.
- The goal is to learn how to DEFEND, not attack.

---

## 🎯 Level 1: The PIN Cracker
Most bank PINs are 4 digits (0000 - 9999). Computers are very good at counting.

**Your Goal:**
1. Use a `for` loop to generate every number from `0` to `9999`.
2. Convert the number to a string: `guess = str(i)`.
3. Check if `guess == target_password`.
4. If it matches, set `found = True` and `break` (stop the loop).

*Hint: If your PIN is "0007", `str(7)` gives "7". You might need to look up how to "pad with zeros" in Python if you want to be fancy found as `zfill(4)`.*

---

## 💻 Level 2: The "Hacker" Effect
Real hackers don't just stare at a blank screen. They want logs!
Inside your loop, print the attempts:

```python
print(f"Trying: {guess}")
```

**Challenge:** This slows down the computer! (Printing takes time).
- Try to crack a password with the print statement.
- Comment out the print statement and try again.
- Note the time difference!

---

## 🔐 Level 3: Text Passwords (Advanced)
Numbers are easy. Letters are harder.
Instead of `range()`, we need to loop through characters.

```python
chars = "abcdefghijklmnopqrstuvwxyz"
for letter1 in chars:
    for letter2 in chars:
        guess = letter1 + letter2
        # Check guess...
```
*Note: This gets messy fast. Ask your mentor about `itertools`!*
