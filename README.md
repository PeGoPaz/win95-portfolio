# Win95 Portfolio

A personal portfolio built with a Windows 95-style desktop experience using React, TypeScript, Vite, and React95.

## Features

- Desktop-like UI with draggable windows
- Taskbar + start menu interactions
- Built-in app windows (Resume, Contact, Browser, Game, Music Player)
- Startup screen with retro loading sequence and sound
- Clippy assistant integration

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- `@react95/core`, `@react95/icons`, `@react95/clippy`

## Getting Started

### Prerequisites

- Node.js 
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` – start development server
- `npm run lint` – run ESLint
- `npm run build` – type-check and build for production
- `npm run preview` – preview the production build

## Project Structure

```text
src/
  components/    # UI components (windows, taskbar, startup, apps)
  store/         # Zustand state (window open/close state)
  utils/         # helper hooks/utilities
  assets/        # images, sounds, music
```

## Build for Production

```bash
npm run build
npm run preview
```

## License

This project is private unless you choose to publish it with a license.
