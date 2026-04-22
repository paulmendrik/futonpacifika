import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from "astro-robots-txt";
import partytown from '@astrojs/partytown';
import tailwindcss from "@tailwindcss/vite";
import sanity from '@sanity/astro';
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: 'server',
   adapter: netlify(),
   image: { remotePatterns: [ { protocol: 'https' , hostname: 'cdn.sanity.io',}]},
   site: 'https://futonpacifika.netlify.app',
   vite: {plugins: [tailwindcss()],},
  integrations: [
    react(),
    sanity({
    projectId: '7ozhw6s3',
    dataset: 'production',
    apiVersion: '2024-10-09',
    useCdn: false
    }),
    sitemap(),
    robotsTxt(),
    partytown({ config: {forward: ['dataLayer.push']}}),
    icon({include: {uit:["*"],}}),
  ],
});