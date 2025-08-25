import { createRouter as createTanstackRouter } from "@tanstack/react-router"

// Import the generated route tree
import { migrator } from "./database"
import { routeTree } from "./routeTree.gen"

// Run Kysely database migrations
const { error, results } = await migrator.migrateToLatest()
if (error) {
  console.error(error)
  throw error
} else {
  console.log(results)
}

// Create a new router instance
export const createRouter = () => {
  return createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  })
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
