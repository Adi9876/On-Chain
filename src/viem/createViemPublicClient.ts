import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export function createViemPublicClient() {
  return createPublicClient({
    chain: mainnet,
    transport: http(),
  });
}
