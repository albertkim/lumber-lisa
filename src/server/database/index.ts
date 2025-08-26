import { existsSync, promises as fs } from "fs"
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely"
import path from "path"
import pg from "pg"
import { fileURLToPath } from "url"
import { DB } from "./DatabaseModels"

const { Pool } = pg

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => parseFloat(value))

const NODE_ENV: string | undefined = process.env.NODE_ENV
let DATABASE_HOST: string | undefined = process.env.DATABASE_HOST
let DATABASE_PORT: string | undefined = process.env.DATABASE_PORT
let DATABASE_USER: string | undefined = process.env.DATABASE_USER
let DATABASE_PASSWORD: string | undefined = process.env.DATABASE_PASSWORD
let DATABASE_NAME: string | undefined = process.env.DATABASE_NAME

// Ensure required environment variables are set
if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_USER || !DATABASE_NAME) {
  const missingVars = []
  if (!DATABASE_HOST) missingVars.push("DATABASE_HOST")
  if (!DATABASE_PORT) missingVars.push("DATABASE_PORT")
  if (!DATABASE_USER) missingVars.push("DATABASE_USER")
  if (!DATABASE_NAME) missingVars.push("DATABASE_NAME")
  throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
}

export const config = {
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  user: DATABASE_USER,
  password: DATABASE_PASSWORD
}

export const dialect = new PostgresDialect({
  pool: new Pool(config)
})

export const db = new Kysely<DB>({ dialect })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve migration folder dynamically
const devMigrationFolder = path.resolve(__dirname, "../migrations")
const prodMigrationFolder = path.resolve(__dirname, "./migrations")
const migrationFolder = existsSync(devMigrationFolder) ? devMigrationFolder : prodMigrationFolder

console.log("Database name:", DATABASE_NAME)
console.log(`Migration folder: ${migrationFolder}`)

export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder
  })
})
