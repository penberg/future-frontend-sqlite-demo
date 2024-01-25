import { json } from '@stricjs/app/send';
import { routes } from '@stricjs/app';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { createClient } from '@libsql/client';
import { type Item, type InsertItem, items } from '../../../db/schema';

const client = createClient({ url: 'file:todo.db' });

const db = drizzle(client);

const getItems = async () => {
  return await db.select().from(items).all()
};

const addItem = async (item: InsertItem) => {
  return await db.insert(items).values(item).execute();
}

const removeItem = async (id: number) => {
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

export default routes()
  .get('/', async () => {
    const items = await getItems();
    return json(items);
  })
  .post('/', async (ctx) => {
    const body = await ctx.req.text();
    const item = safeJsonParse<InsertItem>(body);
    await addItem(item!);
    return new Response();
  })
  .delete('/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    await removeItem(id);
    return new Response();
  });