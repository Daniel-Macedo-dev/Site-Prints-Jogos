# Prints de Jogos — Frontend

A React single-page application for sharing and browsing game screenshots. Users can browse a public gallery, create an account, log in, and upload their own images.

**Backend repository:** [Daniel-Macedo-dev/upload-api](https://github.com/Daniel-Macedo-dev/upload-api)

---

## Features

- **Public gallery** — browse all uploaded game screenshots with filters, search, and sort
- **Search & filter** — filter by game title, uploader username, or free-text search; sort by newest, oldest, or alphabetical
- **Gallery modal** — full-size image viewer with keyboard navigation (← → Esc) and position counter
- **Login / Signup** — JWT-based authentication against the Spring Boot backend
- **Authenticated upload** — image upload with instant preview, real-time progress bar, and client-side validation (image type, 10 MB limit)
- **Auto gallery refresh** — gallery reloads automatically after a successful upload
- **Mock fallback** — gallery renders sample data if the API is unreachable, so the UI is always browsable

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router v6 |
| HTTP | Axios |
| Styling | Custom CSS (no UI framework) |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Project structure

```
src/
  api.js              # API_BASE constant and shared error helper
  App.jsx             # Root layout, routes, auth state
  main.jsx            # React entry point
  components/
    Navbar.jsx        # Top navigation bar
    Login.jsx         # Login form
    Signup.jsx        # Registration form
    Upload.jsx        # Image upload form with preview and progress
    Gallery.jsx       # Filtered gallery grid and image modal
    Footer.jsx        # Footer
  pages/
    HomePage.jsx      # Home: upload (if logged in) + gallery
    AuthPage.jsx      # Auth: login and signup side by side
  styles/
    main.css          # All CSS — variables, components, utilities
```

---

## Environment setup

Copy `.env.example` to `.env.local` and adjust the API URL if needed:

```bash
cp .env.example .env.local
```

```env
# .env.local
VITE_API_URL=http://localhost:8080
```

`VITE_API_URL` is the base URL of the Spring Boot backend. The default points to localhost for local development. For a deployed frontend, set this to your production API URL.

---

## Running locally

**Prerequisites:** Node.js 18+, npm

**1. Start the backend first**

Clone and run [Daniel-Macedo-dev/upload-api](https://github.com/Daniel-Macedo-dev/upload-api) so it is available at `http://localhost:8080`.

**2. Install frontend dependencies**

```bash
npm install
```

**3. Start the dev server**

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Testing the full flow

1. Start the backend (`http://localhost:8080`)
2. Start the frontend (`npm run dev`)
3. Open [http://localhost:5173](http://localhost:5173)
4. Go to **Login / Cadastro** and create an account
5. Log in — the upload form appears on the home page
6. Select an image, fill in the game name, and click **Enviar print**
7. The gallery refreshes automatically with the new upload
8. Click any gallery image to open the modal; use ← → to navigate, Esc to close

---

## Deployment

The project is configured for **GitHub Pages**:

```bash
npm run deploy
```

This runs `npm run build` first (`predeploy`), then publishes `dist/` to the `gh-pages` branch.

The live URL is set in `package.json` → `"homepage"`. Before deploying to production, update `VITE_API_URL` in your build environment to point to your live backend URL.

> **Note:** The backend must be hosted separately and configured with CORS to allow the GitHub Pages origin.

---

## API reference (consumed endpoints)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | No | Register a new account |
| POST | `/auth/login` | No | Log in, returns JWT token |
| GET | `/prints` | Optional | Fetch all uploaded prints |
| POST | `/prints/upload` | Bearer token | Upload an image |
