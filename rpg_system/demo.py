"""
Demo script showing classes, loot drops, and equipment system.
"""
from character_stats import CharacterStats, StatType
from classes import Knight, Tank, Samurai, Mage
from loot_system import generate_loot, EnemyTier, LootTable
from equipment import generate_random_equipment, ArmorSlot, Rarity


class MockTarget:
    """Mock enemy for testing effects."""
    def __init__(self, max_hp=1000):
        self.max_hp = max_hp
        self.current_hp = max_hp


def main():
    print("=" * 70)
    print("ADVENTURE RPG - LOOT & EQUIPMENT DEMO")
    print("=" * 70)
    print()
    
    # Create a Knight
    print("-" * 70)
    print("CREATING CHARACTER: KNIGHT")
    print("-" * 70)
    knight = Knight()
    print(knight.get_character_sheet())
    print()
    
    # Simulate killing enemies and getting loot
    print("=" * 70)
    print("LOOT DROPS FROM ADVENTURE")
    print("=" * 70)
    print()
    
    encounters = [
        ("Goblin Scout", 5, EnemyTier.MINION),
        ("Orc Warrior", 15, EnemyTier.SOLDIER),
        ("Elite Knight", 30, EnemyTier.ELITE),
        ("Champion", 45, EnemyTier.CHAMPION),
    ]
    
    all_drops = []
    
    for enemy_name, level, tier in encounters:
        print(f"\nDefeated: {enemy_name} (Level {level})")
        print("-" * 50)
        
        loot = generate_loot(level, tier)
        print(loot)
        
        # Keep equipment for our character
        all_drops.extend(loot.equipment)
        all_drops.extend(loot.weapons)
    
    # Boss fight!
    print("\n" + "=" * 70)
    print("BOSS BATTLE: Iron Golem")
    print("=" * 70)
    
    boss_loot = generate_loot(50, EnemyTier.BOSS, boss_name="Iron Golem")
    print(f"\nDEFEATED IRON GOLEM!")
    print(boss_loot)
    all_drops.extend(boss_loot.equipment)
    
    # Equip the best items
    print("\n" + "=" * 70)
    print("EQUIPPING BEST LOOT")
    print("=" * 70)
    print()
    
    # Find best items for each slot
    best_items = {}
    for item in all_drops:
        if hasattr(item, 'slot'):  # It's armor
            if item.slot not in best_items or item.rarity.value > best_items[item.slot].rarity.value:
                best_items[item.slot] = item
    
    # Equip items
    for slot, item in best_items.items():
        old = knight.equip_armor(item)
        print(f"Equipped: [{item.rarity.label}] {item.name}")
        if item.passives:
            for passive in item.passives:
                print(f"  - {passive}")
        if old:
            print(f"  (Replaced: {old.name})")
        print()
    
    # Show updated character
    print("=" * 70)
    print("UPDATED KNIGHT WITH GEAR")
    print("=" * 70)
    print()
    print(knight.get_character_sheet())
    print()
    
    # Show stat comparison
    print("=" * 70)
    print("STAT IMPROVEMENTS FROM GEAR")
    print("=" * 70)
    print()
    
    effective = knight.get_effective_stats()
    print(f"Max HP: {knight.stats.max_hp} -> {effective['max_hp']:.0f} (+{effective['max_hp']-knight.stats.max_hp:.0f})")
    print(f"Defense: {knight.stats.durability * 2} -> {knight.get_total_defense()} (+{knight.get_total_defense() - knight.stats.durability * 2})")
    print(f"Crit Chance: {knight.stats.crit_chance:.1f}% -> {effective['crit_chance']:.1f}% (+{effective['crit_chance']-knight.stats.crit_chance:.1f}%)")
    print(f"Stamina Regen: {knight.stats.stamina_regen:.1f} -> {effective['stamina_regen']:.1f}/sec")
    print()
    
    # All classes comparison
    print("=" * 70)
    print("ALL CLASSES COMPARISON")
    print("=" * 70)
    print()
    
    classes = [Knight(), Tank(), Samurai(), Mage()]
    
    print(f"{'Class':<12} {'HP':<8} {'Def':<8} {'Spd':<8} {'Mag':<8} {'Arc':<8}")
    print("-" * 60)
    
    for cls in classes:
        print(f"{cls.name:<12} {cls.stats.max_hp:<8} {cls.get_total_defense():<8} "
              f"{cls.stats.speed:<8} {cls.stats.magic:<8} {cls.stats.arcane:<8}")
    
    print()
    print("=" * 70)


if __name__ == "__main__":
    main()
