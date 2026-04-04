import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  // driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  
  verbose: true,
  strict: true,
  
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
});
