import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

export const isDatabaseConfigured = Boolean(
  databaseUrl &&
  databaseUrl.trim().length > 0 &&
  (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))
);

// Serverless HTTP connection pool - optimal for Next.js & Neon
export const db = isDatabaseConfigured
  ? drizzle(neon(databaseUrl!), { schema })
  : null;
