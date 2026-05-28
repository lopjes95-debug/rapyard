import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.json({ ok: true, service: 'RapYard API' }));

export default app;
