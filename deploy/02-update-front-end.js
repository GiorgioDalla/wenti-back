const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../../../wenti/next-surv/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../../../wenti/next-surv/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Front End..")
        await updateContractAddresses()
        console.log("address updated")
        await updateAbi()
        console.log("Front end updated")
    }
}
async function updateAbi() {
    const WenTi = await ethers.getContract("WenTi")
    fs.writeFileSync(FRONT_END_ABI_FILE, WenTi.interface.format(ethers.utils.FormatTypes.json))
}
async function updateContractAddresses() {
    const WenTi = await ethers.getContract("WenTi")

    const chainId = network.config.chainId.toString()
    const ContractAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId in ContractAddress) {
        if (!ContractAddress[chainId].includes(WenTi.address)) {
            ContractAddress[chainId].push(WenTi.address)
        }
    }
    {
        ContractAddress[chainId] = [WenTi.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(ContractAddress))
}

module.exports.tags = ["all", "frontend"]
