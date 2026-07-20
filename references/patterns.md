# Pixel Art Patterns - APT Coding Camp

## Color Palette Standards

### Player (Friendly) Colors
| Role | Primary | Secondary | Accent | Dark |
|------|---------|-----------|--------|------|
| Military | `#5d6d3d` | `#4a5a2d` | `#3a4a1d` | `#2a2a2a` |
| Skin | `#d4a574` | | | |

### Enemy (Hostile) Colors
| Role | Primary | Secondary | Accent | Dark |
|------|---------|-----------|--------|------|
| Tactical Blue | `#3a4a6d` | `#2a3a5d` | `#1a2a4d` | `#1a1a2e` |
| Visor | `#e67e22` | `#f39c12` | | |
| Weapon (Tan) | `#c4956a` | `#b08555` | `#a07545` | `#8b6f4e` |

## Sprite Dimensions

### Standard Sizes
| Type | Width | Height | ViewBox |
|------|-------|--------|---------|
| Idle/Static | 32px | 48px | `0 0 32 48` |
| Action/Extended | 48px | 48px | `0 0 48 48` |

### Body Proportions (32×48px base)
- Head: 16×14px at position (8, 4)
- Torso: 24×20px at position (4, 16)
- Legs: 8×16px each at positions (6, 32) and (18, 32)
- Boots: 10×4px at y=44

## SVG Construction Rules

### Element Ordering (Back to Front)
1. Legs (back leg first)
2. Boots
3. Torso/Body
4. Vest details
5. Arms
6. Hands/Gloves
7. Head
8. Helmet
9. Visor/Goggles
10. Weapon
11. Effects (muzzle flash, shells)

### Pixel Art Technique
- Use only `<rect>` elements
- No anti-aliasing (hard edges only)
- No rotation transforms
- All coordinates must be integers
- Width/height values must be integers

## Animation Frame Guidelines

### Frame Count by Action
| Animation | Frames | Notes |
|-----------|--------|-------|
| Idle | 1-2 | Subtle breathing only |
| Walk | 4 | Alternating leg/arm swing |
| Shoot | 1-2 | Recoil + muzzle flash |
| Jump | 1 | Static pose mid-air |

### Contrast Requirements
- Enemy must be immediately distinguishable from player at 1× zoom
- Use color temperature: Player = warm (green), Enemy = cool (blue)
- Silhouette must read clearly against game background

## File Naming Convention

```
[character]-[action].svg

Examples:
- player-idle.svg
- player-walk.svg
- player-shoot.svg
- enemy-soldier.svg
- enemy-shoot.svg
```
