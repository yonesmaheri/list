# List Management App

A small list management app built with React, TypeScript, Zustand, Tailwind CSS, and Framer Motion. 
Users can add, edit, delete items with animations and forms validated with React Hook Form & Zod.

## Features
- Add, edit, delete items
- Animated list using Framer Motion
- Form validation with React Hook Form & Zod
- State management with Zustand
- Toast notifications
- Responsive design with Tailwind CSS

## Tech Stack
- React 18 + TypeScript
- Zustand (State Management)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Hook Form + Zod (Forms & Validation)
- Sonner (Toast Notifications)

## Getting Started
1. Clone the repo:
   git clone https://github.com/yourusername/list-management-app.git
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open http://localhost:5173 in your browser

## Project Structure
- src/components → Reusable UI components
- src/hooks → Custom hooks (useItemStore)
- src/types → TypeScript types
- src/App.tsx → Main app component

- Form reset & prefill for editing items
- AnimatePresence for list animations
- Toast messages for actions
