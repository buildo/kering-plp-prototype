# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mobile-first prototype for Kering's PLP (repricing flow) built with React, Vite, and Tailwind CSS. The project was originally created using Figma Make and exported as a code bundle.

Original Figma design: https://www.figma.com/design/udwG3uTvvrhqruRWj7HJb6/Replicate-Mobile-Home-Screen

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (default port 5173)
npm run dev

# Start dev server on custom port
npm run dev -- --port 5174

# Build for production
npm run build
```

## Architecture

### Screen Flow
The app uses a simple state-based navigation system in `App.tsx`:
- **Home screen**: Grid of tile buttons for different operations (Receiving, Sending, Repricing, etc.)
- **PrintLabels screen**: Configuration screen where user selects business date, ID format, and print mode
- **RepricingScan screen**: Scanning interface with barcode/RFID modes and SKU counter

State flows from App → PrintLabels → RepricingScan, with configuration data (date, ID format, print mode, printer status) passed down via props.

### Component Structure
- `src/app/App.tsx` - Main app with screen routing and shared state
- `src/app/components/` - Main feature components
  - `PrintLabels.tsx` - Configuration screen before scanning
  - `RepricingScan.tsx` - Main scanning interface with barcode/RFID toggle
  - Bottom sheets for date/format/mode selection
  - Dialog components for printer selection and manual SKU entry
- `src/app/components/icons/` - Custom SVG icon components (Barcode, House, Print, SquareGrid)
- `src/app/components/ui/` - shadcn/ui component library (not actively customized)

### Key Implementation Details

**Date Management**: Business date defaults to current date using `date-fns`:
```typescript
const [selectedDate, setSelectedDate] = useState(format(new Date(), "d MMMM yyyy"));
```

**Custom Icons**: The project uses custom SVG icons exported from the design system instead of Lucide icons. When adding icons, check `src/app/components/icons/` first.

**Typography**: The app uses SF Pro Display font (declared in `src/styles/fonts.css`). This is a system font on Apple platforms with fallbacks for other systems.

**Navigation Bar Pattern**: Navigation bars use absolute positioning for centered titles:
```tsx
<nav className="... relative">
  <div className="flex items-center">/* Left buttons */</div>
  <h2 className="absolute left-1/2 -translate-x-1/2">/* Centered title */</h2>
  <button>/* Right button */</button>
</nav>
```

**Print Modes**: The app supports two modes that affect UI behavior:
- "Fast print (single SKU)": Shows camera scan and "Type SKU" buttons
- "Printing list (multi SKU)": Shows "Clear All" and "Create Delivery" footer

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 4** (v4 with new @theme syntax in theme.css)
- **Radix UI** for accessible primitives
- **date-fns** for date formatting
- **Lucide React** for icons (limited use, prefer custom icons)

## Styling Conventions

- Mobile-first, designed for iPhone SE viewport
- Dark theme with `bg-[rgb(28,28,28)]` as primary background
- Gold accent color: `#A99E85` (used for CTAs and active states)
- Gray navigation bars: `bg-[#656565]`
- Consistent spacing using Tailwind utilities
- Button states: hover effects with `hover:bg-[#666666]` on gray buttons
