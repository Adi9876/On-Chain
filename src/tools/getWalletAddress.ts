import { Address, isAddress } from "viem";
import { ToolConfig } from "./allTools";

interface GetWalletAddressArgs {
  wallet: Address;
}

export const getWalletAddressTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "getWalletAddress",
      description: "Validate and return a wallet address",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The Ethereum wallet address to validate",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    if (!isAddress(wallet)) {
      throw new Error("Invalid Ethereum address");
    }
    return wallet;
  },
};
