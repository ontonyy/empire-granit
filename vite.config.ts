import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const ciBase = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/';
const base = process.env.BASE_PATH || ciBase;

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
