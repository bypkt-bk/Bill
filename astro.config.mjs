// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({output: "server",
  integrations: [tailwind({
    applyBaseStyles: false,
  }),
    , vue({ jsx: true }), react(), mdx()]
});