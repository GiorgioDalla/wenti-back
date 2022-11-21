const { developmentChains } = require("../helper-hardhat-config")

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const wenti = await deploy("WenTi", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmatons: network.config.blockConfirmations || 1,
    })
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     await verify(wenti.address, args)
    // }
    log(`deployer is ${deployer}`)
    log("--------------------------------")
}
module.exports.tags = ["all", "WenTi"]
