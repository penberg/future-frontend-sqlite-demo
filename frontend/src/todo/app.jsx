import useSWR from "swr";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { LOAD_ITEMS } from "./constants";

import "./app.css";

export function App() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const { data, error, mutate } = useSWR('http://localhost:3000/api/items', fetcher);

    if (error) return <div>Failed to load</div>

    if (!data) return <div>Loading...</div>

    const todos = data;

    return (
        <>
            <Header mutate={mutate} />
            <Main todos={todos} mutate={mutate} />
            <Footer todos={todos} mutate={mutate} />
        </>
    );
}
