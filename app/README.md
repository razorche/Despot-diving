# Despot Dock Nav (React + shadcn struktura)

Apple-style **dock navbar** prilagođen **Despot Ronilački Klub** (Budva, ronjenje).

## Stack

- Vite + React 19 + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- shadcn konvencija: `components.json`, `@/lib/utils`, **`components/ui/`**

### Zašto `components/ui/`?

shadcn CLI i ekosistem očekuju UI primitive u **`src/components/ui`**. Tu leže deljeni komponenti (`dock.tsx`, kasnije `button`, `dialog`…). Biznis komponente idu u `src/components/` (npr. `DespotDockNav.tsx`).

Ako nisi koristio CLI, struktura je već postavljena — za nove komponente:

```bash
cd app
npx shadcn@latest init   # samo ako menjaš postojeći projekat
npx shadcn@latest add button
```

## Pokretanje

Terminal 1 — statički sajt (linkovi iz dock-a):

```bash
npm run serve
```

Terminal 2 — dock preview:

```bash
npm run dev:app
```

Otvori http://localhost:5173

Opciono `.env`:

```env
VITE_WWW_BASE=http://localhost:3000
```

## Fajlovi

| Fajl | Uloga |
|------|--------|
| `src/components/ui/dock.tsx` | Dock (framer-motion) |
| `src/components/DespotDockNav.tsx` | Ronilačka navigacija + linkovi na `www/` |
| `src/components/icons/DespotMark.tsx` | SVG maska (brend) |

## Integracija u ceo sajt

1. **Brzo:** build `app` → embed `<div id="root">` + script u jednu HTML stranicu, ili iframe.
2. **Dugoročno:** migrirati `www/` u React (Next/Vite) i koristiti `<DespotDockNav />` kao globalni layout.
