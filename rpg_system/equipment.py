"""
Equipment system for armor, rings, and accessories.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Callable, Any
from enum import Enum, auto
import random


class Rarity(Enum):
    """Item rarity tiers affecting stat ranges and passive strength."""
    COMMON = ("Common", "#9ca3af", 1.0, 0)      # Gray
    UNCOMMON = ("Uncommon", "#22c55e", 1.15, 1)  # Green
    RARE = ("Rare", "#3b82f6", 1.35, 2)          # Blue
    EPIC = ("Epic", "#a855f7", 1.65, 3)          # Purple
    LEGENDARY = ("Legendary", "#f59e0b", 2.0, 4) # Gold
    MYTHIC = ("Mythic", "#ef4444", 2.5, 5)       # Red
    
    def __init__(self, label: str, color: str, stat_mult: float, max_passives: int):
        self.label = label
        self.color = color
        self.stat_mult = stat_mult  # Multiplier for base stats
        self.max_passives = max_passives  # Number of passives this rarity can have


class ArmorSlot(Enum):
    """Armor equipment slots."""
    HEAD = auto()
    CHEST = auto()
    LEGS = auto()
    HANDS = auto()
    FEET = auto()
    RING_1 = auto()
    RING_2 = auto()
    AMULET = auto()


class PassiveType(Enum):
    """Types of passive effects equipment can have."""
    # Offensive
    CRIT_CHANCE = ("Critical Chance", "%", 0.5, 3.0)  # +0.5% to 3% crit
    CRIT_DAMAGE = ("Critical Damage", "%", 5, 25)      # +5% to 25% crit dmg
    ATTACK_SPEED = ("Attack Speed", "%", 3, 15)
    DAMAGE_BOOST = ("Damage", "%", 2, 10)
    
    # Defensive
    HP_BONUS = ("Max HP", "%", 3, 15)
    DAMAGE_REDUCTION = ("Damage Reduction", "%", 2, 8)
    STAGGER_RESIST = ("Stagger Resistance", "%", 5, 20)
    
    # Utility
    STAMINA_REGEN = ("Stamina Regen", "%", 5, 20)
    MOVEMENT_SPEED = ("Movement Speed", "%", 2, 10)
    CARRY_WEIGHT = ("Carry Weight", "", 5, 25)
    
    # Elemental
    FIRE_RESIST = ("Fire Resistance", "%", 5, 25)
    ICE_RESIST = ("Ice Resistance", "%", 5, 25)
    LIGHTNING_RESIST = ("Lightning Resistance", "%", 5, 25)
    MAGIC_RESIST = ("Magic Resistance", "%", 5, 25)
    
    def __init__(self, label: str, unit: str, min_val: float, max_val: float):
        self.label = label
        self.unit = unit
        self.min_val = min_val
        self.max_val = max_val


@dataclass
class Passive:
    """A passive effect on equipment."""
    passive_type: PassiveType
    value: float
    
    def __str__(self):
        prefix = "+" if self.value > 0 else ""
        return f"{prefix}{self.value:.1f}{self.passive_type.unit} {self.passive_type.label}"


@dataclass
class Equipment:
    """Base class for all equipment items."""
    name: str
    description: str
    slot: ArmorSlot
    rarity: Rarity
    level_requirement: int = 1
    
    # Base stats (modified by rarity)
    defense: int = 0
    weight: float = 1.0
    
    # Passives (random rolls based on rarity)
    passives: List[Passive] = field(default_factory=list)
    
    # Unique passive (boss drops only)
    unique_passive: Optional[str] = None
    unique_effect: Optional[Callable] = None
    
    # Visual properties
    icon_path: str = ""
    
    def get_total_defense(self) -> int:
        """Calculate total defense including rarity multiplier."""
        return int(self.defense * self.rarity.stat_mult)
    
    def get_passive_summary(self) -> str:
        """Get formatted string of all passives."""
        lines = [str(p) for p in self.passives]
        if self.unique_passive:
            lines.append(f"[UNIQUE] {self.unique_passive}")
        return "\n".join(lines) if lines else "No passives"
    
    def __str__(self):
        return f"[{self.rarity.label}] {self.name}"


class ArmorSet(Enum):
    """Pre-defined armor sets with bonuses for wearing multiple pieces."""
    IRON = ("Iron", "Basic heavy armor", 2)
    STEEL = ("Steel", "Reinforced protection", 3)
    ELVEN = ("Elven", "Light and magical", 2)
    DRAGON = ("Dragonscale", "Ultimate defense", 3)
    VOID = ("Voidwalker", "Dark and mysterious", 3)
    
    def __init__(self, label: str, desc: str, pieces_for_bonus: int):
        self.label = label
        self.desc = desc
        self.pieces_for_bonus = pieces_for_bonus
    
    def get_set_bonus(self, pieces_worn: int) -> Optional[str]:
        """Get set bonus description based on pieces worn."""
        if pieces_worn < self.pieces_for_bonus:
            return None
        
        bonuses = {
            ArmorSet.IRON: f"+{pieces_worn*5}% Physical Damage Reduction",
            ArmorSet.STEEL: f"+{pieces_worn*3}% All Resistance",
            ArmorSet.ELVEN: f"+{pieces_worn*5}% Magic Damage",
            ArmorSet.DRAGON: f"+{pieces_worn*10}% Fire Resistance",
            ArmorSet.VOID: f"+{pieces_worn*5}% Dodge Chance",
        }
        return bonuses.get(self)


def roll_passives(rarity: Rarity, slot: ArmorSlot) -> List[Passive]:
    """
    Roll random passives for equipment based on rarity.
    Different slots favor different passive types.
    """
    passives = []
    num_passives = random.randint(0, rarity.max_passives)
    
    # Weight passives based on slot
    slot_weights = {
        ArmorSlot.HEAD: [PassiveType.CRIT_CHANCE, PassiveType.MAGIC_RESIST, PassiveType.CAST_SPEED if 'CAST_SPEED' in dir(PassiveType) else PassiveType.MOVEMENT_SPEED],
        ArmorSlot.CHEST: [PassiveType.HP_BONUS, PassiveType.DAMAGE_REDUCTION, PassiveType.STAGGER_RESIST],
        ArmorSlot.LEGS: [PassiveType.MOVEMENT_SPEED, PassiveType.CARRY_WEIGHT, PassiveType.STAMINA_REGEN],
        ArmorSlot.HANDS: [PassiveType.ATTACK_SPEED, PassiveType.CRIT_DAMAGE, PassiveType.DAMAGE_BOOST],
        ArmorSlot.FEET: [PassiveType.MOVEMENT_SPEED, PassiveType.DODGE_CHANCE if 'DODGE_CHANCE' in dir(PassiveType) else PassiveType.STAMINA_REGEN, PassiveType.CARRY_WEIGHT],
        ArmorSlot.RING_1: list(PassiveType),  # Rings can have anything
        ArmorSlot.RING_2: list(PassiveType),
        ArmorSlot.AMULET: list(PassiveType),
    }
    
    available = slot_weights.get(slot, list(PassiveType))
    
    for _ in range(num_passives):
        passive_type = random.choice(available)
        # Roll value within range
        value = random.uniform(passive_type.min_val, passive_type.max_val)
        # Rarity boosts the roll
        value *= rarity.stat_mult
        passives.append(Passive(passive_type, round(value, 1)))
    
    return passives


def generate_random_equipment(
    slot: ArmorSlot,
    target_level: int,
    rarity: Optional[Rarity] = None
) -> Equipment:
    """Generate a random piece of equipment."""
    if rarity is None:
        rarity = roll_rarity()
    
    # Base defense scales with level
    base_defense = int(5 + (target_level * 2))
    
    # Generate name based on slot and rarity
    name = generate_equipment_name(slot, rarity)
    
    # Roll passives
    passives = roll_passives(rarity, slot)
    
    return Equipment(
        name=name,
        description=f"A {rarity.label.lower()} piece of {slot.name.lower()} armor.",
        slot=slot,
        rarity=rarity,
        level_requirement=max(1, target_level - 5),
        defense=base_defense,
        weight=random.uniform(2.0, 8.0) if slot in [ArmorSlot.CHEST, ArmorSlot.LEGS] else random.uniform(0.5, 3.0),
        passives=passives
    )


def roll_rarity(bonus_luck: float = 0.0) -> Rarity:
    """Roll item rarity with weighted probabilities."""
    weights = {
        Rarity.COMMON: 50,
        Rarity.UNCOMMON: 30,
        Rarity.RARE: 15,
        Rarity.EPIC: 4,
        Rarity.LEGENDARY: 0.9,
        Rarity.MYTHIC: 0.1,
    }
    
    # Apply luck bonus
    if bonus_luck > 0:
        weights[Rarity.RARE] += bonus_luck * 2
        weights[Rarity.EPIC] += bonus_luck * 0.5
        weights[Rarity.LEGENDARY] += bonus_luck * 0.1
        weights[Rarity.COMMON] = max(5, weights[Rarity.COMMON] - bonus_luck * 3)
    
    rarities = list(weights.keys())
    weight_values = list(weights.values())
    
    return random.choices(rarities, weights=weight_values, k=1)[0]


def generate_equipment_name(slot: ArmorSlot, rarity: Rarity) -> str:
    """Generate a thematic name for equipment."""
    prefixes = {
        Rarity.COMMON: ["Worn", "Tattered", "Basic", "Rusty"],
        Rarity.UNCOMMON: ["Sturdy", "Polished", "Reinforced", "Hardened"],
        Rarity.RARE: ["Gleaming", "Superior", "Enchanted", "Runic"],
        Rarity.EPIC: ["Exalted", "Mythical", "Arcane", "Ancient"],
        Rarity.LEGENDARY: ["Legendary", "Divine", "Eternal", "Transcendent"],
        Rarity.MYTHIC: ["Celestial", "Primordial", "Godslayer", "Infinity"],
    }
    
    base_names = {
        ArmorSlot.HEAD: ["Helm", "Crown", "Hood", "Mask"],
        ArmorSlot.CHEST: ["Plate", "Vest", "Robe", "Mail"],
        ArmorSlot.LEGS: ["Greaves", "Leggings", "Tassets", "Pants"],
        ArmorSlot.HANDS: ["Gauntlets", "Gloves", "Wraps", "Claws"],
        ArmorSlot.FEET: ["Boots", "Sabatons", "Treads", "Sandals"],
        ArmorSlot.RING_1: ["Ring", "Band", "Seal", "Loop"],
        ArmorSlot.RING_2: ["Ring", "Band", "Seal", "Loop"],
        ArmorSlot.AMULET: ["Amulet", "Pendant", "Charm", "Talisman"],
    }
    
    prefix = random.choice(prefixes[rarity])
    base = random.choice(base_names[slot])
    
    return f"{prefix} {base}"


# ============ UNIQUE BOSS DROPS ============

def create_boss_equipment(
    boss_name: str,
    slot: ArmorSlot,
    unique_passive_name: str,
    unique_passive_desc: str,
    guaranteed_rarity: Rarity = Rarity.LEGENDARY
) -> Equipment:
    """Create a unique boss drop with guaranteed special passive."""
    
    equipment = generate_random_equipment(slot, 50, guaranteed_rarity)
    equipment.name = f"{boss_name}'s {equipment.name.split()[-1]}"
    equipment.description = f"Torn from {boss_name} upon their defeat. {unique_passive_desc}"
    equipment.unique_passive = unique_passive_desc
    
    return equipment


# Pre-defined boss drops
BOSS_DROPS = {
    "Iron Golem": lambda: create_boss_equipment(
        "Iron Golem", ArmorSlot.CHEST, 
        "Living Metal", 
        "Gradually repairs itself during combat. +2 HP/sec while in combat."
    ),
    "Shadow Demon": lambda: create_boss_equipment(
        "Shadow Demon", ArmorSlot.RING_1,
        "Shadow Step",
        "Dodging leaves behind a shadow clone that explodes for 50 damage."
    ),
    "Flame Tyrant": lambda: create_boss_equipment(
        "Flame Tyrant", ArmorSlot.HEAD,
        "Crown of Flames",
        "Melee attackers take 30 fire damage. Immune to burn."
    ),
    "Frost Queen": lambda: create_boss_equipment(
        "Frost Queen", ArmorSlot.AMULET,
        "Frozen Heart",
        "Critical hits freeze enemies for 2 seconds. Immune to chill."
    ),
}


def get_boss_drop(boss_name: str) -> Optional[Equipment]:
    """Get a guaranteed drop from defeating a boss."""
    if boss_name in BOSS_DROPS:
        return BOSS_DROPS[boss_name]()
    return None
