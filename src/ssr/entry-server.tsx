import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { App } from '../App';

interface HelmetOutput {
  title: { toString: () => string };
  meta: { toString: () => string };
  link: { toString: () => string };
  script: { toString: () => string };
  htmlAttributes: { toString: () => string };
}

export function render(url: string): {
  appHtml: string;
  headTags: string;
  htmlAttributes: string;
} {
  const helmetContext: { helmet?: HelmetOutput } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const headTags = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString()
      ].join('\n')
    : '';

  const htmlAttributes = helmet ? helmet.htmlAttributes.toString() : '';

  return { appHtml, headTags, htmlAttributes };
}
