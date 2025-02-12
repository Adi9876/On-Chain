import { Address } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient";
import { ToolConfig } from "./allTools";
import { formatEther } from "viem";

interface GetBalanceArgs {
  wallet: Address;
}

export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "getBalance",
      description: "Get the balance of an address",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The address to get the balance of",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    const client = createViemPublicClient();
    const balance = await client.getBalance({ address: wallet });
    return formatEther(balance);
  },
};
