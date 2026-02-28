"""
Character classes for the adventure RPG.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from character_stats import CharacterStats, StatType
from weapons import Weapon, create_silvered_sword, create_bronze_shield, create_sabertooth_sword, create_crystal_staff
from character_equipment import EquippedGear, get_combined_character_sheet
from equipment import Equipment, ArmorSlot


@dataclass
class LevelUpInfo:
    """Tracks level progression."""
    level: int = 1
    total_stat_points: int = 25  # Starting 25 base points distributed
    points_per_level: int = 3    # 3 points per level
    
    def get_available_points(self) -> int:
        """Calculate available stat points for current level."""
        return self.total_stat_points + (self.level - 1) * self.points_per_level


class CharacterClass:
    """Base class for all character classes."""
    
    name: str = "Base Class"
    description: str = "Base class description."
    
    # Starting stat distribution (must sum to 25)
    starting_stats: Dict[StatType, int] = field(default_factory=dict)
    
    def __init__(self):
        self.stats = CharacterStats()
        self.level_info = LevelUpInfo()
        self.weapons: List[Weapon] = []  # Renamed from equipment for clarity
        self.equipment_slots = EquippedGear()  # Armor/accessories
        self._apply_starting_stats()
        self._init_starting_equipment()
    
    def _apply_starting_stats(self):
        """Apply class-specific starting stat distribution."""
        for stat_type, value in self.starting_stats.items():
            self.stats.set_stat(stat_type, value)
    
    def _init_starting_equipment(self):
        """Initialize starting equipment. Override in subclasses."""
        pass
    
    def level_up(self, stat_increases: Dict[StatType, int]):
        """
        Level up the character.
        stat_increases: Dict mapping stat types to point increases.
        Total increase must equal points_per_level (3).
        """
        total = sum(stat_increases.values())
        if total != self.level_info.points_per_level:
            raise ValueError(
                f"Must distribute exactly {self.level_info.points_per_level} points, "
                f"got {total}"
            )
        
        for stat_type, increase in stat_increases.items():
            current = self.stats.get_stat(stat_type)
            self.stats.set_stat(stat_type, current + increase)
        
        self.level_info.level += 1
    
    def equip_weapon(self, weapon: Weapon):
        """Equip a weapon."""
        self.weapons.append(weapon)
    
    def equip_armor(self, item: Equipment) -> Optional[Equipment]:
        """Equip armor/accessory to appropriate slot. Returns replaced item."""
        return self.equipment_slots.equip(item)
    
    def get_total_defense(self) -> int:
        """Calculate total defense from Durability + armor."""
        from character_equipment import calculate_equipment_stats
        base_def = self.stats.durability * 2  # Base from stat
        equip_bonuses = calculate_equipment_stats(self.equipment_slots)
        return int(base_def + equip_bonuses['defense'])
    
    def get_effective_stats(self) -> Dict[str, float]:
        """Get stats modified by equipment bonuses."""
        from character_equipment import calculate_equipment_stats
        bonuses = calculate_equipment_stats(self.equipment_slots)
        
        return {
            'max_hp': self.stats.max_hp * (1 + bonuses['hp_bonus'] / 100),
            'crit_chance': self.stats.crit_chance + bonuses['crit_chance'],
            'damage_reduction': bonuses['damage_reduction'],
            'stamina_regen': self.stats.stamina_regen * (1 + bonuses['stamina_regen'] / 100),
            'movement_speed': self.stats.speed * (1 + bonuses['movement_speed'] / 100),
        }
    
    def get_character_sheet(self) -> str:
        """Generate a character sheet string."""
        effective = self.get_effective_stats()
        
        lines = [
            f"=== {self.name} ===",
            f"Level: {self.level_info.level}",
            f"",
            f"-- Base Stats --",
            f"Vitality:   {self.stats.vitality}",
            f"Strength:   {self.stats.strength}",
            f"Magic:      {self.stats.magic}",
            f"Durability: {self.stats.durability}",
            f"Speed:      {self.stats.speed}",
            f"Arcane:     {self.stats.arcane}",
            f"Stamina:    {self.stats.stamina}",
            f"",
            f"-- Derived Stats --",
            f"Max HP:      {effective['max_hp']:.0f} (base: {self.stats.max_hp})",
            f"Max Stamina: {self.stats.max_stamina}",
            f"Total Defense: {self.get_total_defense()}",
            f"Carry Weight: {self.stats.carry_weight:.1f}",
            f"Crit Chance: {effective['crit_chance']:.1f}%",
            f"Dodge Bonus: {self.stats.dodge_distance*100:.1f}%",
            f"I-Frames:    {self.stats.i_frames}",
            f"Stamina Regen: {effective['stamina_regen']:.1f}/sec",
            f"",
            f"-- Weapons --",
        ]
        
        for item in self.weapons:
            lines.append(f"  - {item.name}")
            if item.ability:
                lines.append(f"    Ability: {item.ability.name}")
        
        # Add armor summary
        lines.append("")
        lines.append(self.equipment_slots.get_equipment_summary())
        
        return "\n".join(lines)


class Knight(CharacterClass):
    """
    Knight Class
    A balanced warrior class focusing on melee combat and defense.
    
    Starting Weapon: Silvered Sword
    - Innate Ability: Crimson Edge
    - Every crit gives +5% damage boost for 10 seconds
    - Crits deal 2x normal damage
    
    Stat Distribution (25 points):
    - Vitality: 5
    - Strength: 5
    - Durability: 5
    - Stamina: 3
    - Speed: 2
    - Magic: 3
    - Arcane: 2
    """
    
    name = "Knight"
    description = "A balanced warrior specializing in melee combat with a sturdy defense."
    
    starting_stats = {
        StatType.VITALITY: 5,
        StatType.STRENGTH: 5,
        StatType.DURABILITY: 5,
        StatType.STAMINA: 3,
        StatType.SPEED: 2,
        StatType.MAGIC: 3,
        StatType.ARCANE: 2,
    }
    
    def _init_starting_equipment(self):
        """Give Knight the Silvered Sword."""
        silvered_sword = create_silvered_sword()
        self.equip_weapon(silvered_sword)


class Tank(CharacterClass):
    """
    Tank Class
    An immovable fortress clad in heavy bronze and gold plate armor.
    Wields a massive shield that crushes enemies while providing absolute protection.
    
    Starting Weapon: Bronze Bulwark (Bronze Shield)
    - Innate Ability: Unbreakable
    - Grants Hyperarmor for 15 seconds
    - Hyperarmor prevents stagger/interruption when taking damage
    - 15% damage reduction while active
    
    Stat Distribution (25 points):
    - Vitality: 7    (High HP pool for tanking)
    - Durability: 8  (Maximum defense - main tank stat)
    - Strength: 4   (Decent damage for shield bashes)
    - Stamina: 3    (For blocking and heavy attacks)
    - Speed: 1      (Heavy armor slows movement)
    - Magic: 1      (No magical affinity)
    - Arcane: 1     (No status effect focus)
    """
    
    name = "Tank"
    description = "An immovable fortress clad in heavy armor. Wields a massive bronze shield that crushes foes while granting absolute protection."
    
    starting_stats = {
        StatType.VITALITY: 7,
        StatType.DURABILITY: 8,
        StatType.STRENGTH: 4,
        StatType.STAMINA: 3,
        StatType.SPEED: 1,
        StatType.MAGIC: 1,
        StatType.ARCANE: 1,
    }
    
    def _init_starting_equipment(self):
        """Give Tank the Bronze Bulwark shield."""
        bronze_shield = create_bronze_shield()
        self.equip_weapon(bronze_shield)


class Samurai(CharacterClass):
    """
    Samurai Class
    A swift warrior from the eastern lands, clad in dark lacquered armor with crimson accents.
    Masters of the blade who dance through combat, leaving bleeding wounds that claim lives slowly.
    
    Starting Weapon: Sabertooth (Curved Katana)
    - Innate Ability: Crimson Fangs
    - 5% chance to inflict Bleed on hit
    - Bleed deals 0.5% of max HP per second
    - Can stack up to 5 times for massive damage over time
    
    Stat Distribution (25 points):
    - Speed: 7      (Lightning fast attacks and movement)
    - Strength: 6   (Powerful sword strikes)
    - Arcane: 4     (Bleed/status effect potency)
    - Vitality: 4   (Survivability)
    - Stamina: 3    (For attack combos)
    - Durability: 1 (Light armor - glass cannon)
    - Magic: 0      (No magical affinity)
    """
    
    name = "Samurai"
    description = "A swift warrior from the eastern lands. Wields a deadly katana that inflicts bleeding wounds, dancing through combat with unmatched speed."
    
    starting_stats = {
        StatType.SPEED: 7,
        StatType.STRENGTH: 6,
        StatType.ARCANE: 4,
        StatType.VITALITY: 4,
        StatType.STAMINA: 3,
        StatType.DURABILITY: 1,
        StatType.MAGIC: 0,
    }
    
    def _init_starting_equipment(self):
        """Give Samurai the Sabertooth katana."""
        sabertooth = create_sabertooth_sword()
        self.equip_weapon(sabertooth)


class Mage(CharacterClass):
    """
    Mage Class
    A graceful sorceress clad in flowing robes and an ornate wide-brimmed hat.
    Channels devastating arcane energies through a crystal staff, wielding magic
    that can reshape reality itself.
    
    Starting Weapon: Crystal Staff
    - Innate Ability: Ethereal Focus
    - 10% chance when casting to gain hyperarmor and guaranteed critical hit
    - Hyperarmor prevents spell interruption during channeling
    - Crit deals 2x damage
    
    Stat Distribution (25 points):
    - Magic: 8      (Primary casting stat - maximum magical power)
    - Arcane: 5     (Spell potency and effects)
    - Vitality: 4   (Moderate survivability)
    - Stamina: 4    (Mana/resource for casting)
    - Speed: 3      (Moderate movement in robes)
    - Durability: 1 (Cloth robes - minimal protection)
    - Strength: 0   (No physical combat ability)
    """
    
    name = "Mage"
    description = "A graceful sorceress who channels devastating arcane energies. Wields a crystal staff that grants hyperarmor during critical spellcasting moments."
    
    starting_stats = {
        StatType.MAGIC: 8,
        StatType.ARCANE: 5,
        StatType.VITALITY: 4,
        StatType.STAMINA: 4,
        StatType.SPEED: 3,
        StatType.DURABILITY: 1,
        StatType.STRENGTH: 0,
    }
    
    def _init_starting_equipment(self):
        """Give Mage the Crystal Staff."""
        crystal_staff = create_crystal_staff()
        self.equip_weapon(crystal_staff)


# Factory for creating classes
def create_character(class_name: str) -> CharacterClass:
    """Create a character of the specified class."""
    classes = {
        "knight": Knight,
        "tank": Tank,
        "samurai": Samurai,
        "mage": Mage,
        # Add more classes here later
    }
    
    class_name = class_name.lower()
    if class_name not in classes:
        raise ValueError(f"Unknown class: {class_name}")
    
    return classes[class_name]()
