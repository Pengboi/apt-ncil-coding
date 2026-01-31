This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## "Every Pokémon" Site

This project now includes a small Pokédex-style site that lists Pokémon and shows details (data comes from PokeAPI).

Run the dev server and open http://localhost:3000 to browse every Pokémon:

```bash
npm run dev
```

Click any entry to view details and stats.

TCG API key
---------------

If you want the app to fetch Pokémon TCG cards, create a local `.env.local` file in the project root with your Pokémon TCG API key:

```env
POKEMON_TCG_KEY=your_api_key_here
```

I added a local `.env.local` for development (ignored by git) with the key you provided. The app proxies TCG requests through `/api/tcg/cards` so the key stays server-side.
