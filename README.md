# Portfolio Website

A modern, interactive portfolio website built with React, Vite, and Three.js. This project showcases my experience and skills through a visually engaging, responsive interface featuring 3D elements and animations.

**[Live Demo](https://julianmsdev-spec.github.io/portfolio/)**

## ✨ Features

- **3D Interactive Experience Timeline**: A custom timeline featuring 3D abstract representations for each career stage (Developer, Network, Satellite, Military) built with React Three Fiber.
- **Dynamic Skills Cloud**: Skill badges float in a "living cloud" animation and pop with a glow effect on hover.
- **3D Skill Categories**: Each skill category card (Software, Networking, Leadership) is topped with a unique, spinning 3D icon.
- **Responsive Design**: Fully responsive layout that adapts from a zig-zag timeline on desktop to a clean stacked view on mobile.
- **Performance Optimized**: Built with Vite for lightning-fast development and optimized production builds.

## 🛠️ Tech Stack

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Runtime**: [Bun](https://bun.sh/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/), [Drei](https://github.com/pmndrs/drei), [Three.js](https://threejs.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: CSS Modules / Vanilla CSS with Variables
- **Deployment**: [GitHub Pages](https://pages.github.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/julianmsdev-spec/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    # or
    npm install
    ```

3.  **Run the development server:**
    ```bash
    bun run dev
    # or
    npm run dev
    ```

## 📦 Deployment

This project is configured to deploy to GitHub Pages.

1.  **Build and Deploy:**
    ```bash
    bun run deploy
    # This runs `bun run build` followed by `gh-pages -d dist`
    ```

2.  **Manual Build:**
    To build the project without deploying:
    ```bash
    bun run build
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
