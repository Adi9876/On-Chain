# "On-Chain" Integrating Blockchain and AI

## Overview

The On-Chain AI Agent is a blockchain-integrated system that utilizes OpenAI for intelligent decision-making and Viem for seamless interaction with the Ethereum blockchain. This agent can perform basic on-chain operations such as:

- Fetching account balances
- Transferring ETH between addresses
- Deploying smart contracts using manually provided ABI and bytecode

## Technologies Used

- **OpenAI API** - Enables AI-driven decision-making and automation.
- **Viem** - A modern Ethereum library for interacting with smart contracts and sending transactions.
- **Node.js & TypeScript** - Ensures a scalable and maintainable codebase.

## Features

- **Balance Fetching**: Retrieve the ETH balance of any given address.
- **ETH Transfer**: Send ETH to another address with a predefined gas fee.
- **Smart Contract Deployment**: Deploy contracts using manually provided ABI and bytecode.
- **Modular Design**: Allows easy expansion for additional blockchain interactions.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/onchain-ai-agent.git
   cd onchain-ai
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and configure the following:

   ```env
   OPENAI_API_KEY=your-openai-api-key
   ETH_RPC_URL=https://your-ethereum-node-url
   PRIVATE_KEY=your-wallet-private-key
   ```

## Usage

```sh
Spin up the terminal with index.ts file and ask the agent about the above mentioned operations.
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
