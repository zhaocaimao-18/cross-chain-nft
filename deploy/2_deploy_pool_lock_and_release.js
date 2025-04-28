const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const {network} = require("hardhat")

module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy, log} = deployments
    
    log("Deploying NFTPoolLockAndRelease contract")

    // address _router, address _link, address nftAddr


    let sourceChainRouter
    let linkTokenAddr
    if (developmentChains.includes(network.name)) {
        const ccipSimulatorDeloyment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeloyment.address)
        const ccipConfig = await ccipSimulator.configuration()
        sourceChainRouter = ccipConfig.sourceRouter_
        linkTokenAddr = ccipConfig.linkToken_
    } else {
        sourceChainRouter = networkConfig[network.config.chainId].router
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }
    const nftAddrDeployment = await deployments.get("MyToken")
    const nftAddr = nftAddrDeployment.address

    await deploy("NFTPoolLockAndRelease", {
       contract: "NFTPoolLockAndRelease",
       from: firstAccount,
       log: true,
       args: [sourceChainRouter, linkTokenAddr, nftAddr] 
    })
    log("NFTPoolLockAndRelease deploy deployed successfully")

}


module.exports.tags = ["sourcechain", "all"]