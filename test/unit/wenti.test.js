const { assert, expect } = require("chai")
const { ethers, deployments, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("WenTi", function () {
          const sendValue = ethers.utils.parseEther("1")
          let wentiContract, addr1, addr2, addr3, deployer
          beforeEach(async function () {
              ;[addr1, addr2, addr3] = await ethers.getSigners()
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all", "wenti"])
              wentiContract = await ethers.getContract("WenTi", deployer)
          })
          describe("receive funds", function () {
              it("will receive the indicated amount of funds", async () => {
                  await addr1.sendTransaction({
                      to: wentiContract.address,
                      value: sendValue,
                  })

                  const contractBal = await wentiContract.provider.getBalance(
                      wentiContract.address
                  )
                  assert.equal(contractBal.toString(), sendValue)
              })
          })
        //   describe("earnPrize", function () {
        //       it("will send rewards to whom calls it", async () => {
        //           await addr1.sendTransaction({
        //               to: wentiContract.address,
        //               value: sendValue,
        //           })
        //           await wentiContract.earnPrize()
        //           const deployBal = await wentiContract.provider.getBalance(
        //               "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        //           )
        //           console.log(deployBal)
        //           assert.equal(deployBal.toString(), ethers.utils.parseEther("0.00005"))
        //       })
        //   })
      })
