
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "./routes";

const app = new Hono();

app.route("/", routes);

serve({ fetch: app.fetch, port: 3000 });

console.log("Hono API running on :3000");
