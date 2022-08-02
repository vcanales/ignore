import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';


export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        // This is needed to make sure that the qwik import is resolved to the qwik
        // package and not to the qwik import in the current project.
        qwik: '@builder.io/qwik',
        'express-useragent': '../../node_modules/express-useragent',
      }
    },
    plugins: [
      qwikVite(),
    ],
  };
});
