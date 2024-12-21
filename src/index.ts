import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs/promises";

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

const result = chunks.map((chunk) => chunk.content).join("");
await fs.mkdir("./dist", { recursive: true });
await fs.writeFile("./dist/output.md", result);
