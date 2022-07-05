// hardhat.config.js

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// You need to export an object to set up your config

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
