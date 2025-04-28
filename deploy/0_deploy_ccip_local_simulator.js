const { network } = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {

    if (developmentChains.includes(network.name)) {
        const {firstAccount} = await getNamedAccounts()
        const {deploy, log} = await deployments
    
        log("Deploying CCIPLocalSimulator contract")
    
        await deploy("CCIPLocalSimulator", {
        contract: "CCIPLocalSimulator",
        from: firstAccount,
        log: true,
        args: [] 
        })
        log("CCIPLocalSimulator deploy deployed successfully")
    } else {
        log("not local environment, don't need to deploy CCIPLocalSimulator")
    }


}


module.exports.tags = ["test", "all"]