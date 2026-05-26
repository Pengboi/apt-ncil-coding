# Validations - Pixel Art Constraints

## Strict Rules (Non-Negotiable)

### 1. SVG Structure
- [x] All elements use `<rect>` only (no `<path>`, `<circle>`, `<polygon>`)
- [x] `xmlns="http://www.w3.org/2000/svg"` attribute present
- [x] `viewBox` attribute defined
- [x] `width` and `height` attributes match viewBox

### 2. Coordinates & Dimensions
- [x] All x, y coordinates are integers (no decimals)
- [x] All width, height values are integers (no decimals)
- [x] No negative width/height values
- [x] No `transform` attributes used
- [x] No `rx` or `ry` (rounded corners)

### 3. Color Palette
- [x] Maximum 10 unique colors per sprite
- [x] All colors in hex format (#RRGGBB)
- [x] No semi-transparent colors (no alpha channel)
- [x] No gradients (`fill="url(#gradient)"` forbidden)

### 4. File Standards
- [x] File extension: `.svg`
- [x] File encoding: UTF-8
- [x] No external references (images, fonts, stylesheets)
- [x] Self-contained file (all styles inline)

### 5. Sprite-Specific Validations

#### Player Sprites
- [x] Primary color: `#5d6d3d` (military green)
- [x] Dimensions: 32×48px for idle/walk/jump, 48×48px for shoot

#### Enemy Sprites
- [x] Primary color: `#3a4a6d` (tactical blue)
- [x] Visor color: `#e67e22` (orange)
- [x] Must be distinguishable from player at 1× zoom
- [x] Weapon color different from player's dark gray

### 6. Naming Conventions
```
VALID:
- player-idle.svg
- enemy-shoot.svg
- player-walk.svg

INVALID:
- PlayerIdle.svg (camelCase)
- enemy_shoot.svg (underscores)
- enemy shoot.svg (spaces)
- enemy1.svg (numbers without purpose)
```

## Validation Checklist Per Sprite

Before marking complete, verify:
- [ ] Opens correctly in browser
- [ ] Renders at 1× zoom without blur
- [ ] Colors match palette
- [ ] No decimal coordinates
- [ ] Silhouette readable
- [ ] File name follows convention
- [ ] Comments minimal (purpose only)
