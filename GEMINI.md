# Gemini Project Context

## Project Overview

This project is a comprehensive boilerplate/template for building Back Office applications using Next.js. It is named `next-base` and is configured with a modern, robust, and scalable tech stack, emphasizing developer experience and performance.

## Key Technologies

- **Framework**: Next.js (v15) with App Router and Turbopack.
- **Language**: TypeScript.
- **UI & Styling**:
  - **Tailwind CSS**: Utility-first CSS framework.
  - **shadcn/ui**: A collection of "copy-paste" components built on Radix UI and Tailwind CSS, giving full control over code.
  - **Radix UI**: For accessible, unstyled UI primitives.
- **State Management**:
  - **TanStack Query (React Query)**: For server state management (data fetching, caching, synchronization).
  - **Zustand**: For client state management (global UI state, user session).
- **Forms & Validation**:
  - **React Hook Form**: For performant and flexible form handling.
  - **Zod**: For schema definition and validation.
- **Component Development**:
  - **Storybook**: For isolated UI component development and documentation.
- **Code Quality**:
  - **ESLint**: For code linting.
  - **Prettier**: For code formatting, with import sorting.

## Project Structure

The project follows a feature-rich structure based on the Next.js App Router.

- `app/`: Core application directory.
  - `(private)/` & `(public)/`: Route groups to separate authenticated and public routes.
  - `api/`: API route handlers.
  - `actions/`: Server Actions for mutations.
- `components/`: Reusable React components.
  - `ui/`: Base components from shadcn/ui.
  - `common/`: Project-specific shared components.
  - `page/`: Components specific to a single page/feature.
- `services/`: Contains API call logic, abstracting `fetch` or `axios` calls.
- `lib/`: Utility functions, `httpClient` setup, and Zod schemas.
- `store/`: Global client state stores (Zustand).
- `hooks/`: Custom reusable hooks.
- `docs/adr/`: Architectural Decision Records, documenting key technology choices.

## Development Scripts

Key commands from `package.json`:

- `pnpm dev`: Starts the development server with Turbopack on `http://localhost:3000`.
- `pnpm build`: Creates a production-ready build.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase.
- `pnpm format`: Formats code with Prettier.
- `pnpm type`: Runs TypeScript type checking.
- `pnpm storybook`: Starts the Storybook development server on `http://localhost:6006`.

## Architectural Decisions (from ADRs)

1.  **Zustand for Client State**: Chosen for its simplicity, minimal boilerplate, and performance (automatic render optimization) over Redux or Context API.
2.  **shadcn/ui for UI Components**: Adopted because it's not a traditional component library. It provides component code ("recipes") that are copied directly into the project, offering full ownership, control, and easy customization with Tailwind CSS.
3.  **TanStack Query for Server State**: Selected to handle asynchronous data fetching declaratively. It automates complex tasks like caching, background refetching, and request retries, cleanly separating server state from client state.
