"""
Weapon system with innate abilities.
"""
from dataclasses import dataclass
from typing import Optional, Callable, Dict, Any
from enum import Enum
import time


class DamageType(Enum):
    PHYSICAL = "physical"
    MAGICAL = "magical"
    FIRE = "fire"
    LIGHTNING = "lightning"
    HOLY = "holy"
    DARK = "dark"


class WeaponAbility:
    """Base class for weapon innate abilities."""
    
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
    
    def on_crit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """Called when a critical hit occurs. Override in subclasses."""
        return {}
    
    def on_hit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """Called when any hit occurs. Override in subclasses."""
        return {}
    
    def get_bonus_damage(self, wielder) -> float:
        """Get passive bonus damage multiplier."""
        return 1.0


class SilveredSwordAbility(WeaponAbility):
    """
    Silvered Sword Innate Ability:
    Every crit gives a 5% damage boost for 10 seconds.
    """
    
    DAMAGE_BOOST_PERCENT = 0.05  # 5%
    DURATION_SECONDS = 10
    CRIT_MULTIPLIER = 2.0  # Crits deal 2x damage
    
    def __init__(self):
        super().__init__(
            name="Crimson Edge",
            description="Critical hits grant +5% damage for 10 seconds."
        )
        self._active_boosts: list[tuple[float, float]] = []  # (expiry_time, boost_amount)
    
    def _clean_expired_boosts(self):
        """Remove expired damage boosts."""
        current_time = time.time()
        self._active_boosts = [
            (expiry, boost) for expiry, boost in self._active_boosts 
            if expiry > current_time
        ]
    
    def get_current_damage_multiplier(self) -> float:
        """Get total damage multiplier from active boosts."""
        self._clean_expired_boosts()
        total_boost = sum(boost for _, boost in self._active_boosts)
        return 1.0 + total_boost
    
    def on_crit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """On crit: Apply 5% damage boost for 10 seconds."""
        current_time = time.time()
        expiry = current_time + self.DURATION_SECONDS
        self._active_boosts.append((expiry, self.DAMAGE_BOOST_PERCENT))
        
        return {
            "damage_boost_applied": self.DAMAGE_BOOST_PERCENT,
            "duration": self.DURATION_SECONDS,
            "total_active_boosts": len(self._active_boosts)
        }
    
    def get_bonus_damage(self, wielder) -> float:
        """Apply current damage boost multiplier."""
        return self.get_current_damage_multiplier()
    
    def __str__(self):
        active = len(self._active_boosts)
        mult = self.get_current_damage_multiplier()
        return f"Crimson Edge (Active boosts: {active}, Multiplier: {mult:.2f}x)"


class BronzeShieldAbility(WeaponAbility):
    """
    Bronze Shield Innate Ability:
    Unbreakable - Grants Hyperarmor for 15 seconds.
    Hyperarmor prevents stagger/interruption when taking damage.
    """
    
    DURATION_SECONDS = 15
    DAMAGE_REDUCTION = 0.15  # 15% damage reduction while active
    
    def __init__(self):
        super().__init__(
            name="Unbreakable",
            description="Activate to gain Hyperarmor for 15 seconds. Reduces incoming damage by 15% and prevents stagger."
        )
        self._active_until: float = 0.0
        self._block_boost: float = 0.25  # +25% block efficiency passive
    
    def activate(self) -> Dict[str, Any]:
        """Activate Unbreakable - grants 15 seconds of hyperarmor."""
        current_time = time.time()
        self._active_until = current_time + self.DURATION_SECONDS
        
        return {
            "hyperarmor_granted": True,
            "duration": self.DURATION_SECONDS,
            "damage_reduction": self.DAMAGE_REDUCTION,
            "expires_at": self._active_until
        }
    
    def is_active(self) -> bool:
        """Check if Unbreakable is currently active."""
        return time.time() < self._active_until
    
    def get_remaining_duration(self) -> float:
        """Get remaining duration of hyperarmor in seconds."""
        if not self.is_active():
            return 0.0
        return self._active_until - time.time()
    
    def get_damage_reduction(self) -> float:
        """Get current damage reduction multiplier (0.85 = 15% reduction)."""
        if self.is_active():
            return 1.0 - self.DAMAGE_REDUCTION
        return 1.0
    
    def on_hit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """On shield bash hit: Small chance to trigger Unbreakable."""
        import random
        # 10% chance to auto-trigger on successful bash
        if random.random() < 0.1 and not self.is_active():
            return self.activate()
        return {}
    
    def __str__(self):
        status = "ACTIVE" if self.is_active() else "Ready"
        remaining = self.get_remaining_duration()
        return f"Unbreakable ({status}, {remaining:.1f}s remaining)"


class SabertoothSwordAbility(WeaponAbility):
    """
    Sabertooth Sword Innate Ability:
    Crimson Fangs - 5% chance to inflict Bleed on hit.
    Bleed deals 0.5% of target's max HP per second.
    Bleed can stack multiple times for devastating damage over time.
    """
    
    BLEED_CHANCE = 0.05  # 5% chance to bleed on hit
    BLEED_DAMAGE_PERCENT = 0.005  # 0.5% of max HP per second
    BLEED_DURATION = 10  # 10 seconds duration per stack
    MAX_STACKS = 5  # Maximum 5 bleed stacks
    
    def __init__(self):
        super().__init__(
            name="Crimson Fangs",
            description="5% chance to inflict Bleed on hit. Bleed deals 0.5% of max HP per second and can stack up to 5 times."
        )
        self._bleed_stacks: list[tuple[float, float]] = []  # (expiry_time, damage_per_sec)
        self._total_bleed_damage_dealt = 0.0
    
    def _clean_expired_stacks(self):
        """Remove expired bleed stacks."""
        current_time = time.time()
        self._bleed_stacks = [
            (expiry, dps) for expiry, dps in self._bleed_stacks 
            if expiry > current_time
        ]
    
    def get_active_stacks(self) -> int:
        """Get number of active bleed stacks."""
        self._clean_expired_stacks()
        return len(self._bleed_stacks)
    
    def can_apply_bleed(self) -> bool:
        """Check if bleed can be applied (under max stacks)."""
        return self.get_active_stacks() < self.MAX_STACKS
    
    def apply_bleed(self, target_max_hp: float) -> Dict[str, Any]:
        """Apply a bleed stack to the target."""
        import random
        
        # Check proc chance
        if random.random() > self.BLEED_CHANCE:
            return {"applied": False, "reason": "chance_failed"}
        
        if not self.can_apply_bleed():
            return {"applied": False, "reason": "max_stacks_reached"}
        
        current_time = time.time()
        expiry = current_time + self.BLEED_DURATION
        damage_per_sec = target_max_hp * self.BLEED_DAMAGE_PERCENT
        
        self._bleed_stacks.append((expiry, damage_per_sec))
        
        return {
            "applied": True,
            "stacks": self.get_active_stacks(),
            "damage_per_second": damage_per_sec,
            "duration": self.BLEED_DURATION,
            "total_dot_damage": damage_per_sec * self.BLEED_DURATION
        }
    
    def get_bleed_damage_per_tick(self, tick_rate: float = 1.0) -> float:
        """Get total bleed damage for a tick period."""
        self._clean_expired_stacks()
        total_dps = sum(dps for _, dps in self._bleed_stacks)
        return total_dps * tick_rate
    
    def on_hit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """On hit: Chance to apply bleed."""
        # Assume target has max_hp attribute, default to 1000 if not specified
        target_max_hp = getattr(target, 'max_hp', 1000)
        return self.apply_bleed(target_max_hp)
    
    def get_bonus_damage(self, wielder) -> float:
        """Samurai swords deal bonus damage based on bleed stacks."""
        stacks = self.get_active_stacks()
        # Each bleed stack adds 2% damage to the sword
        return 1.0 + (stacks * 0.02)
    
    def __str__(self):
        stacks = self.get_active_stacks()
        dps = self.get_bleed_damage_per_tick()
        return f"Crimson Fangs ({stacks}/{self.MAX_STACKS} stacks, {dps:.1f} dmg/sec)"


class CrystalStaffAbility(WeaponAbility):
    """
    Crystal Staff Innate Ability:
    Ethereal Focus - 10% chance when casting to gain hyperarmor and guaranteed crit.
    Allows mages to safely channel powerful spells without interruption.
    """
    
    PROC_CHANCE = 0.10  # 10% chance on casting
    HYPERARMOR_DURATION = 3.0  # 3 seconds of hyperarmor
    CRIT_MULTIPLIER = 2.0  # Double damage on proc
    
    def __init__(self):
        super().__init__(
            name="Ethereal Focus",
            description="10% chance when casting to gain hyperarmor and guaranteed critical hit. Prevents spell interruption."
        )
        self._hyperarmor_until: float = 0.0
        self._next_attack_crits: bool = False
        self._procs_triggered: int = 0
    
    def on_cast_start(self) -> Dict[str, Any]:
        """Called when starting to cast a spell."""
        import random
        
        if random.random() <= self.PROC_CHANCE:
            current_time = time.time()
            self._hyperarmor_until = current_time + self.HYPERARMOR_DURATION
            self._next_attack_crits = True
            self._procs_triggered += 1
            
            return {
                "proc_triggered": True,
                "hyperarmor_granted": True,
                "guaranteed_crit": True,
                "duration": self.HYPERARMOR_DURATION,
                "message": "Ethereal Focus activated! Hyperarmor and guaranteed crit!"
            }
        
        return {"proc_triggered": False}
    
    def has_hyperarmor(self) -> bool:
        """Check if hyperarmor is currently active."""
        return time.time() < self._hyperarmor_until
    
    def get_hyperarmor_remaining(self) -> float:
        """Get remaining hyperarmor duration."""
        if not self.has_hyperarmor():
            return 0.0
        return self._hyperarmor_until - time.time()
    
    def should_crit(self) -> bool:
        """Check if next attack should be forced critical."""
        if self._next_attack_crits:
            self._next_attack_crits = False  # Consume the crit
            return True
        return False
    
    def on_hit(self, wielder, target, damage: float) -> Dict[str, Any]:
        """Track when crits occur from this ability."""
        return {
            "ethereal_focus_active": self.has_hyperarmor(),
            "guaranteed_crit_used": not self._next_attack_crits
        }
    
    def get_bonus_damage(self, wielder) -> float:
        """Staff gets bonus damage based on Magic stat."""
        # Scale bonus with magic stat - more magic = more staff damage
        magic_bonus = wielder.magic * 0.02
        return 1.0 + magic_bonus
    
    def __str__(self):
        status = "ACTIVE" if self.has_hyperarmor() else "Ready"
        remaining = self.get_hyperarmor_remaining()
        crit_ready = "Yes" if self._next_attack_crits else "No"
        return f"Ethereal Focus ({status}, {remaining:.1f}s hyperarmor, Crit ready: {crit_ready})"


@dataclass
class WeaponScaling:
    """Weapon scaling with each stat."""
    strength: str = "-"   # D, C, B, A, S
    magic: str = "-"
    dexterity: str = "-"  # Using Speed as dexterity equivalent
    arcane: str = "-"


@dataclass
class Weapon:
    """Weapon with innate abilities and scaling."""
    name: str
    description: str
    base_damage: int
    damage_type: DamageType
    stamina_cost: int
    ability: Optional[WeaponAbility] = None
    scaling: WeaponScaling = None
    weight: float = 3.0
    
    def __post_init__(self):
        if self.scaling is None:
            self.scaling = WeaponScaling()
    
    def calculate_damage(self, wielder_stats) -> float:
        """Calculate total damage including scaling."""
        from character_stats import get_scaling_bonus
        
        damage = self.base_damage
        
        # Apply stat scaling
        damage += get_scaling_bonus(wielder_stats.strength, self.base_damage)
        damage += get_scaling_bonus(wielder_stats.magic, self.base_damage) * 0.5
        damage += get_scaling_bonus(wielder_stats.speed, self.base_damage) * 0.3
        damage += get_scaling_bonus(wielder_stats.arcane, self.base_damage) * 0.2
        
        # Apply ability damage boost
        if self.ability:
            damage *= self.ability.get_bonus_damage(wielder_stats)
        
        return damage
    
    def is_crit(self, wielder_stats) -> bool:
        """Check if this attack is a critical hit."""
        import random
        return random.random() < (wielder_stats.crit_chance / 100)
    
    def attack(self, wielder, target) -> Dict[str, Any]:
        """Perform an attack. Returns attack result info."""
        damage = self.calculate_damage(wielder.stats)
        is_critical = self.is_crit(wielder.stats)
        
        if is_critical:
            # Crits deal 2x damage (from Silvered Sword ability)
            damage *= 2.0
        
        result = {
            "damage": damage,
            "is_critical": is_critical,
            "damage_type": self.damage_type.value,
            "ability_triggered": None
        }
        
        # Trigger ability effects
        if self.ability:
            if is_critical:
                ability_result = self.ability.on_crit(wielder, target, damage)
                result["ability_triggered"] = ability_result
            else:
                ability_result = self.ability.on_hit(wielder, target, damage)
                if ability_result:
                    result["ability_triggered"] = ability_result
        
        return result


def create_silvered_sword() -> Weapon:
    """Factory function to create the Knight's starting weapon."""
    return Weapon(
        name="Silvered Sword",
        description="A well-crafted longsword with a silvered edge. Favored by knights for its reliability.",
        base_damage=120,
        damage_type=DamageType.PHYSICAL,
        stamina_cost=15,
        ability=SilveredSwordAbility(),
        scaling=WeaponScaling(
            strength="C",
            dexterity="D",
            magic="-",
            arcane="-"
        ),
        weight=4.5
    )


def create_bronze_shield() -> Weapon:
    """Factory function to create the Tank's starting weapon - a heavy bronze shield."""
    return Weapon(
        name="Bronze Bulwark",
        description="A massive bronze shield forged for the immovable guardians of the realm. Its weight crushes foes while its protection is absolute. Features ornate gold-red trim reminiscent of ancient crusaders.",
        base_damage=80,  # Lower damage but can block/parry
        damage_type=DamageType.PHYSICAL,
        stamina_cost=20,  # Higher stamina cost for heavy attacks
        ability=BronzeShieldAbility(),
        scaling=WeaponScaling(
            strength="D",
            dexterity="-",
            magic="-",
            arcane="E"
        ),
        weight=8.0  # Heavy shield
    )


def create_sabertooth_sword() -> Weapon:
    """Factory function to create the Samurai's starting weapon - a curved katana."""
    return Weapon(
        name="Sabertooth",
        description="A masterwork katana with a distinctive curved blade, forged in the eastern lands. Its edge is so sharp it leaves wounds that bleed endlessly. The dark lacquered saya contrasts with the silver blade.",
        base_damage=100,
        damage_type=DamageType.PHYSICAL,
        stamina_cost=12,  # Lower stamina cost for fast attacks
        ability=SabertoothSwordAbility(),
        scaling=WeaponScaling(
            strength="D",
            dexterity="B",  # Scales well with Speed (used as dexterity)
            magic="-",
            arcane="C"      # Bleed scales with Arcane
        ),
        weight=3.5  # Light weapon for agile fighters
    )


def create_crystal_staff() -> Weapon:
    """Factory function to create the Mage's starting weapon - an ornate crystal staff."""
    return Weapon(
        name="Crystal Staff",
        description="An ornate staff crowned with a radiant blue crystal that pulses with arcane energy. Woven with gold filigree and enchanted by ancient sorceresses, it channels the wielder's magic into devastating spells.",
        base_damage=90,
        damage_type=DamageType.MAGICAL,  # Magic damage
        stamina_cost=18,  # Higher cost for spell casting
        ability=CrystalStaffAbility(),
        scaling=WeaponScaling(
            strength="-",
            dexterity="-",
            magic="A",      # Excellent magic scaling
            arcane="B"      # Good arcane scaling
        ),
        weight=2.5  # Light weapon
    )
