# my-playable-website

A playable 3D portfolio built with React Three Fiber + three.js.

The app lives in [`vas-x-machina/`](vas-x-machina/).

## Requirements

- Node.js 20+
- npm

## Run locally

```bash
cd vas-x-machina
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

Run from `vas-x-machina/`:

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Stack

- [React](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [three.js](https://threejs.org)
- [@react-three/fiber](https://r3f.docs.pmnd.rs) — React renderer for three.js
- [@react-three/drei](https://drei.docs.pmnd.rs) — R3F helpers (controls, loaders, etc.)
