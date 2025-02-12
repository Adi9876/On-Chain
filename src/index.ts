import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant";
import { createThread } from "./openai/createThread";
import { createRun } from "./openai/createRun";
import { performRun } from "./openai/performRun";
import * as readline from "readline";

async function main() {
  const client = new OpenAI();

  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Create assistant and thread once at the start
  const assistant = await createAssistant(client);
  const thread = await createThread(client, "");

  // Function to get user input
  const getUserInput = () => {
    return new Promise((resolve) => {
      rl.question("You: ", (input) => {
        resolve(input);
      });
    });
  };

  // Conversation loop
  while (true) {
    // Get user input
    const userInput = await getUserInput();

    // Check for exit command
    if (typeof userInput === 'string' && userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }

    // Process the message
    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(client, thread, run);
    console.log("Assistant:", result);
  }
}

main().catch(console.error);
