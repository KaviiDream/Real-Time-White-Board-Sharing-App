# Frontend

Vite drives both the dev server and production build for the React whiteboard UI.

## Scripts

- `npm run dev` – starts Vite through Nodemon (helpful when tweaking `vite.config.js`)
- `npm run build` – generates an optimized bundle in `dist`
- `npm run preview` – serves the production bundle locally
- `npm test` – runs Vitest + Testing Library in watch mode

## Folder layout

- `src/` – React codebase
- `public/` – static assets copied as-is (favicons, manifest, etc.)
- `index.html` – Vite entry template; keep the `#root` div in place

## Development flow

1. `npm install`
2. `npm run dev`
3. Visit [http://localhost:5173](http://localhost:5173) and start building

Vite handles HMR, while Nodemon restarts the dev server only when tooling files (e.g., `vite.config.js`) change.
