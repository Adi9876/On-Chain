// 4

import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { handleRunToolCalls } from "./handleRunToolCall";

export async function performRun(client: OpenAI, thread: Thread, run: Run) {
  while (run.status === "requires_action") {
    run = await handleRunToolCalls(run, client, thread);
  }

  if (run.status === "failed") {
    const errorMessage = `I encountered an error: ${
      run.last_error?.message || "Unknown Error"
    }`;
    console.error("Run failed", run.last_error);
    await client.beta.threads.messages.create(thread.id, {
      role: "assistant",
      content: errorMessage,
    });
    return {
      type: "text",
      text: {
        value: errorMessage,
        annotations: [],
      },
    };
  }

  const message = await client.beta.threads.messages.list(thread.id);
  const assistantMessage = message.data.find(
    (message) => message.role === "assistant"
  );

  return (
    assistantMessage?.content[0] || {
      type: "text",
      text: { value: "No response from assistant", annotations: [] },
    }
  );
}
