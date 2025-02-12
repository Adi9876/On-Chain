import { Address, parseEther } from "viem";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import { ToolConfig } from "./allTools";
import { createViemPublicClient } from "../viem/createViemPublicClient";

const ERC20_ABI = [] as const; // manually entering abi and bytecode for deployemnt
const ERC20_BYTECODE = "0x";

interface DeployERC20Args {
  name: string;
  symbol: string;
  initialSupply?: string;
}

export const deployERC20Tool: ToolConfig<DeployERC20Args> = {
  definition: {
    type: "function",
    function: {
      name: "deployERC20",
      description: "Deploy a new ERC20 token contract",
      parameters: {
        type: "object",
        properties: {
          from: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The deployer's Ethereum address",
          },
          name: {
            type: "string",
            description: "The name of the token",
          },
          symbol: {
            type: "string",
            description: "The symbol of the token",
          },
          initialSupply: {
            type: "string",
            description: "Initial supply of tokens (default: 1 billion)",
          },
        },
        required: ["from", "name", "symbol"],
      },
    },
  },
  handler: async ({ name, symbol, initialSupply = "1000000000" }) => {
    const walletClient = createViemWalletClient();
    const publicClient = createViemPublicClient();

    const hash = await walletClient.deployContract({
      account: walletClient.account,
      abi: ERC20_ABI,
      bytecode: ERC20_BYTECODE,
      args: [name, symbol, parseEther(initialSupply)],
    });
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    if (!receipt.contractAddress) {
      throw new Error("Contract deployment failed");
    }

    return {
      contractAddress: receipt.contractAddress,
      transactionHash: hash,
    };
  },
};
