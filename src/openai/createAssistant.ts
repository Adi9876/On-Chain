// 1
import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { tools } from "../tools/allTools";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
  return await client.beta.assistants.create({
    model: "gpt-4o-mini",
    name: "Main Assistant",
    instructions: `
        You are a helpful assistant that can help with task related to the zkSync network and blockchain.
        You are in control of a wallet that you can use to do whatever you want.
        You can use the following tools to interact with the wallet:
        - get_balance: Get the balance of an address
        - get_wallet_address: Get the address of the wallet
        - send_transaction: Send a transaction to the wallet
        `,
    tools: Object.values(tools).map((tool) => tool.definition),
  });
}
