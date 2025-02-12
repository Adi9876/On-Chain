import { Address, parseEther } from "viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { ToolConfig } from "./allTools";

interface TransferETHArgs {
  from: Address;
  to: Address;
  amount: string;
  privateKey: string;
}

export const transferETHTool: ToolConfig<TransferETHArgs> = {
  definition: {
    type: "function",
    function: {
      name: "transferETH",
      description: "Transfer ETH from one address to another",
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
            description: "Amount of ETH to transfer (in ETH, not Wei)",
          },
          privateKey: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{64}$",
            description: "Private key of the sender's address",
          },
        },
        required: ["from", "to", "amount", "privateKey"],
      },
    },
  },
  handler: async ({ from, to, amount, privateKey }) => {
    try {
      // Create account from private key
      const account = privateKeyToAccount(privateKey as `0x${string}`);
      
      // Create wallet client
      const client = createWalletClient({
        account,
        chain: mainnet,
        transport: http()
      });

      // Convert ETH amount to Wei
      const value = parseEther(amount);

      // Send transaction
      const hash = await client.sendTransaction({
        to,
        value,
        account: account,
      });

      return {
        success: true,
        transactionHash: hash,
        message: `Successfully transferred ${amount} ETH from ${from} to ${to}`,
      };
    } catch (error) {
      throw new Error(`Transfer failed: ${(error as Error).message}`);
    }
  },
};