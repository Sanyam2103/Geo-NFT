const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { storeNFTs } = require("../utils/uploadToPinata")

const imagesLocation = "./images/"

module.exports = async ({ getNamedAccount, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let tokenUris = []

    if (process.env.UPLOAD_TO_NFT_STORAGE == "true") {
        tokenUris = await handleTokenUris()
    }

    console.log("---------------------------------------")
    const args = [tokenUris]
    const treasureHuntNft = await deploy("TreasureHuntNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(treasureHuntNft.address, args)
    }
    log("---------------------------------------")

    async function handleTokenUris() {
        tokenUris = []

        const result = await storeNFTs(imagesLocation)
        console.log(result)

        const tokenUris = result.map((response) => {
            const cid = response.value.cid
            return `ipfs://${cid}`
        })

        console.log("Token Uris uploaded! They are: ")
        console.log(tokenUris)

        return tokenUris
    }
}
module.exports.tags = ["all", "treasurehuntnft", "main"]
