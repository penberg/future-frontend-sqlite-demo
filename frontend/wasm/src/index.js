import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@libsql/client-wasm";

import { App } from "./todo/app";
import "todomvc-app-css/index.css";

const db = createClient({
    url: "file:todo.db",
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    title TEXT,
    completed BOOLEAN
    )
`);

render(
    <HashRouter>
        <Routes>
            <Route path="*" element={<App db={db} />} />
        </Routes>
    </HashRouter>,
    document.getElementById("root")
);
