// scripts/withdraw.js

const hre = require('hardhat');
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

async function getBalance(provider, address) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
    // Get the contract that has been deployed to Goerli
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contractABI = abi.abi;

    // Get the node connection and wallet connection
    const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

    // Ensure that the signer is the same address as the original contract deployer
    // or else this script will fail with an error
    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Instantiate connected contract
    const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

    // Check starting balances
    console.log("current balance of owner ", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, buyMeACoffee.address);
    console.log("current balance of contract ", await getBalance(provider, buyMeACoffee.address), "ETH");

    // Withdraw funds if there are funds to withdraw
    if (contractBalance !== "0.0") {
        console.log('withdrawing funds..');
        const withdrawnTxn = await buyMeACoffee.withdrawnTips();
        await withdrawnTxn.wait();
    } else {
        console.log('no funds to widthdraw !');
    }

    // Check ending balance
    console.log('current balance of owner: ', await getBalance(provider, signer.address), "ETH");
}

// Pattern
// properly handle errors
main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });
