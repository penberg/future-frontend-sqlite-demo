"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/turso";

export const addTodo = async (formData: FormData) => {
  const description = formData.get("description") as string;

  await db.execute({
    sql: "INSERT INTO todos (description) VALUES (?)",
    args: [description],
  });

  // Alternatively call `fetch` here instead of db.execute()

  revalidatePath("/");
};

export const removeTodo = async (id: number) => {
  await db.execute({
    sql: "DELETE FROM todos WHERE id = ?",
    args: [id],
  });

  revalidatePath("/");
};

export const toggleTodo = async (id: number, completed: number) => {
  const rs = await db.execute({
    sql: "UPDATE todos SET completed = ? WHERE id = ?",
    args: [id, completed],
  });

  revalidatePath("/");
};
