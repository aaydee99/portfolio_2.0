# abdullahakhtar.dev

Personal portfolio built with Next.js 15 (App Router), React 19 and TypeScript, styled as a code editor.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production build
```

## Deploy

Push the folder to a GitHub repository and import it on [Vercel](https://vercel.com/new). No environment variables are needed. The page is fully static, so any Next.js host works.

## Editing content

All personal content lives in `lib/data.ts`:

- `PROFILE`: name, contact details, tagline
- `ROLES`: titles cycled by the hero typewriter
- `REPOS` and `PUBLIC_REPOS`: projects; add a repo name to `PUBLIC_REPOS` to make it link to GitHub
- `RELEASES`: experience and education timeline
- `SKILL_GROUPS`, `DEPS`, `BARS`, `STATS`, `TECH`: skills sections
- `MUSIC`: set `src` to a file in `public/` (e.g. `"/music.mp3"`) to play a real track instead of the generated lo-fi loop

The resume download is `public/resume.pdf`.

## Structure

```
app/            layout (fonts, metadata), page, global styles, icon
components/     Shell (top bar, explorer, tabs, status bar), Hero, Orb (canvas),
                Ticker, About, Stack, Work, Experience, Terminal, Contact,
                Music, Palette (⌘K), Icons
lib/            data.ts (content), music.ts (Web Audio player)
public/         resume.pdf
```
