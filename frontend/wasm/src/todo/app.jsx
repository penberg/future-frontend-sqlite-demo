import useSWR from "swr";

import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import "./app.css";

export function App({ db }) {
    const fetcher = async (...args) => {
        try {
            const rs = await db.execute("SELECT * FROM items");
            return rs.rows.map((row) => {
                return {
                    id: row.id,
                    title: row.title,
                    completed: row.completed,
                };
            });
        } catch (error) {
            console.error(error);
        }
    };

    const { data, error, mutate } = useSWR("/items", fetcher);

    if (error) return <div>Failed to load</div>

    if (!data) return <div>Loading...</div>

    const todos = data;

    return (
        <>
            <Header db={db} mutate={mutate} />
            <Main db={db} todos={todos} mutate={mutate} />
            <Footer todos={todos} mutate={mutate} />
        </>
    );
}
