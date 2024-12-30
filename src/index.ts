import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { mkdir, writeFile } from "node:fs/promises";
import { stdout } from "node:process";

const model = new ChatOpenAI({
  model: "o1-all",
});

const stream = await model.stream(`
Hello! Tell me about yourself.
`);

const chunks = [];

for await (const chunk of stream) {
  chunks.push(chunk);
  stdout.write(`${chunk.content}`);
}

const result = chunks.map((chunk) => chunk.content).join("");
await mkdir("./dist", { recursive: true });
await writeFile("./dist/output.md", result);
