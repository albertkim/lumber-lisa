import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

const duckdbNativePackages = [
  "@duckdb/node-api",
  "@duckdb/node-bindings",
  "@duckdb/node-bindings-darwin-arm64",
  "@duckdb/node-bindings-darwin-x64",
  "@duckdb/node-bindings-linux-arm64",
  "@duckdb/node-bindings-linux-x64",
  "@duckdb/node-bindings-win32-x64",
]

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"]
    }),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact()
  ],
  optimizeDeps: {
    // Keep native DuckDB bindings out of esbuild pre-bundling to avoid missing platform binaries
    exclude: duckdbNativePackages
  },
  ssr: {
    external: duckdbNativePackages
  }
})

export default config
