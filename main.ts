import "https://deno.land/std@0.187.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { sendSummaryTo } from "./bot.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (typeof BOT_TOKEN === "undefined") {
  throw new Error("BOT_TOKEN is not defined.");
}

const app = new Application();

const router = new Router();

router.post("/sendphoto", async (ctx) => {
  if (ctx.params.BOT_API !== BOT_TOKEN)
    throw new Error("No BOT_API in the request.");
  const { text, imageUrl, chatId } = await ctx.request.body({ type: "json" })
    .value;
  await sendSummaryTo(chatId, { text, imageUrl });
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
