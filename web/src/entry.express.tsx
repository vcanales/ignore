import express from 'express';
import useragent from 'express-useragent';
import { join } from 'path';
import { fileURLToPath } from 'url';
import render from './entry.ssr';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Create an express server
 * https://expressjs.com/
 */
const app = express();

/** Add useragent middleware */
app.use(useragent.express());

/**
 * Serve static client build files,
 * hashed filenames, immutable cache-control
 */
app.use(
  '/build',
  express.static(join(__dirname, '..', 'dist', 'build'), {
    immutable: true,
    maxAge: '1y',
  })
);

/**
 * Serve static public files at the root
 */
app.use(express.static(join(__dirname, '..', 'dist'), { index: false }));

/**
 * Server-Side Render Qwik application
 */
app.get('/*', async (req, res, next) => {
  if (req.useragent.source.includes('curl')) {
    return res.send('curl requests coming soon');
  }
  try {
    // Render the Root component to a string
    const result = await render({
      stream: res,
      url: req.url,
    });

    // respond with SSR'd HTML
    if ('html' in result) {
      res.send((result as any).html);
    }
  } catch (e) {
    // Error while server-side rendering
    next(e);
  } finally {
    // Close the stream
    res.end();
  }
});

/**
 * Start the express server
 */
app.listen(8080, () => {
  /* eslint-disable */
  console.log(`http://localhost:8080/`);
});
