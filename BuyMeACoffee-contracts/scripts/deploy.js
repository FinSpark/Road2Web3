// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    console.log('==Starting==')
    // Get the contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    console.log('==getContractFactory run==')
    const buyMeACoffee = await BuyMeACoffee.deploy();
    console.log('==deploy==')
    await buyMeACoffee.deployed();
    console.log('==deployed==')
    console.log('BuyMeACoffee deployed to: ', buyMeACoffee.address);
}

main()
    .then(() => process.exit(0))
    .catch((error)=> {
        console.error(error);
        process.exit(1);
    });