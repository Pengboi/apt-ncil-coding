# 🕵️ MI6 Agent Database

Welcome to Session 3, Agent. You cracked the password last week. Now you have access to the classified files.

## The Mission

Build a system to **store, search, and manage** MI6 agent data. This is exactly how real databases work!

## 🧠 New Concepts

### Lists
A list holds multiple items in order:
```python
agents = ["Bond", "Hunt", "Bourne"]
print(agents[0])  # Output: Bond
```

### Dictionaries
A dictionary holds labeled data (like a profile):
```python
agent_007 = {
    "name": "James Bond",
    "status": "Active",
    "skill": "Combat"
}
print(agent_007["name"])  # Output: James Bond
```

### The Database
Our database is a **list of dictionaries** — each dictionary is one agent's profile!

---

## 👀 Challenge 1: View All Agents (10 minutes)

Open `agent_db.py` and find the `view_all_agents()` function.

**YOUR MISSION:** Loop through the database and print each agent.

```python
for agent in database:
    print(f"ID: {agent['id']} | Name: {agent['name']} | Status: {agent['status']}")
```

**Test it:** Run the program and select Option 1.

---

## ➕ Challenge 2: Add New Agent (15 minutes)

Find the `add_new_agent()` function.

**YOUR MISSION:** Create a new dictionary and add it to the database.

```python
new_id = len(database) + 101

new_agent = {
    "id": new_id,
    "codename": codename,
    "name": name,
    "status": "Active",
    "skill": skill
}

database.append(new_agent)
```

**Test it:** Add a new agent, then use Option 1 to see if they appear!

---

## 🔍 Challenge 3: Search for Agent (15 minutes)

Find the `find_agent()` function.

**YOUR MISSION:** Loop through the database and find matching names.

```python
found = False

for agent in database:
    if search_name.lower() in agent["name"].lower():
        print(f"MATCH FOUND: {agent}")
        found = True

if not found:
    print("No agent found with that name.")
```

**Pro tip:** Using `.lower()` makes the search case-insensitive!

---

## 🌟 BONUS Challenges

### Delete Agent (Option 4)
Remove an agent from the database using:
```python
database.remove(agent)
```

### Save to File
Make the data persist! Use:
```python
with open("agents.txt", "w") as file:
    for agent in database:
        file.write(f"{agent}\n")
```

### Status Update
Add Option 5 to change an agent's status from "Active" to "Retired".

---

## 🎓 Why This Matters

This "list of dictionaries" structure is **exactly** how:
- Websites store user accounts
- Apps store your contacts
- Games store player profiles
- Real databases work (SQL, MongoDB)

Next week, we'll connect this to a REAL interface!
