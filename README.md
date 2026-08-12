# Masayekh Ahammed — Developer Portfolio

A responsive, black-themed developer portfolio built with React, Vite, Tailwind CSS, Wouter, and Lucide icons.

## Pages

- `/` — Home, services, skills, and introduction
- `/about` — Education, experience, and skill matrix
- `/projects` — Project vault with local project creation and JSON import
- `/contact` — Contact form, email, phone, and social links

## Run locally

Requirements: Node.js 18+ and npm (or pnpm).

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run typecheck
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Customize the portfolio

Most personal content is grouped in the `portfolioContent` object near the top of `src/App.tsx`. Update:

- Name and initials
- Bio and location
- Email and phone number
- Social media URLs
- Education and experience
- Services and skills
- Featured projects

The Projects page also includes an in-browser add-project form and JSON import area so you can quickly add completed work while developing.

## Deploy with GitHub Pages

For a repository hosted at `https://USERNAME.github.io/REPOSITORY/`, change the `base` value in `vite.config.ts` to:

```ts
base: '/REPOSITORY/',
```

Then run:

```bash
npm run build
```

Deploy the generated `dist/` folder with GitHub Pages, or use a static hosting service such as Vercel, Netlify, or Cloudflare Pages.

## License

Use and customize this portfolio for your own personal website.