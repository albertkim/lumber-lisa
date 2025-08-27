import path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: [path.resolve(__dirname, "./src/server/tests/setup.ts")],
    globals: true,
    environment: "node",
    include: ["**/server/tests/**/*.test.ts"],
    fileParallelism: false,
    maxConcurrency: 1,
    isolate: false,
    coverage: {
      reporter: ["text-summary"] // Compact summary output
    },
    server: {
      deps: {
        inline: [/.*/] // This lets us run the database migrations in the setup file
      }
    }
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("test"),
    "process.env.JWT_SECRET": JSON.stringify("test"),
    "process.env.DATABASE_NAME": JSON.stringify("lumber_test"),
    "process.env.DATABASE_HOST": JSON.stringify("localhost"),
    "process.env.DATABASE_USER": JSON.stringify("postgres"),
    "process.env.DATABASE_PORT": JSON.stringify("5432"),
    "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    "process.env.WEB_URL": JSON.stringify("http://localhost:4000"),
    "process.env.PORT": JSON.stringify("3001"),
    "process.env.AWS_ACCESS_KEY_ID": JSON.stringify("test"),
    "process.env.AWS_SECRET_ACCESS_KEY": JSON.stringify("test"),
    "process.env.AWS_REGION": JSON.stringify("us-east-1"),
    "process.env.AWS_ACCOUNT_ID": JSON.stringify("test"),
    "process.env.X_AI_API_KEY": JSON.stringify("test"),
    "process.env.OPENAI_API_KEY": JSON.stringify("test"),
    "process.env.RESEND_API_KEY": null
  }
})
