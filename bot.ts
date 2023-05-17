import { Bot } from "https://deno.land/x/grammy@v1.16.0/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

export const bot = new Bot(BOT_TOKEN!);

interface Summary {
  text: string;
  imageUrl: string;
}

export async function sendSummaryTo(
  id: number,
  { imageUrl, text: caption }: Summary
) {
  await bot.api.sendPhoto(id, imageUrl, { caption });
}
