"""
Character equipment management and stat calculations.
"""
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field

from equipment import Equipment, ArmorSlot, ArmorSet, Rarity


@dataclass
class EquippedGear:
    """Tracks all equipped items on a character."""
    head: Optional[Equipment] = None
    chest: Optional[Equipment] = None
    legs: Optional[Equipment] = None
    hands: Optional[Equipment] = None
    feet: Optional[Equipment] = None
    ring_1: Optional[Equipment] = None
    ring_2: Optional[Equipment] = None
    amulet: Optional[Equipment] = None
    
    def get_all_equipped(self) -> List[Equipment]:
        """Get list of all non-None equipped items."""
        return [item for item in [
            self.head, self.chest, self.legs, self.hands,
            self.feet, self.ring_1, self.ring_2, self.amulet
        ] if item is not None]
    
    def equip(self, item: Equipment) -> Optional[Equipment]:
        """
        Equip an item to appropriate slot.
        Returns previously equipped item (if any).
        """
        slot_map = {
            ArmorSlot.HEAD: 'head',
            ArmorSlot.CHEST: 'chest',
            ArmorSlot.LEGS: 'legs',
            ArmorSlot.HANDS: 'hands',
            ArmorSlot.FEET: 'feet',
            ArmorSlot.RING_1: 'ring_1',
            ArmorSlot.RING_2: 'ring_2',
            ArmorSlot.AMULET: 'amulet',
        }
        
        slot_attr = slot_map.get(item.slot)
        if slot_attr:
            old_item = getattr(self, slot_attr)
            setattr(self, slot_attr, item)
            return old_item
        return None
    
    def unequip(self, slot: ArmorSlot) -> Optional[Equipment]:
        """Unequip item from slot. Returns the removed item."""
        slot_map = {
            ArmorSlot.HEAD: 'head',
            ArmorSlot.CHEST: 'chest',
            ArmorSlot.LEGS: 'legs',
            ArmorSlot.HANDS: 'hands',
            ArmorSlot.FEET: 'feet',
            ArmorSlot.RING_1: 'ring_1',
            ArmorSlot.RING_2: 'ring_2',
            ArmorSlot.AMULET: 'amulet',
        }
        
        slot_attr = slot_map.get(slot)
        if slot_attr:
            old_item = getattr(self, slot_attr)
            setattr(self, slot_attr, None)
            return old_item
        return None
    
    def get_set_bonuses(self) -> List[str]:
        """Calculate active armor set bonuses."""
        # Group by set (equipment would need a set attribute added)
        # For now, simplified version
        return []
    
    def get_total_weight(self) -> float:
        """Get total weight of all equipped gear."""
        return sum(item.weight for item in self.get_all_equipped())
    
    def get_equipment_summary(self) -> str:
        """Get formatted summary of equipped gear."""
        lines = ["=== EQUIPPED GEAR ==="]
        
        slot_names = {
            'head': 'Head',
            'chest': 'Chest',
            'legs': 'Legs',
            'hands': 'Hands',
            'feet': 'Feet',
            'ring_1': 'Ring 1',
            'ring_2': 'Ring 2',
            'amulet': 'Amulet',
        }
        
        for attr, label in slot_names.items():
            item = getattr(self, attr)
            if item:
                lines.append(f"{label}: [{item.rarity.label}] {item.name}")
            else:
                lines.append(f"{label}: (Empty)")
        
        lines.append(f"\nTotal Weight: {self.get_total_weight():.1f}")
        return "\n".join(lines)


def calculate_equipment_stats(equipped: EquippedGear) -> Dict[str, float]:
    """
    Calculate total stat bonuses from equipped gear.
    Returns a dict of stat bonuses.
    """
    bonuses = {
        'defense': 0,
        'hp_bonus': 0,
        'damage_boost': 0,
        'crit_chance': 0,
        'crit_damage': 0,
        'attack_speed': 0,
        'damage_reduction': 0,
        'stamina_regen': 0,
        'movement_speed': 0,
        'carry_weight': 0,
        'stagger_resist': 0,
    }
    
    for item in equipped.get_all_equipped():
        # Add defense
        bonuses['defense'] += item.get_total_defense()
        
        # Add passives
        for passive in item.passives:
            ptype = passive.passive_type
            value = passive.value
            
            if ptype.name == 'CRIT_CHANCE':
                bonuses['crit_chance'] += value
            elif ptype.name == 'CRIT_DAMAGE':
                bonuses['crit_damage'] += value
            elif ptype.name == 'ATTACK_SPEED':
                bonuses['attack_speed'] += value
            elif ptype.name == 'DAMAGE_BOOST':
                bonuses['damage_boost'] += value
            elif ptype.name == 'HP_BONUS':
                bonuses['hp_bonus'] += value
            elif ptype.name == 'DAMAGE_REDUCTION':
                bonuses['damage_reduction'] += value
            elif ptype.name == 'STAGGER_RESIST':
                bonuses['stagger_resist'] += value
            elif ptype.name == 'STAMINA_REGEN':
                bonuses['stamina_regen'] += value
            elif ptype.name == 'MOVEMENT_SPEED':
                bonuses['movement_speed'] += value
            elif ptype.name == 'CARRY_WEIGHT':
                bonuses['carry_weight'] += value
    
    return bonuses


def get_combined_character_sheet(character) -> str:
    """
    Generate a full character sheet including equipment.
    
    Args:
        character: A CharacterClass instance with 'equipment_slots' attribute
    """
    lines = []
    
    # Base character sheet
    lines.append(character.get_character_sheet())
    lines.append("")
    
    # Equipment summary
    if hasattr(character, 'equipment_slots'):
        lines.append(character.equipment_slots.get_equipment_summary())
        lines.append("")
        
        # Calculate equipment bonuses
        bonuses = calculate_equipment_stats(character.equipment_slots)
        
        lines.append("=== EQUIPMENT BONUSES ===")
        lines.append(f"Defense: +{int(bonuses['defense'])}")
        lines.append(f"HP Bonus: +{bonuses['hp_bonus']:.1f}%")
        lines.append(f"Damage Boost: +{bonuses['damage_boost']:.1f}%")
        lines.append(f"Crit Chance: +{bonuses['crit_chance']:.1f}%")
        lines.append(f"Crit Damage: +{bonuses['crit_damage']:.1f}%")
        lines.append(f"Attack Speed: +{bonuses['attack_speed']:.1f}%")
        lines.append(f"Damage Reduction: +{bonuses['damage_reduction']:.1f}%")
        lines.append(f"Stamina Regen: +{bonuses['stamina_regen']:.1f}%")
        lines.append(f"Movement Speed: +{bonuses['movement_speed']:.1f}%")
    
    return "\n".join(lines)
