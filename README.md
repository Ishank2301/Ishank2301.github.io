# Ishank Mishra — Portfolio

This Vite + React portfolio is configured to deploy only to GitHub Pages.

## Publish to GitHub Pages

1. Push this project to the `main` branch of the `Ishank2301/Ishank2301.github.io` repository.
2. In GitHub, open **Settings → Pages** for the repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The `Deploy portfolio to GitHub Pages` workflow runs on every push to `main`. Once it succeeds, the site is live at `https://ishank2301.github.io/`.

## Local development

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build locally. The `dist` folder is generated and intentionally not committed; GitHub Actions builds and publishes it for Pages.
