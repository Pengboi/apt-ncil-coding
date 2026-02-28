"""
Adventure RPG System
A Souls-like RPG stat and class system.
"""

from .character_stats import CharacterStats, StatType, ScalingGrade, get_scaling_bonus
from .weapons import Weapon, WeaponAbility, DamageType, create_silvered_sword
from .classes import CharacterClass, Knight, Tank, Samurai, create_character

__all__ = [
    'CharacterStats',
    'StatType',
    'ScalingGrade',
    'get_scaling_bonus',
    'Weapon',
    'WeaponAbility',
    'DamageType',
    'create_silvered_sword',
    'CharacterClass',
    'Knight',
    'Tank',
    'Samurai',
    'Mage',
    'create_character',
]
