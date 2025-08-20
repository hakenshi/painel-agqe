'server-only'

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: process.env.NODE_ENV === "production" ? {
    rejectUnauthorized: true,
    ca: process.env.DATABASE_CA_CERT
  } : false,
});

export const db = drizzle(pool, { schema });
