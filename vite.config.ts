import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0]?.toLowerCase();
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
// User / organization pages (`<owner>.github.io`) deploy at domain root → base `/`.
// Project pages deploy at `<owner>.github.io/<repo>/` → base `/<repo>/`.
const isUserPage = !!repoName && !!repoOwner && repoName.toLowerCase() === `${repoOwner}.github.io`;
const ciBase = process.env.GITHUB_ACTIONS && repoName ? (isUserPage ? '/' : `/${repoName}/`) : '/';
const configuredBase = process.env.BASE_PATH || ciBase;
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

export default defineConfig({
  base,
  plugins: [react()],
  ssr: {
    // react-helmet-async is published as CJS; bundling it avoids Node ESM named-export runtime errors.
    noExternal: ['react-helmet-async']
  },
  build: {
    sourcemap: true
  }
});
