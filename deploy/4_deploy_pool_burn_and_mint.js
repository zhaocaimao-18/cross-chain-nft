const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const {network} = require("hardhat")

module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy, log} = deployments
    
    log("Deploying NFTPoolBurnAndMint contract")

    // address _router, address _link, address nftAddr
    let destinationRouter
    let linkTokenAddr
    if (developmentChains.includes(network.name)) {
        const ccipSimulatorDeloyment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeloyment.address)
    
        const ccipConfig = await ccipSimulator.configuration()
        destinationRouter = ccipConfig.destinationRouter_
        linkTokenAddr = ccipConfig.linkToken_
    } else {
        destinationRouter = networkConfig[network.config.chainId].router
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }

    const wnftAddrDeployment = await deployments.get("WrappedMyToken")
    const wnftAddr = wnftAddrDeployment.address

    await deploy("NFTPoolBurnAndMint", {
       contract: "NFTPoolBurnAndMint",
       from: firstAccount,
       log: true,
       args: [destinationRouter, linkTokenAddr, wnftAddr] 
    })
    log("NFTPoolBurnAndMint deploy deployed successfully")

}


module.exports.tags = ["destchain", "all"]