# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js personal homepage/blog using the Pages Router. Route files live in `pages/`, with dynamic content pages under `pages/blog/[id].js`, `pages/note/[id].js`, and `pages/project/[id].js`. Shared UI belongs in `components/`, grouped further in `components/post-block/` for post cards. Markdown content is organized by type in `contents/blog/`, `contents/note/`, `contents/paper/`, and `contents/project/`. Static assets are in `public/`; cover images should mirror content type and slug, for example `contents/blog/git-frequent-operations.md` pairs with `public/cover/blog/git-frequent-operations.png`. Markdown parsing and post metadata utilities live in `utils/post-data.js`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js development server at `http://localhost:3000`.
- `npm run build`: create a production static export using `next build`.
- `npm run start`: run `next start`; exported deployments should serve the generated `out/` directory with a static host.
- `npm run lint`: run the configured Next.js ESLint checks.

There is currently no dedicated test script. Use `npm run lint` and `npm run build` as the minimum validation before submitting changes.

## Coding Style & Naming Conventions

Use JavaScript/TypeScript with React functional components. Follow the existing style: single quotes for imports and strings in source files, semicolon-free statements, and Tailwind utility classes for layout and styling. Keep component filenames lowercase with hyphens, such as `recent-post.js`; route names should match URL slugs. Content filenames should be stable, lowercase slugs when possible, because filenames become route IDs.

## Content Guidelines

Markdown posts must include front matter with at least `title`, `tags`, and `date`; use the existing files in `contents/blog/` as examples. Keep cover image filenames identical to the Markdown slug so `utils/post-data.js` can discover them automatically. Store inline article images in `public/img/` and reference them with root-relative paths.

## Testing Guidelines

No testing framework or coverage threshold is configured. For UI or content changes, manually verify affected routes in `npm run dev`. For parser, routing, or build configuration changes, run both `npm run lint` and `npm run build`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `add links` or `update ubuntu-dev-env`. Keep commits focused and describe the changed area first when useful. Pull requests should include a concise description, validation performed, linked issue if any, and screenshots for visible UI or content layout changes.
