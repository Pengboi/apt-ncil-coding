# Sharp Edges - Critical Pixel Art Failures

## Why Pixel Art Sprites Fail

### 1. Anti-Aliasing Creep
**The Failure**: Using semi-transparent pixels or gradient fills to "smooth" edges.
**Why It Happens**: High-res art habits bleed into pixel work.
**The Fix**: Hard edges only. Every pixel is 100% opaque. No gradients.

### 2. Unreadable at 1× Zoom
**The Failure**: Detail that's invisible when sprite is at actual game size.
**Why It Happens**: Working zoomed in at 400%+, losing perspective.
**The Fix**: Design at 1×. If you can't see it at actual size, it doesn't exist.

### 3. Similar Silhouettes
**The Failure**: Player and enemy look identical in fast-paced gameplay.
**Why It Happens**: Copy-pasting structure without color/shape variation.
**The Fix**: Enemies use cool palette (blue), warm accents (orange visor). Different helmet shapes.

### 4. Floating Limbs
**The Failure**: Arms/legs disconnected from body due to poor pixel placement.
**Why It Happens**: Rectangle coordinates off by 1-2 pixels.
**The Fix**: Always check connections at 1× zoom. Adjacent rectangles must touch.

### 5. Too Many Colors
**The Failure**: 20+ colors in a 32×48 sprite.
**Why It Happens**: Fear of limitations, wanting "more detail."
**The Fix**: Maximum 8-10 colors per sprite. Forces better design decisions.

### 6. Animation Frame Bloat
**The Failure**: 8-frame walk cycle that looks muddy at game speed.
**Why It Happens**: High-res animation habits.
**The Fix**: Fewer frames (4 max for walk). Let the player's imagination fill gaps.

### 7. Inconsistent Lighting
**The Failure**: Highlights on opposite sides of different body parts.
**Why It Happens**: Not establishing light source early.
**The Fix**: Pick one light direction. All highlights/shadows follow it.

### 8. Weapon Size Disproportion
**The Failure**: Rifle looks like a toy or is comically oversized.
**Why It Happens**: Not checking proportions against body.
**The Fix**: Weapon ~60% of torso height when held. Barrel extends naturally from grip.

### 9. Seams and Gaps
**The Failure**: Visible gaps between tiles or animation frames.
**Why It Happens**: Sub-pixel positioning errors.
**The Fix**: All coordinates integers. Check at 1× zoom.

### 10. Copy-Paste Without Adaptation
**The Failure**: Enemy is just player sprite with hue-shifted colors.
**Why It Happens**: Laziness or time pressure.
**The Fix**: Enemies need distinct silhouettes. Helmet shape, stance, weapon position all different.

## Our Battle Scars

- Created "perfect" 8-frame walk cycle that looked wrong at 60fps
- Made a character with 15 colors that was unreadable at game size
- Had to redo entire enemy set because blue-on-blue was invisible against sky
- Discovered that 4-frame idle with sub-pixel movement beats 8-frame static
