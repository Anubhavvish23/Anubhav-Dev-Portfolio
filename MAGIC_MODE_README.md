# Magic Mode System

A comprehensive React system for adding chaotic, fun animations to your website when Magic Mode is activated. Perfect for creating engaging user experiences with smooth, accessible animations.

## Features

- 🌟 **Global Magic Mode State** - Toggle magic mode across your entire application
- ✨ **Chaotic Text Animations** - Text elements float, rotate, and scale randomly
- 🃏 **Card/Tile Animations** - Cards tilt, spin, and wobble with physics
- 📊 **Progress Bar Effects** - Progress bars melt, drip, and warp
- 🎯 **Magic Cursor** - Sparkle trail and ghost cursor effects
- ♿ **Accessibility First** - Respects `prefers-reduced-motion` settings
- 📱 **Mobile Optimized** - Responsive animations with performance considerations
- 🎨 **Customizable** - Easy to configure animation ranges and speeds

## Quick Start

### 1. Setup Context Provider

Wrap your app with the `MagicModeProvider`:

```tsx
import { MagicModeProvider } from './contexts/MagicModeContext';

function App() {
  return (
    <MagicModeProvider>
      {/* Your app content */}
    </MagicModeProvider>
  );
}
```

### 2. Add Magic Toggle

Include the magic toggle button (mobile-only by default):

```tsx
import MagicToggle from './components/MagicToggle';

function App() {
  return (
    <div>
      <MagicToggle />
      {/* Your app content */}
    </div>
  );
}
```

### 3. Wrap Elements with Chaos Components

```tsx
import { useMagicMode } from './contexts/MagicModeContext';
import ChaosText from './components/ChaosText';
import ChaosCard from './components/ChaosCard';
import ChaosProgress from './components/ChaosProgress';

function MyComponent() {
  const { magicMode } = useMagicMode();

  return (
    <div>
      {/* Animated text */}
      <ChaosText 
        magicMode={magicMode} 
        element="h1" 
        className="text-4xl font-bold"
      >
        This will animate!
      </ChaosText>

      {/* Animated card */}
      <ChaosCard 
        magicMode={magicMode} 
        className="p-6 bg-white rounded-lg"
      >
        <h2>Card Content</h2>
        <p>This card will wobble and tilt!</p>
      </ChaosCard>

      {/* Animated progress bar */}
      <ChaosProgress 
        magicMode={magicMode} 
        className="w-full h-4 bg-gray-200 rounded-full"
      >
        <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
      </ChaosProgress>
    </div>
  );
}
```

## Components

### ChaosText

Wraps text elements with chaotic animations.

```tsx
<ChaosText 
  magicMode={magicMode}
  element="h1" // HTML element type
  className="text-4xl font-bold"
  animationType="text" // 'text' | 'card' | 'progress'
  id="unique-id" // Optional unique identifier
>
  Your text content
</ChaosText>
```

### ChaosCard

Wraps card/tile elements with tilting and spinning animations.

```tsx
<ChaosCard 
  magicMode={magicMode}
  className="p-6 bg-white rounded-lg shadow-lg"
  animationType="card"
>
  <h2>Card Title</h2>
  <p>Card content that will animate!</p>
</ChaosCard>
```

### ChaosProgress

Wraps progress bars with melting and warping effects.

```tsx
<ChaosProgress 
  magicMode={magicMode}
  className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
  animationType="progress"
>
  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
</ChaosProgress>
```

### ChaosCursor

Provides magic cursor effects (automatically included in App.tsx).

```tsx
<ChaosCursor magicMode={magicMode} />
```

## Customization

### Animation Configuration

Customize animation ranges and speeds:

```tsx
import { useChaosAnimation } from './hooks/useChaosAnimation';

const customConfig = {
  textRange: { x: 20, y: 15, rotate: 10, scale: 0.05 },
  cardRange: { x: 30, y: 20, rotate: 15, scale: 0.1, skew: 5 },
  progressRange: { x: 15, y: 8, scale: 0.2 },
  animationSpeed: { min: 2000, max: 6000 }
};

const { animationStates, startAnimation } = useChaosAnimation(magicMode, customConfig);
```

### CSS Customization

Add custom animations to `src/index.css`:

```css
/* Custom animation keyframes */
@keyframes my-custom-animation {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* Apply to magic mode */
.magic-mode-active .my-custom-class {
  animation: my-custom-animation 3s ease-in-out infinite;
}
```

### Magic Mode Classes

The system adds these CSS classes when magic mode is active:

- `.magic-mode-active` - Applied to body element
- `.reduced-motion` - Applied when user prefers reduced motion
- `.magic-text` - For gradient text effects
- `.magic-card` - For card glow effects
- `.magic-progress` - For progress bar effects

## Accessibility

The system automatically respects user preferences:

- **Reduced Motion**: Animations are disabled when `prefers-reduced-motion: reduce` is set
- **Performance**: Uses `will-change` and `transform3d` for optimal performance
- **Focus Management**: Magic toggle is keyboard accessible
- **Screen Readers**: Proper ARIA labels and roles

## Performance Tips

1. **Limit Animated Elements**: Don't animate too many elements simultaneously
2. **Use Unique IDs**: Provide unique IDs for better performance
3. **Mobile Optimization**: Animations are automatically optimized for mobile
4. **GPU Acceleration**: Uses `transform3d` for hardware acceleration

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Troubleshooting

### Animations not working?

1. Check that `MagicModeProvider` wraps your app
2. Verify `magicMode` is being passed correctly
3. Ensure Framer Motion is installed
4. Check browser console for errors

### Performance issues?

1. Reduce the number of animated elements
2. Lower animation ranges in configuration
3. Increase animation duration
4. Check for conflicting CSS animations

### Accessibility concerns?

1. Test with screen readers
2. Verify reduced motion preferences work
3. Check keyboard navigation
4. Ensure sufficient color contrast

## Examples

See `src/components/ExampleUsage.tsx` for comprehensive usage examples.

## License

MIT License - feel free to use in your projects! 