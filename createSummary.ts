import { ChatOpenAI } from "https://esm/sh/langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "https://esm/sh/langchain/prompts";
import { LLMChain } from "https://esm/sh/langchain/chains";

const model = new ChatOpenAI({ temperature: 0.7 });

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "You are an expert arabic blogger in smart phones in technology, you will summarize the following blog post in Arabic. This is an example of the final result"
  ),
  HumanMessagePromptTemplate.fromTemplate(
    "🗣 #مايكروسوفت أعلنت عن عدة مزايا جديدة لبنج هذا الشهر، بما في ذلك بطاقات المعرفة وتحسين التنسيق وإمكانات المشاركة.\n\
  🤖 #بنج_تشات دخل معاينة مفتوحة، مما يعني أن أي شخص يمكنه التسجيل فيه دون الحاجة إلى إضافة اسمه إلى قائمة الانتظار.\n\
  📊 بنج تشات يدعم الآن الإجابات البصرية والتنسيق الأفضل والخيار لمشاركة المحادثات. مايكروسوفت أبرزت أن البشر يعالجون المعلومات البصرية بسرعة تقريبًا 60 ألف مرة أكبر من النص.\n\
  https://www.windowscentral.com/software-apps/bing/bing-chat-update-brings-bevy-of-new-features-including-visual-answers-improved-formatting-and-sharing-conversations"
  ),
  HumanMessagePromptTemplate.fromTemplate(
    "{post}\n Step by step, you need to do the following tasks:\
  - Summarize the blog post into bullet points in exciting informal way and explain like i am 5 years old.\n\
  - Add hashtags to the main names (do not translate them) \n\
  - Write the summary in Arabic.\n\
  - Use emojis to the summary.\n\
  - Add your notes if you have \n\
  - Add website url at the end of the post."
  ),
]);

interface Post {
  title: string;
  content: string;
  imageUrl: string;
  link: string;
}

export async function createSummary({ content, imageUrl, link, title }: Post) {
  const chainA = new LLMChain({ llm: model, prompt });

  const postText = [content, title, link].join("\n");

  const res = await chainA.call({ post: postText });

  return {
    summary: res.text,
    imageUrl,
  };
}
