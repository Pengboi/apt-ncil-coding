"""
Loot generation system for enemy drops and treasure.
"""
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
import random

from equipment import (
    Equipment, ArmorSlot, Rarity, roll_rarity, generate_random_equipment,
    get_boss_drop, Passive, PassiveType
)
from weapons import Weapon, DamageType


@dataclass
class LootTable:
    """Defines what an enemy can drop."""
    # Equipment drops
    equipment_chance: float = 0.3  # 30% base chance for equipment
    min_equipment: int = 0
    max_equipment: int = 1
    
    # Weapon drops
    weapon_chance: float = 0.15  # 15% base chance for weapon
    
    # Consumables
    consumable_chance: float = 0.5
    
    # Gold/currency
    min_gold: int = 10
    max_gold: int = 50
    
    # Rarity bias (higher = better drops)
    luck_bonus: float = 0.0
    
    # Guaranteed drops (bosses)
    guaranteed_drops: List[Equipment] = None
    
    def __post_init__(self):
        if self.guaranteed_drops is None:
            self.guaranteed_drops = []


class EnemyTier(Enum):
    """Enemy difficulty tiers affecting loot quality."""
    MINION = ("Minion", 0.0, 1)
    SOLDIER = ("Soldier", 0.5, 2)
    ELITE = ("Elite", 1.0, 3)
    CHAMPION = ("Champion", 2.0, 5)
    BOSS = ("Boss", 5.0, 10)
    
    def __init__(self, label: str, luck_bonus: float, item_quantity_mult: int):
        self.label = label
        self.luck_bonus = luck_bonus
        self.item_quantity_mult = item_quantity_mult


@dataclass
class LootDrop:
    """Result of a loot drop."""
    gold: int = 0
    equipment: List[Equipment] = None
    weapons: List[Weapon] = None
    consumables: List[str] = None
    
    def __post_init__(self):
        if self.equipment is None:
            self.equipment = []
        if self.weapons is None:
            self.weapons = []
        if self.consumables is None:
            self.consumables = []
    
    def __str__(self):
        lines = [f"Gold: {self.gold}"]
        if self.equipment:
            lines.append(f"Equipment ({len(self.equipment)}):")
            for eq in self.equipment:
                lines.append(f"  - {eq}")
                for passive in eq.passives:
                    lines.append(f"      {passive}")
        if self.weapons:
            lines.append(f"Weapons ({len(self.weapons)}):")
            for wp in self.weapons:
                lines.append(f"  - {wp.name}")
        if self.consumables:
            lines.append(f"Consumables: {', '.join(self.consumables)}")
        return "\n".join(lines)


def generate_loot(
    enemy_level: int,
    enemy_tier: EnemyTier,
    loot_table: Optional[LootTable] = None,
    boss_name: Optional[str] = None
) -> LootDrop:
    """
    Generate loot from defeating an enemy.
    
    Args:
        enemy_level: Level of the defeated enemy
        enemy_tier: Difficulty tier (affects rarity and quantity)
        loot_table: Custom loot table, or None for default
        boss_name: If defeating a boss, their name for guaranteed unique drop
    """
    if loot_table is None:
        loot_table = LootTable()
    
    drop = LootDrop()
    
    # Calculate luck bonus from tier
    total_luck = loot_table.luck_bonus + enemy_tier.luck_bonus
    
    # Roll gold
    gold_mult = enemy_tier.item_quantity_mult
    drop.gold = random.randint(
        loot_table.min_gold * gold_mult,
        loot_table.max_gold * gold_mult
    )
    
    # Roll equipment
    if random.random() < loot_table.equipment_chance * enemy_tier.item_quantity_mult:
        num_items = random.randint(
            loot_table.min_equipment * enemy_tier.item_quantity_mult,
            loot_table.max_equipment * enemy_tier.item_quantity_mult
        )
        
        for _ in range(max(1, num_items)):
            # Random slot
            slot = random.choice(list(ArmorSlot))
            rarity = roll_rarity(total_luck)
            equipment = generate_random_equipment(slot, enemy_level, rarity)
            drop.equipment.append(equipment)
    
    # Roll weapons
    if random.random() < loot_table.weapon_chance * enemy_tier.item_quantity_mult:
        weapon = generate_random_weapon(enemy_level, total_luck)
        drop.weapons.append(weapon)
    
    # Add guaranteed boss drop
    if boss_name:
        boss_equipment = get_boss_drop(boss_name)
        if boss_equipment:
            drop.equipment.insert(0, boss_equipment)  # Put first
    
    # Roll consumables
    if random.random() < loot_table.consumable_chance:
        consumables = ["Health Potion", "Stamina Potion", "Mana Potion"]
        drop.consumables.append(random.choice(consumables))
    
    return drop


def generate_random_weapon(enemy_level: int, luck_bonus: float = 0.0) -> Weapon:
    """Generate a randomized weapon drop."""
    from weapons import Weapon, WeaponScaling, WeaponAbility
    
    # Weapon types with their base stats
    weapon_types = [
        ("Longsword", 100, DamageType.PHYSICAL, 15),
        ("Greataxe", 140, DamageType.PHYSICAL, 25),
        ("Dagger", 60, DamageType.PHYSICAL, 8),
        ("Greatsword", 130, DamageType.PHYSICAL, 22),
        ("Spear", 90, DamageType.PHYSICAL, 12),
        ("Battle Staff", 85, DamageType.MAGICAL, 14),
        ("Flame Wand", 75, DamageType.FIRE, 12),
        ("Frost Brand", 80, DamageType.ICE if 'ICE' in dir(DamageType) else DamageType.MAGICAL, 13),
    ]
    
    name, base_damage, damage_type, stamina_cost = random.choice(weapon_types)
    
    # Roll rarity
    rarity = roll_rarity(luck_bonus)
    
    # Scale damage with level and rarity
    scaled_damage = int(base_damage * (1 + enemy_level * 0.1) * rarity.stat_mult)
    
    # Generate passives for the weapon (treated as bonuses)
    weapon_passives = []
    if rarity.max_passives > 0:
        num_passives = random.randint(1, rarity.max_passives)
        offensive_passives = [
            PassiveType.CRIT_CHANCE,
            PassiveType.CRIT_DAMAGE,
            PassiveType.ATTACK_SPEED,
            PassiveType.DAMAGE_BOOST
        ]
        for _ in range(num_passives):
            ptype = random.choice(offensive_passives)
            value = random.uniform(ptype.min_val, ptype.max_val) * rarity.stat_mult
            weapon_passives.append(Passive(ptype, round(value, 1)))
    
    # Apply prefix based on rarity
    prefixes = {
        Rarity.COMMON: ["Worn", "Crude", "Rusty"],
        Rarity.UNCOMMON: ["Sharp", "Balanced", "Sturdy"],
        Rarity.RARE: ["Fine", "Superior", "Runed"],
        Rarity.EPIC: ["Exceptional", "Mythical", "Arcane"],
        Rarity.LEGENDARY: ["Legendary", "Divine", "Eternal"],
        Rarity.MYTHIC: ["Celestial", "Transcendent", "Primordial"],
    }
    
    prefix = random.choice(prefixes[rarity])
    full_name = f"{prefix} {name}"
    
    # Random scaling
    scalings = ["S", "A", "B", "C", "D", "E", "-"]
    
    return Weapon(
        name=full_name,
        description=f"A {rarity.label.lower()} weapon dropped by a fallen foe. Deals {damage_type.value} damage.",
        base_damage=scaled_damage,
        damage_type=damage_type,
        stamina_cost=stamina_cost,
        ability=None,  # Could add random abilities for legendaries
        scaling=WeaponScaling(
            strength=random.choice(scalings[:4]) if damage_type == DamageType.PHYSICAL else "-",
            dexterity=random.choice(scalings[:5]),
            magic=random.choice(scalings[:4]) if damage_type != DamageType.PHYSICAL else "-",
            arcane=random.choice(scalings[:6])
        ),
        weight=random.uniform(2.0, 8.0)
    )


def simulate_loot_drops():
    """Simulate various loot drops for demonstration."""
    print("=" * 70)
    print("LOOT SYSTEM DEMONSTRATION")
    print("=" * 70)
    print()
    
    test_scenarios = [
        ("Weak Goblin", 5, EnemyTier.MINION),
        ("Orc Warrior", 15, EnemyTier.SOLDIER),
        ("Elite Knight", 30, EnemyTier.ELITE),
        ("Champion", 45, EnemyTier.CHAMPION),
        ("Iron Golem (BOSS)", 50, EnemyTier.BOSS, "Iron Golem"),
    ]
    
    for scenario in test_scenarios:
        name, level, tier = scenario[0], scenario[1], scenario[2]
        boss = scenario[3] if len(scenario) > 3 else None
        
        print(f"\nDefeated: {name} (Level {level}, {tier.label})")
        print("-" * 50)
        
        loot = generate_loot(level, tier, boss_name=boss)
        print(loot)
    
    print()
    print("=" * 70)
    print("DROP RATE REFERENCE")
    print("=" * 70)
    print()
    print("Rarity Drop Chances (with 0 luck bonus):")
    print("  Common:    ~50%")
    print("  Uncommon:  ~30%")
    print("  Rare:      ~15%")
    print("  Epic:      ~4%")
    print("  Legendary: ~0.9%")
    print("  Mythic:    ~0.1%")
    print()
    print("Boss drops guarantee Legendary+ rarity!")


if __name__ == "__main__":
    simulate_loot_drops()
