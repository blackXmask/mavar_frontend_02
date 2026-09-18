# MAVAR — Autonomous Intelligence Platform

A modern React + Vite + Tailwind CSS frontend for the MAVAR autonomous intelligence platform.

**Live Demo:** [mavar-frontend-02.vercel.app](https://mavar-frontend-02.vercel.app)

## Features

- 🤖 **Autonomous Agents** — Recon, Web Hunter, OSINT, and Security agents
- 🎯 **Mission Planning** — Create and manage reconnaissance missions
- 📊 **Real-time Dashboard** — Live agent activity and mission progress
- 🔍 **Intelligence Feed** — CVE, TTP, and IOC threat intelligence
- 🛠️ **Tool Engine** — Recon, Deep Search, Deep Crawl, Security, and Development tools
- 📜 **Mission History** — Track all completed and failed missions

## Tech Stack

- **React 18** — UI framework
- **Vite 8** — Build tool and dev server
- **Tailwind CSS 3** — Styling
- **Zustand** — State management
- **TypeScript** — Type safety
- **Lucide React** — Icons

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
cd mavar-ui
npm install
```

### Development

```bash
npm run dev
```

The dev server runs on http://localhost:5173 (or next available port)

### Build

```bash
npm run build
```

Output in `dist/` folder.

### Preview

```bash
npm run preview
```

## Project Structure

```
mavar-ui/
├── src/
│   ├── components/
│   │   ├── pages/         # Page components (Overview, History, Agents, etc.)
│   │   ├── primitives.tsx # Reusable UI components
│   │   └── ...            # Layout components (Sidebar, TopBar, etc.)
│   ├── data/              # Mock data and configurations
│   ├── store/             # Zustand store
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind styles
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

## Pages

- **Overview** — Workspace overview with metrics and execution pipeline
- **Missions** — Mission dashboard with active agents and recent missions
- **History** — Mission history with search and filter
- **Agents** — Agent management and status
- **Intelligence** — Threat intelligence and findings
- **Tools** — Tool execution engine
- **Logs** — System logs
- **Settings** — Platform settings

## License

Private repository.
