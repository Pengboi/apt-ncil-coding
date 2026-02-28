"""
Core stat system for the adventure RPG.
"""
from dataclasses import dataclass, field
from typing import Dict, Optional
from enum import Enum


class StatType(Enum):
    VITALITY = "vitality"
    STRENGTH = "strength"
    MAGIC = "magic"
    DURABILITY = "durability"
    SPEED = "speed"
    ARCANE = "arcane"
    STAMINA = "stamina"


@dataclass
class CharacterStats:
    """Base stats for any character. All stats start at 25 base value."""
    vitality: int = 25      # HP pool
    strength: int = 25      # Physical attack damage
    magic: int = 25         # Magical attack damage & spell potency
    durability: int = 25    # Defense (physical & magical)
    speed: int = 25         # Movement speed
    arcane: int = 25        # Status effect potency & proc chance
    stamina: int = 25       # Energy for skills
    
    # Derived stats (calculated from base stats)
    @property
    def max_hp(self) -> int:
        """HP = Base 400 + (Vitality × 25) + (Durability × 5)"""
        return 400 + (self.vitality * 25) + (self.durability * 5)
    
    @property
    def max_stamina(self) -> int:
        """Max Stamina = Base 100 + (Vitality × 1.5) + (Durability × 0.5)"""
        return int(100 + (self.vitality * 1.5) + (self.durability * 0.5))
    
    @property
    def carry_weight(self) -> float:
        """Carry Weight = Base 40 + (Vitality × 1.5) + (Strength × 0.5)"""
        return 40 + (self.vitality * 1.5) + (self.strength * 0.5)
    
    @property
    def dodge_distance(self) -> float:
        """Dodge Distance bonus (capped at 75%)"""
        bonus = self.speed * 0.03
        return min(bonus, 0.75)
    
    @property
    def i_frames(self) -> int:
        """Invincibility frames (base 12, max 20)"""
        frames = int(12 + (self.speed * 0.1))
        return min(frames, 20)
    
    @property
    def crit_chance(self) -> float:
        """Crit Chance = Base 5% + (Arcane × 0.2%) + (Speed × 0.1%)"""
        return 5.0 + (self.arcane * 0.2) + (self.speed * 0.1)
    
    @property
    def status_buildup_speed(self) -> float:
        """Status buildup bonus (percentage)"""
        return self.arcane * 1.5
    
    @property
    def magic_resistance(self) -> int:
        """Magic Resistance = (Durability × 0.5) + (Magic × 0.3)"""
        return int((self.durability * 0.5) + (self.magic * 0.3))
    
    @property
    def stamina_regen(self) -> float:
        """Stamina regen per second. Base 20 in combat, +0.5% per Speed"""
        base_regen = 20.0  # In combat
        speed_bonus = 1.0 + (self.speed * 0.005)
        return base_regen * speed_bonus
    
    def get_stat(self, stat_type: StatType) -> int:
        """Get a stat value by type."""
        return getattr(self, stat_type.value)
    
    def set_stat(self, stat_type: StatType, value: int):
        """Set a stat value by type."""
        setattr(self, stat_type.value, value)
    
    def __str__(self) -> str:
        return (
            f"Stats(VIT={self.vitality}, STR={self.strength}, MAG={self.magic}, "
            f"DUR={self.durability}, SPD={self.speed}, ARC={self.arcane}, STM={self.stamina})"
        )


class ScalingGrade(Enum):
    """Weapon scaling grades based on stat value."""
    S = (70, 2.0, "S")      # 150-200% damage
    A = (50, 1.5, "A")      # 120-150%
    B = (35, 1.2, "B")      # 100-120%
    C = (20, 1.0, "C")      # 80-100%
    D = (10, 0.8, "D")      # 50-80%
    E = (1, 0.5, "E")       # 10-50%
    NONE = (0, 0.0, "-")    # No scaling
    
    def __init__(self, threshold: int, multiplier: float, display: str):
        self.threshold = threshold
        self.multiplier = multiplier
        self.display = display
    
    @classmethod
    def from_stat_value(cls, value: int) -> 'ScalingGrade':
        """Get scaling grade from stat value."""
        for grade in [cls.S, cls.A, cls.B, cls.C, cls.D, cls.E]:
            if value >= grade.threshold:
                return grade
        return cls.NONE


def get_scaling_bonus(stat_value: int, base_damage: int) -> float:
    """Calculate scaling bonus damage based on stat."""
    grade = ScalingGrade.from_stat_value(stat_value)
    # Slight variation within grade based on exact stat value
    bonus = base_damage * grade.multiplier * (stat_value / 100)
    return bonus
