import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import playformCompress from "@playform/compress";
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress"
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

export default defineConfig({
   output: 'server',
   adapter: vercel({ runtime: 'nodejs18.x', imageService: true, isr: true,}),
   image: { remotePatterns: [ { protocol: 'https' , hostname: 'cdn.sanity.io',}]},
   vite: {plugins: [tailwindcss()],},
  integrations: [
    react(),
    partytown({ config: {forward: ['dataLayer.push']}}),
    sitemap(),
    icon({include: {uit:["*"],}}),
    compress(), 
    robotsTxt(), 
    playformCompress(),
    sanity({
    projectId: '7ozhw6s3',
    dataset: 'production',
    apiVersion: '2024-10-09',
    useCdn: false
  })
  ]
});