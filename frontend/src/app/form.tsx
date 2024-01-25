"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";

import { addTodo } from "./actions";

export function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  formRef.current?.reset();

  return (
    <form
      action={async (formData) => {
        await addTodo(formData);
        formRef.current?.reset();
      }}
      className="flex items-center justify-between rounded-md border border-gray-300 p-3 shadow-sm"
      ref={formRef}
    >
      <div className="flex w-full items-center space-x-3">
        <span className="p-1 text-3xl">☑️</span>
        <input
          id="description"
          name="description"
          placeholder="Insert new todo"
          className="w-full text-black outline-none"
          required
          aria-label="Description of todo"
          type="text"
          autoFocus
        />
      </div>
      <Submit />
    </form>
  );
}

export function Submit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className="sr-only">
      Add
    </button>
  );
}
