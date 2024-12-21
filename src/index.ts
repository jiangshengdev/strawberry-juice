import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "o1-all",
});

const stream = await model.stream(`
Hello! Tell me about yourself.
`);

const chunks = [];

for await (const chunk of stream) {
  chunks.push(chunk);
  console.log(`${chunk.content}`);
}
