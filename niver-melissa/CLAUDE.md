# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "niver-melissa" website project - a birthday party website for Melissa's 1st birthday with a Winnie the Pooh theme. The site is designed for parents living in Portugal who are organizing a birthday party in Brazil, with special considerations for travel and gift logistics.

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid, Flexbox, and CSS Variables
- **Fonts**: Google Fonts (Comfortaa, Bubblegum Sans)
- **Icons**: Font Awesome 6.0
- **No build process**: Direct file serving, no bundler required

### File Structure
```
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete stylesheet with responsive design
├── script.js           # JavaScript functionality and interactions
├── README.md           # User documentation and setup instructions
├── CLAUDE.md           # This file - development guidance
└── img/                # Images directory
    └── turma-do-pooh.jpg   # Winnie the Pooh background image
```

### Key Features
- **Mobile-First Responsive Design**: Fully responsive with hamburger navigation
- **Gift Management System**: Local storage-based gift selection with categories for travel logistics
- **RSVP System**: Form with local storage and confirmation modal
- **Gallery System**: Placeholder structure ready for media uploads
- **Animation System**: Intersection Observer-based animations and floating elements

## Development Commands

This is a static website with no build process required:

### Local Development
```bash
# Serve locally (any of these options):
python -m http.server 8000    # Python 3
python -m SimpleHTTPServer 8000    # Python 2
npx serve .                   # If you have Node.js
# Or open index.html directly in browser
```

### Deployment
- Upload files to any web server or static hosting (Netlify, GitHub Pages, etc.)
- No build step needed - files can be served directly

## Code Architecture

### CSS Organization
- CSS Variables for consistent theming (`:root` section)
- Mobile-first responsive design with `@media` queries
- Component-based class naming
- Watercolor/artistic design system inspired by Winnie the Pooh

### JavaScript Architecture
- **Class-based modules**: `GiftManager`, `RSVPManager`, `GalleryManager`, `AnimationManager`
- **Local Storage**: Persistent data for gift selections and RSVPs
- **Event-driven**: DOM events and Intersection Observer patterns
- **No external dependencies**: Pure vanilla JavaScript

### HTML Structure
- **Semantic HTML5**: Proper use of sections, headers, navigation
- **Accessibility**: ARIA labels, proper form structure
- **Performance**: Lazy loading ready, optimized asset loading

## Customization Guidelines

### Personal Information Updates
Key areas that need customization (search for these in `index.html`):
- `[Adicionar data]` - Party date and time
- `[Adicionar endereço completo]` - Full address
- `[Adicionar WhatsApp]` and `[Adicionar email]` - Contact information  
- `[Adicionar chave PIX]` - PIX payment key

### Adding Photos
1. Add images to the `img/` directory
2. **For the birthday girl's main photo in hero section:**
   - Replace `.birthday-photo-placeholder` div with:
   ```html
   <img src="img/melissa-photo.jpg" alt="Melissa - 1 ano" class="birthday-main-photo">
   ```
   - Add CSS for the new class:
   ```css
   .birthday-main-photo {
       width: 100%;
       height: 100%;
       border-radius: 50%;
       object-fit: cover;
   }
   ```

3. **For other gallery photos:**
   Replace `.photo-placeholder` divs with actual `<img>` tags:
   ```html
   <img src="img/your-image.jpg" alt="Description" loading="lazy">
   ```

The hero background uses `img/turma-do-pooh.jpg` - replace this in `styles.css` if needed.

### Gift List Customization
Modify gift items in `.gift-list` sections within each `.gift-category`

### Enabling Countdown Timer
Uncomment and set date in `script.js`:
```javascript
new CountdownManager('YYYY-MM-DD HH:MM:SS');
```

## Styling System

### Color Palette
```css
--primary-color: #FFB84D;    /* Golden Honey 🍯 */
--secondary-color: #F4C842;  /* Bright Yellow */
--accent-color: #E9C46A;     /* Soft Yellow */
--forest-green: #2A9D8F;     /* Forest/Nature */
--soft-peach: #F4C6A6;       /* Peachy Yellow */
--pooh-yellow: #E6A028;      /* Deep Golden */
```

### Animation Classes
- `.floating-*` - Floating animation elements
- Intersection Observer triggers animations on scroll
- CSS `@keyframes` for various effects

## Special Features

### Travel-Aware Gift System
- **Baggage Category**: Small/light items for airplane transport
- **Brazil Use**: Large items to use during stay
- **Mail Shipping**: Items to ship to Portugal later
- **PIX Contribution**: Digital payment integration

### Responsive Breakpoints
- Desktop: Default styles
- Tablet: `max-width: 768px`
- Mobile: `max-width: 480px`

## Performance Considerations
- Images use `loading="lazy"` attribute
- CSS uses efficient selectors
- JavaScript uses event delegation where appropriate
- Minimal external dependencies (only Google Fonts and Font Awesome CDN)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- ES6+ JavaScript features used
- Progressive enhancement approach