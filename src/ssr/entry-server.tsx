import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async/lib/types';
import { StaticRouter } from 'react-router-dom/server';
import { App } from '../App';

export function render(url: string): {
  appHtml: string;
  headTags: string;
  htmlAttributes: string;
} {
  const helmetContext: { helmet?: HelmetServerState } = {};

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
