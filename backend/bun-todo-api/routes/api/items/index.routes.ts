import { json } from '@stricjs/app/send';
import { routes } from '@stricjs/app';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { createClient } from '@libsql/client';
import { type Item, type InsertItem, items } from '../../../db/schema';
import dotenv from 'dotenv';

dotenv.config();

console.log("DATABASE_URL: " + process.env.DATABASE_URL);

const client = createClient({
  url: process.env.DATABASE_URL!,
  syncUrl: process.env.SYNC_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

if (process.env.SYNC_URL) {
  console.log("SYNC_URL: " + process.env.SYNC_URL);
  client.sync();
}

const db = drizzle(client);

const getItems = async () => {
  return await db.select().from(items).all()
};

const addItem = async (item: InsertItem) => {
  return await db.insert(items).values(item).execute();
}

const removeItem = async (id: string) => {
  return await db.delete(items).where(eq(items.id, id)).execute();
}

const safeJsonParse = <T>(str: string) => {
  try {
    const ret: T = JSON.parse(str);
    return ret;
  } catch {
    return undefined;
  }
};

const cors = (response: Response) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export default routes()
  .options('/', () => {
    return cors(new Response());
  })
  .options('/:id', async () => {
    return cors(new Response());
  })
  .get('/', async () => {
    const items = await getItems();
    return cors(json(items));
  })
  .post('/', async (ctx) => {
    const body = await ctx.req.text();
    const item = safeJsonParse<InsertItem>(body);
    await addItem(item!);
    return cors(new Response());
  })
  .delete('/:id', async ctx => {
    const id = ctx.params.id;
    await removeItem(id);
    return cors(new Response());
  });