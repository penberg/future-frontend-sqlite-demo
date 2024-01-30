import { Client as LibsqlClient, createClient } from "@libsql/client/web";
import { Router, RouterType, withParams } from "itty-router";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { InsertItem, items } from '../db/schema';

export interface Env {
    DATABASE_URL?: string;

    DATABASE_AUTH_TOKEN?: string;

    router?: RouterType;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (env.router === undefined) {
            env.router = buildRouter(env);
        }

        return env.router.handle(request);
    },
};

function buildLibsqlClient(env: Env): LibsqlClient {
    const url = env.DATABASE_URL?.trim();
    if (url === undefined) {
        throw new Error("DATABASE_URL env var is not defined");
    }

    const authToken = env.DATABASE_AUTH_TOKEN?.trim();
    if (authToken === undefined) {
        throw new Error("DATABASE_AUTH_TOKEN env var is not defined");
    }

    return createClient({ url, authToken });
}

const cors = (response: Response) => {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

const safeJsonParse = <T>(str: string) => {
    try {
      const ret: T = JSON.parse(str);
      return ret;
    } catch {
      return undefined;
    }
};
  
function buildRouter(env: Env): RouterType {
    const router = Router();
    router.all('*', withParams);
    router.options("/api/items", () => {
        return cors(new Response());
    });
    router.options("/api/items/:id", () => {
        return cors(new Response());
    });
    router.get("/api/items", async () => {
        const client = buildLibsqlClient(env);
        const db = drizzle(client);
        const rs = await db.select().from(items).all();
        return cors(Response.json(rs));
    });
    router.post("/api/items", async (request: Request) => {
        const client = buildLibsqlClient(env);
        const db = drizzle(client);
        const body = await request.text();
        const item = safeJsonParse<InsertItem>(body);
        const rs = await db.insert(items).values(item!).execute();
        return cors(Response.json(rs));
    });
    router.delete('/api/items/:id', async ({ id }) => {
        const client = buildLibsqlClient(env);
        const db = drizzle(client);
        await db.delete(items).where(eq(items.id, id)).execute();
        return cors(new Response());
    });
    router.all("*", () => new Response("Not Found.", { status: 404 }));
    return router;
}