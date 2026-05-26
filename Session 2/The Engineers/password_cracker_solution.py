import time
import itertools
import string
import getpass  # For hiding password input

print("=========================================")
print("🕵️  M.I.6 AUTOMATED PASSWORD AUDITOR  🕵️")
print("=========================================")
print("WARNING: Only use this on your own passwords.")
print("ETHICAL HACKING RULE: Never attempt to crack accounts you don't own.\n")

target_password = getpass.getpass("ENTER PASSWORD TO TEST STRENGTH > ")

start_time = time.time()
found = False
attempts = 0

print(f"\n[*] INITIATING BRUTE FORCE ATTACK ON PASSWORD")
print("[*] GENERATING KEYS...")
time.sleep(1)

# ==============================================================================
# LEVEL 1: THE PIN CRACKER (Numbers Only) - SOLUTION
# ==============================================================================

# Try to crack numeric passwords (like "1234" or "9876")
if not found:
    for i in range(10000):  # Try all numbers from 0 to 9999
        guess = str(i).zfill(4)  # Convert to string and pad with zeros (e.g., "0042")
        attempts += 1
        
        # Optional: Print attempts (WARNING: This slows down the program!)
        # print(f"Trying: {guess}")
        
        if guess == target_password:
            found = True
            break

# ==============================================================================
# LEVEL 2: THE "MATRIX" ATTACK (Letters & Numbers) - SOLUTION
# ==============================================================================

# If the PIN cracker didn't work, try letter combinations
if not found:
    chars = "abcdefghijklmnopqrstuvwxyz0123456789"  # Lowercase letters + numbers
    
    # Try 1-character passwords (a, b, c, ...)
    for char in chars:
        attempts += 1
        if char == target_password:
            found = True
            break
    
    # Try 2-character passwords (aa, ab, ac, ...)
    if not found:
        for char1 in chars:
            for char2 in chars:
                guess = char1 + char2
                attempts += 1
                
                # Optional: Add visual effect
                # print(f"Trying: {guess}")
                
                if guess == target_password:
                    found = True
                    break
            if found:
                break
    
    # Try 3-character passwords (aaa, aab, aac, ...)
    # WARNING: This takes a LONG time! (46,656 combinations)
    if not found:
        for char1 in chars:
            for char2 in chars:
                for char3 in chars:
                    guess = char1 + char2 + char3
                    attempts += 1
                    
                    if guess == target_password:
                        found = True
                        break
                if found:
                    break
            if found:
                break
    
    # Try 4-character passwords (aaaa, aaab, aaac, ...)
    # WARNING: This takes VERY LONG! (1,679,616 combinations)
    if not found:
        for char1 in chars:
            for char2 in chars:
                for char3 in chars:
                    for char4 in chars:
                        guess = char1 + char2 + char3 + char4
                        attempts += 1
                        
                        if guess == target_password:
                            found = True
                            break
                    if found:
                        break
                if found:
                    break
            if found:
                break

# ==============================================================================
# ADVANCED LEVEL: Using itertools.product (For Instructors)
# ==============================================================================
# This is the "professional" way to generate combinations
# Uncomment this section to see how it works:

"""
if not found:
    chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    
    # Try passwords of length 1, 2, 3, 4
    for length in range(1, 5):
        for combo in itertools.product(chars, repeat=length):
            guess = ''.join(combo)
            attempts += 1
            
            if guess == target_password:
                found = True
                break
        if found:
            break
"""

# ==============================================================================
# [SYSTEM OUTPUT]
# ==============================================================================

if found:
    end_time = time.time()
    duration = end_time - start_time
    print(f"\n[!!!] PASSWORD CRACKED: {target_password}")
    print(f"[!!!] ATTEMPTS: {attempts}")
    print(f"[!!!] TIME TAKEN: {duration:.2f} seconds")
    
    # Show why longer passwords are better
    print("\n[INFO] PASSWORD STRENGTH ANALYSIS:")
    if len(target_password) <= 2:
        print("❌ WEAK: This password can be cracked in under 1 second!")
    elif len(target_password) == 3:
        print("⚠️  MEDIUM: This password takes a few seconds to crack.")
    elif len(target_password) == 4 and target_password.isdigit():
        print("⚠️  MEDIUM: 4-digit PINs are easy to crack (only 10,000 possibilities).")
    else:
        print("✅ STRONG: This password would take a long time to crack!")
else:
    print("\n[X] FAILED: Password too strong for this basic script.")
    print("[INFO] Try a password with 1-3 characters to see it crack!")
