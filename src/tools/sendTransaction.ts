import { Address, parseEther } from "viem";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import { ToolConfig } from "./allTools";

interface SendTransactionArgs {
  from: Address;
  to: Address;
  amount: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "sendTransaction",
      description: "Send ETH from one address to another",
      parameters: {
        type: "object",
        properties: {
          from: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The sender's Ethereum address",
          },
          to: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The recipient's Ethereum address",
          },
          amount: {
            type: "string",
            description: "Amount of ETH to send (in ETH, not Wei)",
          },
        },
        required: ["from", "to", "amount"],
      },
    },
  },
  handler: async ({ from, to, amount }) => {
    const walletClient = createViemWalletClient();

    const value = parseEther(amount);

    const hash = await walletClient.sendTransaction({
      account: from,
      to: to,
      value: value ? parseEther(amount) : undefined,
    });

    return `Transaction sent! Hash: ${hash}`;
  },
};
