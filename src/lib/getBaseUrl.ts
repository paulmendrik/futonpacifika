export function getBaseUrl(): string {
  // 1️⃣ Production: use your production domain
  if (import.meta.env.PROD) {
    return import.meta.env.PUBLIC_BASE_URL; // set in .env.production
  }

  // 2️⃣ Dev: ngrok auto-detect
  if (import.meta.env.PUBLIC_TUNNEL_URL) {
    return import.meta.env.PUBLIC_TUNNEL_URL;
  }

  // 3️⃣ Fallback: localhost
  return `http://localhost:${import.meta.env.PORT || 4321}`;
}
