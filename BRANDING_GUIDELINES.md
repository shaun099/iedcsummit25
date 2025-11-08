# IEDC Summit 2025 - Branding Guidelines

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Logo & Visual Identity](#logo--visual-identity)
4. [Button & Component Styles](#button--component-styles)
5. [Spacing & Layout](#spacing--layout)
6. [Animation & Effects](#animation--effects)
7. [Code Implementation](#code-implementation)

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Primary Blue** | `#3b82f6` | rgb(59, 130, 246) | Scrollbar, icons, hover states |
| **Blue 500** | `#3b82f6` | rgb(59, 130, 246) | Headlines, primary text |
| **Blue 600** | `#2563eb` | rgb(37, 99, 235) | Buttons, active states, hover |
| **Blue 400** | `#60a5fa` | rgb(96, 165, 250) | Secondary text, labels |
| **Blue 700** | `#1d4ed8` | rgb(29, 78, 216) | Deepest blue, strong accents |

### Secondary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Green 600** | `#16a34a` | rgb(22, 163, 74) | Success states, active status |
| **Gray 900** | `#111827` | rgb(17, 24, 39) | Footer background |
| **Gray 300** | `#d1d5db` | rgb(209, 213, 219) | Disabled buttons, borders |
| **Gray 400** | `#9ca3af` | rgb(156, 163, 175) | Secondary backgrounds |
| **White** | `#ffffff` | rgb(255, 255, 255) | Primary background, text on dark |

### Gradient Colors (for schedule/events)

| Color | Hex Code | Usage |
|-------|----------|-------|
| Pink | `#FD83FD` | Events, sections |
| Yellow | `#F8D247` | Events, sections |
| Cyan | `#2FEEC4` | Events, sections |
| Purple | `#6495FD` | Events, sections |
| Violet | `#6d28d9` | Primary CTA gradient |

### Shadow Colors

- **Card Shadow**: `rgba(37, 99, 235, 0.25)` - Subtle blue shadow for cards
- **Scrollbar Track**: `transparent` - Invisible track

---

## Typography

### Font Families

#### 1. **Clash Display** (Primary - Headlines)
- **Font File**: `ClashDisplay-Variable.ttf`
- **Usage**: Main headlines, large titles, CTAs
- **CSS Class**: `.font-clash-display`
- **Weight**: Variable (Default: Regular)
- **Font Display**: Swap (avoid FOIT)

```css
font-family: "ClashDisplay", sans-serif;
```

#### 2. **Gilroy** (Secondary - Body Text)
- **Font Files**: 
  - `Gilroy-Light.otf` (Weight: 300)
  - `Gilroy-Medium.ttf` (Weight: 500/600)
  - `Gilroy-ExtraBold.otf` (Weight: 800)
- **Font Display**: Swap (avoid FOIT)

**Available Weights:**

| Weight | Class | Usage |
|--------|-------|-------|
| 300 | `.font-gilroy-light` | Body text, descriptions |
| 500/600 | `.font-gilroy-medium` | Secondary content |
| 800 | `.font-gilroy-bold` | Emphasis, labels |

```css
/* Light */
.font-gilroy-light {
  font-family: "Gilroy", sans-serif;
  font-weight: 300;
}

/* Medium */
.font-gilroy-medium {
  font-family: "Gilroy", sans-serif;
  font-weight: 500;
}

/* Bold */
.font-gilroy-bold {
  font-family: "Gilroy", sans-serif;
  font-weight: 800;
}
```

#### 3. **Dimensions** (Accent - Semi-Bold)
- **Font File**: `dimensions-600.otf`
- **Weight**: 600
- **CSS Class**: `.font-dimensions-semi-bold`
- **Usage**: Special labels, badges

```css
.font-dimensions-semi-bold {
  font-family: "Dimensions", sans-serif;
  font-weight: 600;
}
```

### Font Sizes

| Size | Context | Example |
|------|---------|---------|
| 7xl (56px) | Page titles | "Webinars", "Events" |
| 6xl (48px) | Section headers | "Summit Highlights" |
| 4xl-5xl (36-48px) | Subheadings | Card titles |
| 2xl-3xl (28-30px) | Content headers | Countdown labels |
| xl (20px) | Navigation | Nav items |
| lg (18px) | Event descriptions | Card content |
| base (16px) | Body text | Descriptions |
| sm (14px) | Labels, buttons | Button text, small info |
| xs (12px) | Tiny text | Badges, labels |

### Text Colors

- **Dark Text**: `#000000` (Pure black)
- **Blue Text**: `#3b82f6` - `#2563eb` (Primary)
- **Gray Text**: `#4b5563` - `#6b7280` (Secondary)
- **White Text**: `#ffffff` (On dark backgrounds)

---

## Logo & Visual Identity

### Logo Specifications
- **Primary Logo**: Kerala Startup Mission logo
- **IEDC Logo**: IEDC Kerala branding
- **Format**: SVG/PNG
- **Color**: Full color on white, white on dark

### Decorative Elements

#### Grid/Blocks Pattern
- **File**: `/hero-blocks.png`
- **Usage**: Bottom sections, page dividers
- **Color**: Multi-colored gradient blocks
- **Size**: Full width, variable height (80-96px)

#### Ellipse Pattern
- **File**: `/Ellipse3.svg`
- **Usage**: Background decoration
- **Color**: Gradient ellipse
- **Placement**: Behind hero content

#### Side Decorations
- **File**: `/side_image.png`
- **Usage**: Card overlays, visual accents
- **Placement**: Right side of components

### Color Blocking

Event/Session color scheme for visual differentiation:
- **Row 1**: Purple (#6495FD), Green (#16a34a), Pink (#E91E63)
- **Row 2**: Orange (#FF9800), Cyan (#2FEEC4), Blue (#2563eb)
- **Color count**: 6-8 distinct colors for events

---

## Button & Component Styles

### Primary Buttons (CTAs)

```css
/* Register Now Button */
background: linear-gradient(to right, #6d28d9, #7c3aed);
color: white;
font-family: "ClashDisplay", sans-serif;
font-weight: semibold;
border-radius: 12px;
padding: 12px 20px;
transition: background 0.3s ease;

/* Hover */
background: linear-gradient(to right, #5b21b6, #6d28d9);
```

**States:**
- **Default**: Violet gradient (`#6d28d9` → `#7c3aed`)
- **Hover**: Darker violet (`#5b21b6` → `#6d28d9`)
- **Active**: Pure violet
- **Disabled**: Gray (`#9ca3af`)

### Secondary Buttons

```css
/* Events/Options */
background: #2563eb;
color: white;
border-radius: 8px;
padding: 8px 12px;
font-size: 12px;
transition: opacity 0.3s ease;

/* Hover */
opacity: 1;
background: #1d4ed8;
```

### Event Card Buttons

**Register Now (Active)**
- Background: Black (`#000000`)
- Opacity: 90% (normal), 100% (hover)
- Width: 112px, Height: 28px

**Register Now (Disabled)**
- Background: Gray (`#9ca3af`)
- State: No interaction
- Text: "REGISTRATIONS CLOSED" / "REGISTER SOON"

**Join Now (Active)**
- Background: Green (`#16a34a`)
- Text: "JOIN NOW"
- Only enabled during live event

**Join Now (Disabled)**
- Background: Gray (`#d1d5db`)
- Text: "JOIN SOON"
- Cursor: not-allowed

### Button Sizing

| Context | Width | Height | Font Size | Padding |
|---------|-------|--------|-----------|---------|
| Event Card | 112px | 28px | xs (12px) | 6px 12px |
| Page Button | 200px | 44px | lg (18px) | 12px 20px |
| Navigation | 160px | 40px | base (16px) | 10px 16px |
| Small Button | 96px | 28px | xs (12px) | 6px 12px |

---

## Spacing & Layout

### Container & Padding

| Element | Padding | Margin |
|---------|---------|--------|
| Page Section | px-5 md:px-8 lg:px-12 | py-[10vh] md:py-[12vh] |
| Card Content | p-6 | mb-4 |
| Hero Section | pt-24 pb-20 | - |
| Footer | py-12 md:py-16 | - |

### Gap & Spacing Units

- **xs**: 4px (0.5)
- **sm**: 8px (1)
- **md**: 12px (3)
- **lg**: 16px (4)
- **xl**: 24px (6)
- **2xl**: 32px (8)

### Grid Layouts

**Event Cards Grid:**
```
Desktop: 3 columns (lg:grid-cols-3)
Tablet: 2 columns (md:grid-cols-2)
Mobile: 1 column (grid-cols-1)
Gap: 24px (gap-6)
```

**Stats Grid:**
```
Grouped in 3 sections
4 items per section
Mobile-responsive stacking
```

---

## Animation & Effects

### Keyframe Animations

#### 1. Fade In Down
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}
```

#### 2. Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}
```

#### 3. Slide In Right
```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out 0.3s both;
}
```

#### 4. Slide In Left
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out 0.3s both;
}
```

#### 5. Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out 0.4s both;
}
```

### Animation Timing

| Animation | Duration | Delay | Easing |
|-----------|----------|-------|--------|
| fadeInDown | 0.8s | 0s | ease-out |
| fadeInUp | 0.8s | 0.2s | ease-out |
| slideInRight | 0.8s | 0.3s | ease-out |
| slideInLeft | 0.8s | 0.3s | ease-out |
| scaleIn | 0.8s | 0.4s | ease-out |
| bounce-slow | 3s | - | ease-in-out |

### Scroll-Based Animations

```css
.fade-in-up-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-up-hidden {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
```

### Marquee Effect

For long event titles:
- **Threshold**: 90% of container width
- **Animation Duration**: 15s linear infinite
- **Direction**: Left to right (continuous loop)

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.marquee-text {
  display: inline-block;
  padding-right: 100%;
  animation: marquee 15s linear infinite;
  white-space: nowrap;
}
```

### Motion Library Settings

**Motion/Framer-Motion Configuration:**
```javascript
// Spring animation settings
stiffness: 260
damping: 20

// Used for carousel and gallery animations
```

---

## Code Implementation

### Tailwind CSS Custom Classes

```tailwindcss
@layer utilities {
  /* Font Families */
  .font-clash-display {
    font-family: "ClashDisplay", sans-serif;
  }

  .font-gilroy-light {
    font-family: "Gilroy", sans-serif;
    font-weight: 300;
  }

  .font-gilroy-medium {
    font-family: "Gilroy", sans-serif;
    font-weight: 500;
  }

  .font-gilroy-bold {
    font-family: "Gilroy", sans-serif;
    font-weight: 800;
  }

  .font-dimensions-semi-bold {
    font-family: "Dimensions", sans-serif;
    font-weight: 600;
  }

  /* Animations */
  .animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out 0.3s both;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out 0.3s both;
  }

  .animate-scale-in {
    animation: scaleIn 0.8s ease-out 0.4s both;
  }

  /* Scroll animations */
  .fade-in-up-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .fade-in-up-hidden {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
}
```

### Color Utility Reference

**Primary Colors:**
```
text-blue-500        → Headlines
text-blue-600        → Primary buttons, accents
text-blue-400        → Secondary text, labels
bg-blue-600          → Button backgrounds
bg-blue-500          → Hover states
```

**Component Colors:**
```
text-white           → On dark backgrounds
bg-gray-900          → Footer
bg-gray-400          → Disabled elements
bg-green-600         → Success/Active states
```

### Common Component Classes

**Event Card:**
```jsx
className="w-full max-w-80 mx-auto h-[375px] relative 
  bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] 
  outline-2 outline-blue-600/75 overflow-hidden"
```

**Primary Button:**
```jsx
className="px-8 lg:px-12 py-3 lg:py-4 rounded-[29px] 
  relative overflow-hidden group inline-block 
  bg-violet-600 hover:bg-violet-800 transition-all"
```

**Hero Section:**
```jsx
className="w-full min-h-screen bg-white relative overflow-hidden pt-24 pb-20"
```

---

## Design Tokens Summary

### Quick Reference Table

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | #3b82f6 (Blue 500) | Main brand color |
| Secondary Color | #2563eb (Blue 600) | Active/Hover states |
| Accent Color | #6d28d9 (Violet 600) | CTAs, important elements |
| Success Color | #16a34a (Green 600) | Active events, status |
| Error Color | #dc2626 (Red 600) | Validation, errors |
| Background | #ffffff (White) | Page backgrounds |
| Dark Background | #111827 (Gray 900) | Footer |
| Border Color | #e5e7eb (Gray 200) | Dividers |
| Text Primary | #000000 (Black) | Headlines, body |
| Text Secondary | #4b5563 | Secondary content |
| Border Radius | 8px - 29px | Components |
| Shadow | rgba(37,99,235,0.25) | Cards |
| Font Family (Display) | "ClashDisplay" | Headlines |
| Font Family (Body) | "Gilroy" | Body text |

---

## Implementation Checklist

- [ ] All fonts loaded from `/src/fonts/` directory
- [ ] Color hex codes verified against brand standards
- [ ] Animations tested on all devices
- [ ] Scrollbar styling applied globally
- [ ] Button states (hover, active, disabled) working
- [ ] Responsive breakpoints tested
- [ ] Accessibility contrast ratios verified
- [ ] Loading animations implemented
- [ ] Error states designed
- [ ] Success states designed

---

**Last Updated**: November 8, 2025  
**Version**: 1.0  
**Status**: Active
