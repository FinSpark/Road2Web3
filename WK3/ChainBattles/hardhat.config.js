// hardhat.config.js

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url:process.env.TESTNET_RPC,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
