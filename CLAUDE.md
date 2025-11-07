# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application built with TypeScript, React 19, and Tailwind CSS 4. The application is a user management system ("Sistema de Gestión de Usuarios") with Spanish language UI.

## Development Commands

### Running the application
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Next.js App Router Structure

The project uses Next.js App Router (not Pages Router) with the following structure:

- `app/` - Main application directory
  - `layout.tsx` - Root layout with Navbar component and Geist fonts
  - `page.tsx` - Home page (landing page with navigation cards)
  - `globals.css` - Global Tailwind CSS styles
  - `components/` - Shared React components
  - `api/` - API route handlers
  - `usuarios/` - User management feature pages

### Data Management Pattern

**In-memory data storage**: The application uses an in-memory array in `app/api/usuarios/route.ts` to store user data. This means:
- Data resets on server restart
- Not suitable for production without migrating to a database
- The `usuarios` array is defined at module level and shared across requests

### API Routes

API routes follow Next.js 16 Route Handler conventions in `app/api/`:

- `GET /api/usuarios` - Returns all users
- `POST /api/usuarios` - Creates a new user with auto-incremented ID

API handlers are defined in `route.ts` files using named exports (`GET`, `POST`, etc.).

### Type Definitions

The `Usuario` interface is defined in `app/api/usuarios/route.ts`:
```typescript
interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
}
```

When creating new components that use this type, import it from the API route file.

### Client vs Server Components

- **Server Components** (default): `app/layout.tsx`, `app/page.tsx`
- **Client Components** (`"use client"`):
  - `app/usuarios/page.tsx` - Uses hooks for data fetching
  - `app/usuarios/crear/page.tsx` - Uses forms and router
  - `app/components/Navbar.tsx` - Uses `usePathname` for active state

Use `"use client"` directive when you need:
- React hooks (useState, useEffect, etc.)
- Browser APIs
- Event handlers
- useRouter or usePathname

### Styling Conventions

- Uses Tailwind CSS 4 with dark mode support
- Dark mode classes follow pattern: `bg-white dark:bg-zinc-800`
- Color palette centers on zinc (neutral) with blue/green accents
- Responsive design with `sm:`, `md:`, `lg:` breakpoints
- Custom fonts: Geist Sans and Geist Mono via `next/font/google`

### Path Aliases

TypeScript is configured with `@/*` alias pointing to the root:
```json
"paths": { "@/*": ["./*"] }
```

However, current code uses relative imports. Either approach is valid.

## Language

All UI text, component names, and variables use Spanish:
- `usuarios` (users)
- `nombre` (name)
- `apellido` (last name)
- `edad` (age)
- `crear` (create)
- `consultar` (query/view)

Maintain Spanish naming for user-facing features and Spanish comments where appropriate.

## Key Implementation Patterns

### Form Handling
Forms in this app use controlled components with useState:
```typescript
const [formData, setFormData] = useState({ nombre: "", apellido: "", edad: "" });
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### Data Fetching
Client components fetch from API routes using native fetch:
```typescript
const response = await fetch("/api/usuarios");
const data = await response.json();
```

### Navigation
- Use `next/link` for navigation between pages
- Use `useRouter()` from `next/navigation` for programmatic navigation
- Use `usePathname()` to determine active navigation state
