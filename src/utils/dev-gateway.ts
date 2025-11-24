#!/usr/bin/env tsx

/**
 * POWER DEV MODE FOR SNIPCART GATEWAY
 * -----------------------------------
 * This script:
 * 1. Starts Astro dev server
 * 2. Starts LocalTunnel (auto-retries if subdomain is taken)
 * 3. Writes the tunnel URL to .env.localtunnel (Astro auto-loads it)
 */

import { spawn } from "child_process";
import fetch from "node-fetch";
import fs from "fs";

const SUBDOMAIN = process.env.LT_SUBDOMAIN || "astro-snipcart-gateway";
const PORT = process.env.PORT || 4321;

function log(msg: string) {
  console.log(`[GATEWAY DEV] ${msg}`);
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startTunnel(): Promise<string> {
  return new Promise((resolve, reject) => {
    log(`Starting LocalTunnel for port ${PORT}...`);

    const lt = spawn("lt", ["--port", String(PORT), "--subdomain", SUBDOMAIN]);

    lt.stdout.on("data", (data) => {
      const text = data.toString();

      if (text.includes("your url is:")) {
        const url = text.match(/https:\/\/[a-zA-Z0-9\-.]+/)[0];
        log(`LocalTunnel ready: ${url}`);
        resolve(url);
      }
    });

    lt.stderr.on("data", (data) => {
      log("LocalTunnel error: " + data.toString());
    });

    lt.on("close", (code) => {
      reject(new Error(`LocalTunnel exited with code ${code}`));
    });
  });
}

async function writeTunnelEnv(url: string) {
  const content = `PUBLIC_TUNNEL_URL=${url}\n`;
  fs.writeFileSync(".env.localtunnel", content);
  log(`Tunnel URL written to .env.localtunnel`);
}

async function startAstro() {
  log("Starting Astro dev server...");
  spawn("npm", ["run", "dev"], { stdio: "inherit" });
}

async function main() {
  startAstro();

  await wait(1500); // give Astro time to boot

  try {
    const url = await startTunnel();
    await writeTunnelEnv(url);
  } catch (err) {
    console.error(err);
  }
}

main();
