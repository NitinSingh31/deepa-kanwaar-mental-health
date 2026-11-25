import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDatabaseUrl(): string {
  return process.env.DATABASE_URL || "";
}

export function isDatabaseConfigured(): boolean {
  const url = getDatabaseUrl().trim();
  return Boolean(
    url && (url.startsWith("postgres://") || url.startsWith("postgresql://"))
  );
}

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!isDatabaseConfigured()) return null;
  if (!_db) {
    const url = getDatabaseUrl();
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}
