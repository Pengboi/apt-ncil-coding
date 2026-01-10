import time
import getpass  # For hiding password input

print("=========================================")
print("🕵️  M.I.6 AUTOMATED PASSWORD AUDITOR  🕵️")
print("=========================================")
print("WARNING: Only use this on your own passwords.")
print("ETHICAL HACKING RULE: Never attempts to crack accounts you don't own.\n")

target_password = getpass.getpass("ENTER PASSWORD TO TEST STRENGTH > ")

start_time = time.time()
found = False
attempts = 0

print(f"\n[*] INITIATING BRUTE FORCE ATTACK ON PASSWORD")
print("[*] GENERATING KEYS...")
time.sleep(1) # Dramatic pause

# ==============================================================================
# LEVEL 1: THE PIN CRACKER (Numbers Only)
# ==============================================================================
# CHALLENGE: Write a loop that counts from 0 to 9999.
# Convert the number to a string and check if it matches 'target_password'.

# TODO: WRITE YOUR LOOP HERE
# Example logic:
# for i in range(1000):
#     guess = str(i)
#     ... compare with target_password ...
if not found:
    for i in range(10000000000):  # Try all numbers from 0 to 9999
        guess = str(i).zfill(10)  # Convert to string and pad with zeros (e.g., "0042")
        attempts += 1
        print(f"trying:{guess}")
        #SO it starts to tell the code try all number from 0 - 9999 because thats all the digits in a four digit password.
        #The guess = line is telling the code to print i which is the variable for numbers. 
        #The the zfill(4) makes sure the i prints a 4 digit number.NoT A 3 or another number.
        #so if i put zfill(10)it will give me a 10 digit number.
    
        # Optional: Print attempts (WARNING: This slows down the program!)
        # print(f"Trying: {guess}")
        
        if guess == target_password:
            found = True
            break

# (Scroll down for Level 2 only after you finish Level 1!)











# ==============================================================================
# LEVEL 2: THE "MATRIX" ATTACK (Letters & Numbers)
# ==============================================================================
# What if the password is "cat" or "dog"? We need to try LETTERS now!

# This is the character set we'll try:
chars = "abcdefghijklmnopqrstuvwxyz"  # TODO: Add numbers later! Try "abc123"

# CHALLENGE: Try all 2-letter combinations (aa, ab, ac, ..., zz)
# HINT: You need TWO for loops (one inside another!)

# TODO: WRITE YOUR NESTED LOOP HERE
# Example structure:
# for letter1 in chars:
#     for letter2 in chars:
#         guess = letter1 + letter2
#         attempts += 1
#         if guess == target_password:
#             found = True
#             break  # Exit the inner loop
#     if found:
#         break  # Exit the outer loop too!

# BONUS: Can you add a THIRD loop to try 3-letter passwords? (Warning: SLOW!)

# ==============================================================================
# [SYSTEM OUTPUT]
# ==============================================================================

if found:
    end_time = time.time()
    duration = end_time - start_time
    print(f"\n[!!!] PASSWORD CRACKED: {target_password}")
    print(f"[!!!] ATTEMPTS: {attempts}")
    print(f"[!!!] TIME TAKEN: {duration:.2f} seconds")
else:
    print("\n[X] FAILED: Password too strong for this basic script.")
