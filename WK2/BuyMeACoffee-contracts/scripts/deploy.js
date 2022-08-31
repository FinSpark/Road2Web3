// scripts/deploy.js

const hre = require("hardhat");

async function main(){
    // We get the contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee');
    const buyMeACoffee = await BuyMeACoffee.deploy();

    await buyMeACoffee.deployed();

    console.log('BuyMeACoffee deployed to: ', buyMeACoffee.address);
}

// Pattern to use async/await everywhere
// and handle errors
main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });