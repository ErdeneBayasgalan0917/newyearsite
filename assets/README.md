# New Year 2026 Card Collection - Asset Management Guide

## Directory Structure
```
assets/
├── cards/          # Krita-designed card images
├── audio/          # Holiday music and sound effects
└── README.md       # This file
```

## Card Images (Krita Designs)
Place your Krita-designed New Year cards in the `cards/` folder:

### Required Files:
- `card-happy-2026.jpg` - General happiness theme
- `card-sparkle-2026.jpg` - Sparkle/celebration theme  
- `card-dreams-2026.jpg` - Dreams/aspirations theme

### Recommended Specifications:
- **Format**: JPG or PNG
- **Resolution**: 1200x800px (3:2 aspect ratio)
- **File Size**: Under 2MB for web optimization
- **Design Elements**: 
  - New Year themes (2026, fireworks, celebrations)
  - Personal touch elements
  - High contrast text for readability
  - Festive color schemes (gold, silver, blue, red)

### Card Code Mapping:
Update the `cardData` object in `script.js` to add more cards:
```javascript
const cardData = {
    'YOUR_CODE': {
        image: 'assets/cards/your-card-name.jpg',
        message: 'Your personalized message',
        recipient: 'Recipient Name'
    }
};
```

## Audio Files
Place holiday music and sound effects in the `audio/` folder:

### Required Audio Files:
- `holiday-tune.mp3` - Background holiday music (should loop)
- `holiday-tune.ogg` - Alternative format for browser compatibility
- `card-reveal.mp3` - Sound when card is revealed
- `card-reveal.wav` - Alternative format
- `tick.mp3` - Countdown timer tick sound

### Audio Specifications:
- **Background Music**: 
  - Duration: 2-5 minutes (will loop)
  - Format: MP3 and OGG for compatibility
  - Bitrate: 128kbps (balance of quality/file size)
  - Volume: Already set to 30% in code
  
- **Sound Effects**:
  - Duration: 1-3 seconds
  - Format: MP3 and WAV for compatibility
  - Quick loading for responsive interactions

### Music Recommendations:
- Instrumental holiday classics
- Ambient winter soundscapes
- Light orchestral pieces
- Modern holiday arrangements
- Creative Commons or royalty-free music

## Performance Considerations:
- **Images**: Optimize with tools like TinyPNG before uploading
- **Audio**: Use compressed formats but maintain quality
- **Loading**: Large assets may affect page load time
- **Mobile**: Consider reduced file sizes for mobile users

## Adding New Cards:

1. **Design in Krita**: Create your card with New Year 2026 theme
2. **Export**: Save as JPG/PNG in recommended specifications
3. **Upload**: Place file in `assets/cards/` folder
4. **Generate Code**: Create a unique 6-12 character access code
5. **Update Script**: Add entry to `cardData` object in `script.js`
6. **Test**: Verify the card loads properly with the access code

## Browser Compatibility Notes:
- **Audio**: Some browsers require user interaction before playing audio
- **Images**: Modern formats (WebP) can be used with fallbacks
- **Performance**: Test on mobile devices for smooth animations

## Example Card Codes in Demo:
- `HAPPY2026` - General celebration card
- `SPARKLE26` - Sparkly theme card  
- `DREAMS26` - Aspirational theme card

Remember to keep access codes private and share them individually with recipients!