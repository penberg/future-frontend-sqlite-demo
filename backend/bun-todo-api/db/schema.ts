import { InferModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey(),
  title: text("title"),
  completed: integer("completed", { mode: 'boolean' }),
});

export type Item = InferModel<typeof items>;
export type InsertItem = InferModel<typeof items, "insert">;
