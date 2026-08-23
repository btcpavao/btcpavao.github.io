import path from "path"
import { readFileSync } from "node:fs"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

type SocialCardManifest = {
  urls: Record<string, string>
}

function loadSocialCardManifest() {
  const manifestPath = path.resolve(
    __dirname,
    ".cache/social-card-manifest.json"
  )

  return JSON.parse(readFileSync(manifestPath, "utf8")) as SocialCardManifest
}

// https://vite.dev/config/
export default defineConfig(() => {
  const socialCardUrls = loadSocialCardManifest().urls

  return {
    plugins: [
      {
        name: "social-card-metadata",
        transformIndexHtml(html) {
          return html.replaceAll(
            "__SOCIAL_CARD_HOMEPAGE__",
            socialCardUrls.homepage
          )
        },
      },
      react(),
      tailwindcss(),
    ],
    define: {
      __SOCIAL_CARD_URLS__: JSON.stringify(socialCardUrls),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
    },
  }
})
