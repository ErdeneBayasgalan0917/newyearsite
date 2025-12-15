# Krita Asset Creation Guide

## Directory Structure
```
assets/decorations/
├── trees/          # Tree illustrations from Krita
├── snowflakes/     # Snowflake designs from Krita  
├── ornaments/      # Holiday ornaments from Krita
├── effects/        # Special effects (sparkles, stars, etc.)
└── README.md       # This guide
```

## 🎨 Krita Asset Specifications

### 🎴 **NEW YEAR CARDS (Most Important!)**
**Location: `assets/cards/`**
- **Canvas Size**: 1200x1200px (SQUARE - perfect for all devices!)
- **Resolution**: 150-200 DPI
- **Format**: JPG (smaller files) or PNG (higher quality)
- **Quality**: 85-95% for JPG
- **File Size Target**: 300-800KB each
- **Color Space**: sRGB
- **Why Square?** Works perfectly on both mobile and desktop, no awkward cropping!

### 🌲 Trees (assets/decorations/trees/)
**Recommended Files:**
- `tree1.png` - Main evergreen tree (large)
- `tree2.png` - Decorated Christmas tree  
- `tree3.png` - Small winter tree
- `tree4.png` - Bare winter tree with snow

**Krita Settings:**
- **Canvas Size**: 400x600px (portrait for trees)
- **Resolution**: 150 DPI
- **Format**: PNG with transparency
- **File Size Target**: Under 150KB each
- **Style**: Hand-painted, illustrated, or digital art
- **Colors**: Winter palette (greens, browns, whites, blues)

### ❄️ Snowflakes (assets/decorations/snowflakes/)
**Recommended Files:**
- `snowflake1.png` - Classic 6-pointed snowflake
- `snowflake2.png` - Detailed crystalline pattern
- `snowflake3.png` - Simple geometric design
- `snowflake4.png` - Ornate decorative style
- `snowflake5.png` - Unique artistic interpretation

**Krita Settings:**
- **Canvas Size**: 200x200px (square)
- **Resolution**: 150 DPI  
- **Format**: PNG with transparency
- **File Size Target**: Under 50KB each
- **Style**: Intricate details, crystalline patterns
- **Colors**: White, light blue, transparent background

### 🎄 Ornaments (assets/decorations/ornaments/)
**Recommended Files:**
- `ornament-ball-red.png` - Classic red Christmas ball
- `ornament-ball-gold.png` - Golden ornament
- `ornament-bell.png` - Christmas bell
- `ornament-star.png` - Star-shaped ornament
- `ornament-candy-cane.png` - Candy cane

**Krita Settings:**
- **Canvas Size**: 150x150px (square)
- **Resolution**: 150 DPI
- **Format**: PNG with transparency
- **File Size Target**: Under 75KB each
- **Style**: Shiny, reflective surfaces, festive
- **Colors**: Traditional Christmas colors (red, green, gold, silver)

### ✨ Effects (assets/decorations/effects/)
**Recommended Files:**
- `sparkle1.png` - Small twinkling star
- `sparkle2.png` - Burst of light
- `glow-effect.png` - Soft glow overlay
- `magic-dust.png` - Magical particle effect

**Krita Settings:**
- **Canvas Size**: 300x300px (square)
- **Resolution**: 150 DPI
- **Format**: PNG with transparency
- **File Size Target**: Under 100KB each
- **Style**: Glowing, ethereal, magical effects
- **Colors**: Bright whites, golds, soft pastels

## 🎭 Animation Considerations

### For Swaying Animations:
- **Trees**: Paint them upright, animation will rotate them
- **Ornaments**: Create hanging ornaments (vertical orientation)
- **Branches**: Individual elements for complex animations

### For Falling Animations:
- **Snowflakes**: Create multiple rotation frames if desired
- **Effects**: Consider particle-like elements

### For Scaling/Growing Animations:
- **All elements**: Use high resolution to prevent pixelation
- **Details**: Fine details should remain visible when scaled down

## 🎨 Krita Drawing Tips

### Layer Organization:
```
- Background Effects
- Main Shape/Form  
- Details & Patterns
- Highlights & Shadows
- Glow/Magic Effects (separate layer)
```

### Brush Recommendations:
- **Basic Round** for clean lines
- **Textured brushes** for organic feel
- **Airbrush** for glows and soft effects
- **Pattern brushes** for snowflake details

### Color Palettes:
- **Winter**: `#ffffff`, `#e6f3ff`, `#b8e0ff`, `#4a90e2`
- **Christmas**: `#c41e3a`, `#228b22`, `#ffd700`, `#800080`
- **Magical**: `#ffd700`, `#ff69b4`, `#00ffff`, `#da70d6`

## 📁 File Naming Convention

```
[category]-[description]-[variant].[extension]
```

Examples:
- `tree-evergreen-large.png`
- `snowflake-detailed-crystal.png` 
- `ornament-ball-shiny-red.png`
- `effect-sparkle-bright-gold.png`

## 🚀 Export Settings from Krita

1. **File → Export As → PNG**
2. **Quality**: High (important for transparency)
3. **Color Space**: sRGB  
4. **Bit Depth**: 8-bit (web standard)
5. **Transparency**: Enabled
6. **Compression**: Medium (balance of quality/size)

## 💡 Creative Ideas

### Tree Variations:
- Snow-covered branches
- Christmas lights wrapped around
- Icicles hanging down
- Different seasonal states
- Magical glowing trees

### Snowflake Ideas:
- Mandala-inspired patterns
- Fractal geometric designs
- Hand-drawn artistic styles
- Crystal-like realistic forms
- Whimsical cartoon styles

### Ornament Concepts:
- Reflective surfaces with environment
- Hand-painted folk art styles
- Modern minimalist designs
- Vintage/antique ornaments
- Personalized family ornaments

## 🔄 Animation Integration

Once you create the assets, the website will:
- **Load your images** automatically
- **Apply CSS animations** (rotation, swaying, falling)
- **Randomly select** from your variations
- **Scale and position** them dynamically
- **Layer them** for depth effects

The more variety you create, the more dynamic and unique your website will look!

## 📝 Quick Checklist

- [ ] Create at least 3-5 tree variations
- [ ] Design 4-6 unique snowflakes  
- [ ] Make 6-8 different ornaments
- [ ] Add 3-4 magical effects
- [ ] Export all as PNG with transparency
- [ ] Use consistent art style across all assets
- [ ] Test different sizes for best web performance
- [ ] Keep individual files under 500KB when possible