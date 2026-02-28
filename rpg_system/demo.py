"""
Demo script to show all classes: Knight, Tank, Samurai, and Mage in action.
"""
from character_stats import CharacterStats, StatType
from classes import Knight, Tank, Samurai, Mage


class MockTarget:
    """Mock enemy for testing effects."""
    def __init__(self, max_hp=1000):
        self.max_hp = max_hp
        self.current_hp = max_hp


def main():
    print("=" * 70)
    print("ADVENTURE RPG - CLASS DEMO")
    print("=" * 70)
    print()
    
    # ==================== KNIGHT DEMO ====================
    print("-" * 70)
    print("CLASS 1: KNIGHT")
    print("-" * 70)
    print()
    
    knight = Knight()
    print(knight.get_character_sheet())
    print()
    
    sword = knight.equipment[0]
    ability = sword.ability
    
    print(f"Weapon: {sword.name}")
    print(f"Ability: {ability.name}")
    print(f"Description: {ability.description}")
    print()
    
    print("Simulating Silvered Sword attacks:")
    print("-" * 30)
    
    target = MockTarget()
    
    for i in range(3):
        result = sword.attack(knight, target)
        crit_text = "CRITICAL! " if result["is_critical"] else ""
        print(f"Attack {i+1}: {crit_text}Damage = {result['damage']:.1f}")
    
    print()
    
    # ==================== TANK DEMO ====================
    print("-" * 70)
    print("CLASS 2: TANK")
    print("-" * 70)
    print()
    
    tank = Tank()
    print(tank.get_character_sheet())
    print()
    
    shield = tank.equipment[0]
    shield_ability = shield.ability
    
    print(f"Weapon: {shield.name}")
    print(f"Ability: {shield_ability.name}")
    print()
    
    activation = shield_ability.activate()
    print(f"Status: Hyperarmor ACTIVE ({activation['duration']}s, {activation['damage_reduction']*100:.0f}% reduction)")
    print()
    
    print("Simulating Bronze Bulwark bashes:")
    print("-" * 30)
    
    for i in range(3):
        result = shield.attack(tank, target)
        print(f"Bash {i+1}: Damage = {result['damage']:.1f}")
    
    print()
    
    # ==================== SAMURAI DEMO ====================
    print("-" * 70)
    print("CLASS 3: SAMURAI")
    print("-" * 70)
    print()
    
    samurai = Samurai()
    print(samurai.get_character_sheet())
    print()
    
    katana = samurai.equipment[0]
    bleed_ability = katana.ability
    
    print(f"Weapon: {katana.name}")
    print(f"Ability: {bleed_ability.name}")
    print()
    
    print("Simulating Sabertooth attacks:")
    print("-" * 30)
    
    for i in range(5):
        result = katana.attack(samurai, target)
        bleed_info = ""
        if result.get("ability_triggered") and result["ability_triggered"].get("applied"):
            bleed_info = " [BLEED!]"
        print(f"Slice {i+1}: Damage = {result['damage']:.1f}{bleed_info}")
    
    print()
    
    # ==================== MAGE DEMO ====================
    print("-" * 70)
    print("CLASS 4: MAGE")
    print("-" * 70)
    print()
    
    mage = Mage()
    print(mage.get_character_sheet())
    print()
    
    staff = mage.equipment[0]
    staff_ability = staff.ability
    
    print(f"Weapon: {staff.name}")
    print(f"Ability: {staff_ability.name}")
    print(f"Description: {staff_ability.description}")
    print()
    
    print("Simulating Crystal Staff spell casting:")
    print("-" * 30)
    
    for i in range(8):
        # Simulate casting
        cast_result = staff_ability.on_cast_start()
        
        if cast_result["proc_triggered"]:
            print(f"Spell {i+1}: [ETHEREAL FOCUS!] Hyperarmor + Guaranteed Crit!")
            # Force crit for this attack
            is_crit = True
        else:
            is_crit = False
        
        # Calculate damage
        damage = staff.calculate_damage(mage.stats)
        if is_crit or staff_ability.should_crit():
            damage *= 2.0
            crit_text = "CRIT! "
        else:
            crit_text = ""
        
        hyper_text = " [Hyperarmor]" if staff_ability.has_hyperarmor() else ""
        print(f"  {crit_text}Damage = {damage:.1f}{hyper_text}")
    
    print()
    
    # ==================== COMPARISON ====================
    print("=" * 70)
    print("CLASS COMPARISON")
    print("=" * 70)
    print()
    
    print(f"{'Stat':<15} {'Knight':<10} {'Tank':<10} {'Samurai':<10} {'Mage':<10}")
    print("-" * 60)
    
    stats = ['vitality', 'strength', 'durability', 'stamina', 'speed', 'magic', 'arcane']
    for stat in stats:
        k_val = getattr(knight.stats, stat)
        t_val = getattr(tank.stats, stat)
        s_val = getattr(samurai.stats, stat)
        m_val = getattr(mage.stats, stat)
        print(f"{stat.capitalize():<15} {k_val:<10} {t_val:<10} {s_val:<10} {m_val:<10}")
    
    print()
    print(f"{'Derived Stat':<20} {'Knight':<11} {'Tank':<11} {'Samurai':<11} {'Mage':<11}")
    print("-" * 60)
    print(f"{'Max HP':<20} {knight.stats.max_hp:<11} {tank.stats.max_hp:<11} {samurai.stats.max_hp:<11} {mage.stats.max_hp:<11}")
    print(f"{'Max Stamina':<20} {knight.stats.max_stamina:<11} {tank.stats.max_stamina:<11} {samurai.stats.max_stamina:<11} {mage.stats.max_stamina:<11}")
    print(f"{'Defense (DUR)':<20} {knight.stats.durability:<11} {tank.stats.durability:<11} {samurai.stats.durability:<11} {mage.stats.durability:<11}")
    print(f"{'Magic Power':<20} {knight.stats.magic:<11} {tank.stats.magic:<11} {samurai.stats.magic:<11} {mage.stats.magic:<11}")
    print(f"{'Movement (SPD)':<20} {knight.stats.speed:<11} {tank.stats.speed:<11} {samurai.stats.speed:<11} {mage.stats.speed:<11}")
    print(f"{'Crit Chance':<20} {knight.stats.crit_chance:.1f}%{'':<6} {tank.stats.crit_chance:.1f}%{'':<6} {samurai.stats.crit_chance:.1f}%{'':<6} {mage.stats.crit_chance:.1f}%")
    print()
    
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print()
    print("KNIGHT:  Balanced fighter. Silvered Sword rewards crits with damage boosts.")
    print()
    print("TANK:    Immovable fortress. Bronze Bulwark grants hyperarmor + damage reduction.")
    print()
    print("SAMURAI: Glass cannon speedster. Sabertooth inflicts stacking bleeds (0.5% HP/sec).")
    print()
    print("MAGE:    Arcane powerhouse. Crystal Staff grants hyperarmor + crits while casting.")
    print("         Highest Magic (8) for devastating spell damage.")
    print()


if __name__ == "__main__":
    main()
