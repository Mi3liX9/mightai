import "https://deno.land/std@0.187.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai";

const app = new Application();

const router = new Router();

router.post("summarize", async (ctx) => {
  const { text, OPENAI_TOKEN } = await ctx.request.body({ type: "json" }).value;

  const configuration = new Configuration({
    apiKey: OPENAI_TOKEN,
  });
  const openai = new OpenAIApi(configuration);

  const chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
  });

  ctx.response.body = chat.data.choices[0].message?.content;
  ctx.response.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
