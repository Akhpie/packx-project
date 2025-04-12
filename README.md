# PackX - 3D Interactive Packaging Experience

## Overview

PackX is a modern web application that showcases packaging solutions through an interactive 3D experience. The application offers a comprehensive suite of packaging solutions, sustainability initiatives, case studies, and an immersive 3D environment where users can explore different packaging options.

## Features

- **Interactive 3D Experience**: Explore a virtual factory environment with first-person controls
- **Product Showcase**: View different packaging solutions with detailed 3D models
- **Innovation Lab**: Discover cutting-edge packaging technologies
- **Sustainability Section**: Learn about environmentally friendly packaging solutions
- **Case Studies**: Examine real-world applications of packaging solutions
- **Contact Form**: Get in touch with the PackX team

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Three.js**: 3D rendering
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber
- **Framer Motion**: Animation library
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/` - Source code
  - `assets/` - Static assets like images and 3D models
  - `components/` - React components
    - `pages/` - Main page components
    - `scene/` - 3D scene components
    - `ui/` - Reusable UI components
  - `lib/` - Utility functions and configurations
  - `routes/` - Application routing
  - `types/` - TypeScript type definitions

## Usage

- Use WASD or arrow keys for movement in the 3D experience
- Navigate through the site using the top navbar
- Explore different packaging options in the Solutions section
- Visit the Experience page for an immersive 3D demonstration

## Building for Production

```
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```
npm run preview
```
