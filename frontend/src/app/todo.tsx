"use client";

import { useTransition } from "react";

import { removeTodo, toggleTodo } from "./actions";
import type { TodoItem } from "./page";

export function Todo({ item }: { item: TodoItem }) {
  const [_, startTransition] = useTransition();

  return (
    <li className="flex items-center justify-between rounded-md border border-gray-100 p-3">
      <div className="flex w-full items-center space-x-3">
        <button
          className="p-1 text-3xl"
          onClick={() => {
            startTransition(() => {
              toggleTodo(item.id, Boolean(item.completed) ? 0 : 1);
            });
          }}
        >
          {Boolean(item.completed) ? "✅" : "☑️"}
        </button>
        <span className="flex-1">{item.description}</span>
      </div>
      <button
        className="p-1 text-3xl"
        onClick={() => {
          startTransition(() => {
            removeTodo(item.id);
          });
        }}
      >
        &times;
      </button>
    </li>
  );
}
