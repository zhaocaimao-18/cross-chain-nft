module.exports = async({getNamedAccounts, deployments}) => {
   const {firstAccount} = await getNamedAccounts()
   const {deploy, log} = await deployments

   log("Deploying wnft contract")

   await deploy("WrappedMyToken", {
      contract: "WrappedMyToken",
      from: firstAccount,
      log: true,
      args: ["WrappedMyToken", "WMT"] 
   })
   log("wnft deploy deployed successfully")

}


module.exports.tags = ["destchain", "all"]