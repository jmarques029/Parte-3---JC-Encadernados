# Frontend Infrastructure - JC Encadernados

## Overview
This document describes the frontend infrastructure created for the JC Encadernados book management system.

## Directory Structure

```
src/
├── assets/                      # Static assets (logos, images)
├── components/
│   ├── BookForm/               # Form for creating/editing books
│   ├── Footer/                 # Footer component
│   ├── Header/                 # Header with navigation
│   ├── MainDetalhes/          # Book details page layout
│   ├── MainIndex/             # Homepage book grid layout
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── table.tsx
│       └── sonner.tsx
├── context/
│   └── AuthContext.tsx         # Authentication context
├── lib/
│   └── utils.ts                # Utility functions (cn)
└── styles/
    └── colors.ts               # Color palette

```

## Components

### 1. AuthContext (`src/context/AuthContext.tsx`)
- Provides authentication state across the app
- Functions: `login()`, `register()`, `logout()`
- Persists user to localStorage
- Uses User entity type from domain
- Integrates with makeUserUseCases factory

**Usage:**
```tsx
import { useAuth } from '@/context/AuthContext';

const { user, login, logout } = useAuth();
```

### 2. Header (`src/components/Header/`)
- Displays JC Encadernados branding
- Shows user name when logged in
- Navigation: Empréstimos link, Logout button
- Login link when not authenticated
- Uses styled-components with brown bookbinding theme

### 3. Footer (`src/components/Footer/`)
- Simple footer with copyright
- Styled with styled-components

### 4. MainIndex (`src/components/MainIndex/`)
- Grid layout for homepage book display
- Responsive grid: `repeat(auto-fill, minmax(250px, 1fr))`
- Book cards with hover effects
- Styled components for: BooksGrid, BookCard, BookImage, BookInfo, etc.

### 5. MainDetalhes (`src/components/MainDetalhes/`)
- Two-column layout for book details page
- Left: Book image
- Right: Title, author, binding type, pages, cover type, price
- Action buttons: Back and Borrow
- Responsive design (stacks on mobile)

### 6. BookForm (`src/components/BookForm/`)
- Form for creating/editing books
- Fields:
  - Title (text)
  - Author (text)
  - Binding Type (select: HARDCOVER, SOFTCOVER, SPIRAL)
  - Pages (number)
  - Cover Type (select: LEATHER, CLOTH, PAPER)
  - Price (number)
  - Image URL (url)
- Exports `BookInterface` type for use in other components

**BookInterface:**
```typescript
interface BookInterface {
  id?: string;
  title: string;
  author: string;
  bindingType: 'HARDCOVER' | 'SOFTCOVER' | 'SPIRAL';
  pages: number;
  coverType: 'LEATHER' | 'CLOTH' | 'PAPER';
  price: number;
  imageUrl: string;
}
```

### 7. shadcn/ui Components (`src/components/ui/`)
Reusable UI components following shadcn/ui patterns:
- **button.tsx**: Button component with variants (default, destructive, outline, secondary, ghost, link)
- **card.tsx**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **dialog.tsx**: Modal dialog components
- **input.tsx**: Form input component
- **label.tsx**: Form label component
- **table.tsx**: Table components (Table, TableHeader, TableBody, TableRow, TableCell, etc.)
- **sonner.tsx**: Toast notification component

## Styling

### Color Palette (`src/styles/colors.ts`)
```typescript
{
  primary: "#8B4513",      // Brown (bookbinding theme)
  secondary: "#D2691E",    // Chocolate
  black: "#000000",
  white: "#FFFFFF",
  lightBg: "#F5F5F5",
  lightText: "#666666",
  darkBg: "#1A1A1A",
  darkText: "#E0E0E0",
}
```

### Utilities (`src/lib/utils.ts`)
- `cn()` function for merging Tailwind classes
- Uses `clsx` and `tailwind-merge`

## Dependencies Installed

### Production
- `styled-components` - CSS-in-JS styling
- `@radix-ui/react-slot` - Radix UI slot component
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-label` - Form labels
- `class-variance-authority` - CSS variant management
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging
- `sonner` - Toast notifications
- `next-themes` - Theme management

### Development
- `@types/styled-components` - TypeScript types

## Next Steps

### 1. Add Assets
Place your logo and book images in `src/assets/` directory.

### 2. Wrap App with AuthProvider
Update your root layout to include the AuthProvider:

```tsx
// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 3. Create Pages
- Homepage: Display books using MainIndex components
- Book details: Use MainDetalhes components
- Admin pages: Use BookForm for CRUD operations
- Loans page: Use Table component for loan management

### 4. Integration
All components are ready to integrate with your domain entities (Book, User, Loan) and use cases through the factory functions.

## Notes
- All components use TypeScript with proper typing
- Components follow Next.js 14 App Router conventions
- Styled-components work alongside Tailwind CSS
- Book-related terminology adapted from vinyl references
- Brown color scheme reflects bookbinding theme
