// @ts-check
import { defineConfig } from 'astro/config';

// Desktop-only prototype of pointspace.ca (static output, no backend).
export default defineConfig({
  site: 'https://www.pointspace.ca',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
