import { Suspense } from "react";

import { db } from "@/lib/turso";

import { Todo } from "./todo";
import { Form } from "./form";

export type TodoItem = {
  id: number;
  description: string;
  completed: number;
};

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-6 py-32">
      <div className="space-y-3 text-center">
        <h3 className="text-2xl font-medium">Todos</h3>
        <p className="text-gray-500">React Server Actions + Local SQLite</p>
      </div>

      <Suspense>
        <div className="space-y-3">
          <Todos />
          <Form />
        </div>
      </Suspense>
    </div>
  );
}

async function Todos() {
  const result = await db.execute("SELECT * FROM todos");
  const rows = result.rows as unknown as TodoItem[];

  if (!result || result?.rows?.length === 0) return null;

  return rows.map((row, index) => (
    <Todo
      key={index}
      item={{
        id: row.id,
        description: row.description,
        completed: row.completed,
      }}
    />
  ));
}
