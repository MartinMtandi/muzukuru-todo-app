# Muzukuru Todo App

A modern, full-featured **todo / task-tracking** web application built with React, TypeScript, Tailwind CSS and Vite.

## 🌐 Live Demo

[https://martinmtandi.github.io/muzukuru-todo-app](https://martinmtandi.github.io/muzukuru-todo-app)

---

## 🧰 Tech Stack

| Layer | Library / Tool | Why it was chosen |
|-------|----------------|-------------------|
| Build & Dev | **Vite 5** | Ultra-fast dev server, instant HMR, first-class TS & React support |
| UI library | **React 18** + **TypeScript 5** | Widely adopted SPA framework with static typing for safety |
| Styling | **Tailwind CSS 3** | Utility-first classes → rapid styling & design-token workflow |
| Component styling | **Styled-Components 6** | Scoped, dynamic styles for complex components |
| Headless UI | **Radix UI Primitives** | Accessible, unstyled building blocks (Skeleton, Toast, etc.) |
| Icons | **Lucide-React** | Lightweight, tree-shakable open-source icon set |
| Forms & Validation | **React-Hook-Form** + **Zod** | Performant uncontrolled forms with schema validation |
| Data layer | React **Context API** + service wrapper | Simple global state without additional libs |
| Testing (planned) | **Vitest** + **Testing-Library** | Fast, Vite-native test runner |
| Lint / Format | ESLint, Prettier | Consistent code style & CI quality gates |

## 🏗️  Project Architecture

```
└─ src/
   ├─ app/            # (future) route layout files
   ├─ components/     # Reusable presentational & domain components
   ├─ components/ui/  # Radix based UI primitives
   ├─ contexts/       # Global state providers (TodoContext)
   ├─ hooks/          # Reusable logic (use-mobile, use-toast…)
   ├─ pages/          # Route pages (Index, NotFound)
   ├─ services/       # API / persistence layer (todoApi)
   ├─ lib/            # Utilities (cn class-merger)
   └─ index.css       # Tailwind directives
```

Key points:

*   **Domain-driven slices** – components/contexts/services keep related logic colocated.
*   The mock API lives in `src/services/todoApi.ts`; swap for real backend later without touching UI.
*   Global state handled via `useReducer` for predictability; async actions mirrored with START / SUCCESS / ERROR types.

## 🚀  Getting Started

1. **Clone & install**
   ```bash
   git clone <repo-url>
   cd Muzukuru\ Todo\ App
   npm install
   ```

2. **Start dev server**
   ```bash
   npm run dev
   ```
   Open the printed localhost URL (defaults to `8080`). HMR will reload on save.

3. **Build for production**
   ```bash
   npm run build      # bundles to dist/
   npm run preview    # serves the static build
   ```

## ✨  Current Features

- Add, edit, complete/uncomplete, and delete tasks
- Filter by **All / Active / Completed**
- Bulk **Clear completed** action
- Persistent storage via **localStorage** (with simulated network latency)
- Skeleton loaders & toast notifications for smooth UX
- Responsive, mobile-friendly layout with CSS variables theming
- Accessible components (keyboard navigation, ARIA)

## 🛣️  Roadmap / Future Improvements

- 🌐 Replace localStorage API with real REST / GraphQL backend
- 🧩 Introduce **TanStack Query** for caching & optimistic updates
- 🔄 Drag-and-drop re-ordering of tasks (e.g. dnd-kit)
- 📱 PWA support – installable & offline-first
- 🌓 Dark / light theme toggle
- 🔒 Authentication → multi-user task lists & cloud sync
- 🧪 Unit & integration tests with Vitest + React Testing Library
- 📊 Analytics & performance budgets

Contributions are welcome – feel free to open issues or PRs! 🚀

---

## 👤 Author

**Martin Mtandi**  
WhatsApp: +27 78 385 9589  
Phone: +263 715 518 166
