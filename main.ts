import "https://deno.land/std@0.187.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { bot, sendSummaryTo } from "./bot.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (typeof BOT_TOKEN === "undefined") {
  throw new Error("BOT_TOKEN is not defined.");
}

const app = new Application();

const router = new Router();

router.post("/sendphoto", async (ctx) => {
  const {
    text,
    imageUrl,
    chatId,
    BOT_TOKEN: MyBOT_TOKEEN,
  } = await ctx.request.body({ type: "json" }).value;

  if (MyBOT_TOKEEN !== BOT_TOKEN) throw new Error("No BOT_API in the request.");
  await sendSummaryTo(chatId, { text, imageUrl });
  ctx.response.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
