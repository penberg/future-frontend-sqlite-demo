# Future Frontend: SQLite Demo

This is the source repository for the SQLite demo app presented at [Future Frontend January 2024 meetup](https://meetabit.com/events/future-frontend-january-2024/).

## Frontend

The app in [frontend/react](./frontend/react) directory is the frontend for a Todo app, forked from https://github.com/tastejs/todomvc/tree/master/examples/react

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

The app in [backend/bun-todo-api](./backend/bun-todo-api) directory is an API server implemented with Bun and Stric.

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

## Backend (Cloudflare Workers)

The app in [backend/workers-todo-api](./backend/workers-todo-api) directory an API server implemented with Cloudflare Workers.

Start the server locally:

```console
npm start
```

To deploy it on Workers platform, you first configure database access credentials.

Update the `wrangler.toml` with a `DATABASE_URL` variable:

```console
[vars]
DATABASE_URL = "<YOUR_DATABASE_URL>"
```

Then configure database access token in `.dev.vars`:

```
.dev.vars
DATABASE_AUTH_TOKEN="<YOUR_AUTH_TOKEN>"
```

and configure it as a secret:

```console
npx wrangler secret put DATABASE_AUTH_TOKEN
```

Finally, deploy to the Workers platform:

```console
npm run deploy
```

## Import SQLite database to Turso

You can import a SQLite database file with the following command:

```console
turso db create --from-file todo.db todo
```

Run the following to generate configuration to access a remote Turso database:

```console
echo "DATABASE_URL=$(turso db show --url todo)" > .env.remote
echo "DATABASE_AUTH_TOKEN=$(turso db tokens create todo)" >> .env.remote
cp .env.remote .env
```

Run the following to access an embedded database with offline sync:

```console
echo "DATABASE_URL=file:local.db" > .env.sync
echo "SYNC_URL=$(turso db show --url todo)" >> .env.sync
echo "DATABASE_AUTH_TOKEN=$(turso db tokens create todo)" >> .env.sync
cp .env.sync .env
``````
