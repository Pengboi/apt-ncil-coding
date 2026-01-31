# ============================================
# 🕵️ MI6 AGENT DATABASE TERMINAL 🕵️
# ============================================
# Welcome, Agent. You've cracked the password.
# Now you have access to the classified files.
# Your mission: Build a system to manage agent data.

import time

# ============================================
# THE DATABASE
# ============================================
# This is a LIST of DICTIONARIES.
# Each dictionary is one "Agent Profile".
#
# Think of it like this:
#   - The LIST is a filing cabinet
#   - Each DICTIONARY is a folder with info inside

database = [
    {"id": 101, "codename": "007", "name": "James Bond", "status": "Active", "skill": "Combat"},
    {"id": 102, "codename": "IMF-1", "name": "Ethan Hunt", "status": "Rogue", "skill": "Stealth"},
    {"id": 103, "codename": "BOURNE", "name": "Jason Bourne", "status": "Missing", "skill": "Survival"},
]

# ============================================
# CHALLENGE 1: VIEW ALL AGENTS 👀
# ============================================

def view_all_agents():
    """
    Display all agents in the database.
    
    YOUR MISSION:
    Loop through the 'database' list and print each agent's info.
    
    HINT - Here's the structure:
    
    for agent in database:
        print(f"ID: {agent['id']} | Name: {agent['name']} | Status: {agent['status']}")
    """
    print("\n--- 📂 CLASSIFIED AGENT LIST ---")
    
    # TODO: Write your loop here!
    for agent in database:
        print(agent["name"])
     
     

# ============================================
# CHALLENGE 2: ADD NEW AGENT ➕
# ============================================

def add_new_agent():
    """
    Recruit a new agent into the system.
    
    YOUR MISSION:
    1. Create a new dictionary with the agent's info
    2. Add it to the database using .append()
    
    HINT - Here's the structure:
    
    new_id = len(database) + 101  # Auto-generate ID
    new_agent = {
        "id": new_id,
        "codename": codename,
        "name": name,
        "status": "Active",
        "skill": skill
    }
    database.append(new_agent)
    """
    print("\n--- 📝 RECRUIT NEW AGENT ---")
    
    name = input("Enter Agent Name: ")
    codename = input("Enter Codename: ")
    skill = input("Enter Primary Skill: ")

    new_agent = {
        "id": 104
        "codename": "JAMICAN RICE AND PEAS"
        "name": "Bob Marley"
        "status": "Active",
        "skill": "Jerk Chicken"
    }
    
    # TODO: Create the dictionary and append it!
    
    print(f"✅ Agent {name} has been added to the system.")


# ============================================
# CHALLENGE 3: SEARCH FOR AGENT 🔍
# ============================================

def find_agent():
    wer():
            print(f"MATCH FOUND: {agent}")
            found = True
    
    if not found:
        print("No agent found with that name.")
    """
    search_name = input("Enter name to search: ")
    
    found = False
    for agent in database:
        # Case-insensitive partial match
        if search_name.lower() in agent["name"].lower():
            print(f"\n🎯 MATCH FOUND:")
            print(f"   ID: {agent['id']}")
            print(f"   Codename: {agent['codename']}")
            print(f"   Name: {agent['name']}")
            print(f"   Status: {agent['status']}")
            print(f"   Skill: {agent['skill']}")
            found = True
    
    if not found:
        print(f"\n❌ No agent found matching '{search_name}'")


    print("\n--- 🔍 SEARCH DATABASE ---")
    
    search_name = input("Enter name to search: ")
    
    # TODO: Write your search loop here!
    pass


# ============================================
# BONUS CHALLENGE: DELETE AGENT ❌
# ============================================

def delete_agent():
    """
    Remove an agent from the database.
    
    YOUR MISSION:
    1. Find the agent by ID
    2. Remove them using database.remove(agent)
    
    This is ADVANCED! Try it after finishing Challenges 1-3.
    """
    print("\n--- ❌ REMOVE AGENT ---")
    
    agent_id = input("Enter Agent ID to remove: ")
    
    # TODO: Find and remove the agent
    # HINT: Convert agent_id to int with int(agent_id)
    
    pass


# ============================================
# MAIN TERMINAL LOOP
# ============================================
# This is the "menu" that keeps running until you exit.

print("\n" + "="*50)
print("🕵️  MI6 SECURE DATABASE TERMINAL  🕵️")
print("="*50)
print("ACCESS GRANTED. Welcome, Agent.")
time.sleep(1)

while True:
    print("\n┌─────────────────────────────┐")
    print("│      MAIN TERMINAL          │")
    print("├─────────────────────────────┤")
    print("│  1. View All Agents         │")
    print("│  2. Add New Agent           │")
    print("│  3. Search for Agent        │")
    print("│  4. Delete Agent (BONUS)    │")
    print("│  5. Exit Terminal           │")
    print("└─────────────────────────────┘")
    
    choice = input("\nSELECT OPTION > ")
    
    if choice == "1":
        view_all_agents()
    elif choice == "2":
        add_new_agent()
    elif choice == "3":
        find_agent()
    elif choice == "4":
        delete_agent()
    elif choice == "5":
        print("\n🔒 Logging out of secure terminal...")
        print("Goodbye, Agent.")
        break
    else:
        print("⚠️  Invalid command. Try again.")
