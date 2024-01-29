# Future Frontend: SQLite Demo

This is the source repository for the SQLite demo app presented at [Future Frontend January 2024 meetup](https://meetabit.com/events/future-frontend-january-2024/).

## Frontend

The app in [frontend](./frontend) directory is the frontend for a Todo app, forked from https://github.com/tastejs/todomvc/tree/master/examples/react

To get started, install dependencies:

```console
bun i
```

Start the server:

```console
bun run serve
```

Open the application in [your browser](http://127.0.0.1:7002).

## Backend (Bun)

The app in [backend/bun-todo-api](./backend/bun-todo-api) directory is a Bun/Stric-based API server.

First generate migrations:

```console
bun x drizzle-kit generate:sqlite --out migrations --schema db/schema.ts
```

Then push migrations to database:

```console
bun x drizzle-kit push:sqlite
```

And start the server:

```console
bun --watch run index.ts
```

You can also inspect the database with Drizzle studio:

```console
bun x drizzle-kit studio
```

## Import SQLite database to Turso

```console
turso db create --from-file todo.db todo
echo "DATABASE_URL=$(turso db show --url todo)" > .env.remote
echo "DATABASE_AUTH_TOKEN=$(turso db tokens create todo)" >> .env.remote
```