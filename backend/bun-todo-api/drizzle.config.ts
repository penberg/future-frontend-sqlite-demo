import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "libsql",
  dbCredentials: {
    url: "file:todo.db",
  },
} satisfies Config;
