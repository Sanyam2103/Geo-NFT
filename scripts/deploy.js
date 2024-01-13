const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

nmodule.exports = async ({ getNamedAccount, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  
  log("---------------------------------------")
  const args = []
  const treasureHuntNft = await deploy("TreasureHuntNft", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      log("Verifying...")
      await verify(treasureHuntNft.address, args)
  }
  log("---------------------------------------")
}
module.exports.tags = ["all", "treasurehuntnft", "main"]
