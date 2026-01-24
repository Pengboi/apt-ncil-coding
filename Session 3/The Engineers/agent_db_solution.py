# ============================================
# 🕵️ MI6 AGENT DATABASE - SOLUTION 🕵️
# ============================================
# This is the COMPLETED version for instructors.

import time

# ============================================
# THE DATABASE
# ============================================

database = [
    {"id": 101, "codename": "007", "name": "James Bond", "status": "Active", "skill": "Combat"},
    {"id": 102, "codename": "IMF-1", "name": "Ethan Hunt", "status": "Rogue", "skill": "Stealth"},
    {"id": 103, "codename": "BOURNE", "name": "Jason Bourne", "status": "Missing", "skill": "Survival"},
]

# ============================================
# CHALLENGE 1: VIEW ALL AGENTS - SOLUTION
# ============================================

def view_all_agents():
    """Display all agents in the database."""
    print("\n--- 📂 CLASSIFIED AGENT LIST ---")
    print("-" * 60)
    
    for agent in database:
        print(f"ID: {agent['id']} | Codename: {agent['codename']} | Name: {agent['name']}")
        print(f"   Status: {agent['status']} | Skill: {agent['skill']}")
        print("-" * 60)
    
    print(f"Total Agents: {len(database)}")


# ============================================
# CHALLENGE 2: ADD NEW AGENT - SOLUTION
# ============================================

def add_new_agent():
    """Recruit a new agent into the system."""
    print("\n--- 📝 RECRUIT NEW AGENT ---")
    
    name = input("Enter Agent Name: ")
    codename = input("Enter Codename: ")
    skill = input("Enter Primary Skill: ")
    
    # Generate a new unique ID
    new_id = len(database) + 101
    
    # Create the new agent dictionary
    new_agent = {
        "id": new_id,
        "codename": codename,
        "name": name,
        "status": "Active",
        "skill": skill
    }
    
    # Add to the database
    database.append(new_agent)
    
    print(f"\n✅ Agent {name} (ID: {new_id}) has been added to the system.")


# ============================================
# CHALLENGE 3: SEARCH FOR AGENT - SOLUTION
# ============================================

def find_agent():
    """Search the database for a specific agent."""
    print("\n--- 🔍 SEARCH DATABASE ---")
    
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


# ============================================
# BONUS: DELETE AGENT - SOLUTION
# ============================================

def delete_agent():
    """Remove an agent from the database."""
    print("\n--- ❌ REMOVE AGENT ---")
    
    # First show all agents so they can see IDs
    view_all_agents()
    
    agent_id = input("\nEnter Agent ID to remove: ")
    
    try:
        agent_id = int(agent_id)
    except ValueError:
        print("⚠️  Invalid ID. Must be a number.")
        return
    
    # Find and remove the agent
    for agent in database:
        if agent["id"] == agent_id:
            database.remove(agent)
            print(f"\n✅ Agent {agent['name']} has been removed from the system.")
            return
    
    print(f"\n❌ No agent found with ID {agent_id}")


# ============================================
# ADVANCED BONUS: SAVE TO FILE
# ============================================

def save_to_file():
    """Save the database to a text file."""
    with open("agents_backup.txt", "w") as file:
        for agent in database:
            file.write(f"{agent['id']},{agent['codename']},{agent['name']},{agent['status']},{agent['skill']}\n")
    print("\n💾 Database saved to agents_backup.txt")


# ============================================
# MAIN TERMINAL LOOP
# ============================================

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
    print("│  4. Delete Agent            │")
    print("│  5. Save to File (BONUS)    │")
    print("│  6. Exit Terminal           │")
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
        save_to_file()
    elif choice == "6":
        print("\n🔒 Logging out of secure terminal...")
        print("Goodbye, Agent.")
        break
    else:
        print("⚠️  Invalid command. Try again.")
