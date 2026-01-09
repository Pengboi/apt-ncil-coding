import time
import itertools
import string

print("=========================================")
print("🕵️  M.I.6 AUTOMATED PASSWORD AUDITOR  🕵️")
print("=========================================")
print("WARNING: Only use this on your own passwords.")
print("ETHICAL HACKING RULE: Never attempts to crack accounts you don't own.\n")

target_password = input("ENTER PASSWORD TO TEST STRENGTH > ")

start_time = time.time()
found = False
attempts = 0

print(f"\n[*] INITIATING BRUTE FORCE ATTACK ON: {target_password}")
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

# (Scroll down for Level 2 only after you finish Level 1!)











# ==============================================================================
# LEVEL 2: THE "MATRIX" ATTACK (Letters & Numbers)
# ==============================================================================
# Since we don't know the length, we might need a library called 'itertools'.
# or just a simple character list loop.

chars = "abcdefghijklmnopqrstuvwxyz" # Add numbers/symbols here to make it stronger!

# Logic to try 1-character, then 2-character, then 3-character passwords...
# This is hard to write with just 'for' loops! 
# We will use itertools.product later.

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
