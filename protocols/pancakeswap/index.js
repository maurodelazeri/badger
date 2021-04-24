const fs = require("fs");
const schedule = require("node-schedule");
const factoryABI = JSON.parse(fs.readFileSync("./abis/bsc/Factory.json"));
const pairABI = JSON.parse(fs.readFileSync("./abis/bsc/Pair.json"));
const BEP20ABI = JSON.parse(fs.readFileSync("./abis/bsc/BEP20.json"));

let web3;
let factoryContract;
let allPairsLength = 0;

const pairs_map = new Map();
const PANCAKESWAP_FACTORY = "0x877fe7f4e22e21be397cd9364fafd4af4e15edb6"; // mainnet

async function init(web3Obj) {
  web3 = web3Obj;
  factoryContract = new web3.eth.Contract(factoryABI, PANCAKESWAP_FACTORY);
  await loadFactoryPairs(0);

  // Shedulle pools check for every minute
  schedule.scheduleJob("* * * * *", function () {
    console.log("[PANCAKESWAP] Checking for new pools");
    factoryContract.methods
      .allPairsLength()
      .call()
      .then((currentLength) => {
        if (allPairsLength != currentLength) {
          const difference = currentLength - allPairsLength;
          console.log(
            "[PANCAKESWAP] New pools found:",
            difference,
            " starting from:",
            totalPools
          );
          loadFactoryPairs(currentLength).then(() => {
            console.log(
              "[PANCAKESWAP] New pools updated, new total is:" + currentLength
            );
          });
        } else {
          console.log("[PANCAKESWAP] All pools are update:", currentLength);
        }
      });
  });
}

const loadFactoryPairs = async (index) => {
  try {
    allPairsLength = await factoryContract.methods.allPairsLength().call();
    if (allPairsLength.length == 0) {
      return false;
    }
    for (var i = index; i < allPairsLength; i++) {
      let pairID = factoryContract.methods.allPairs(i).call();
      console.log(pairID);
      pairs_map.set(pairID, pairID.toLowerCase());
    }
  } catch (error) {
    console.error(
      "[PANCAKESWAP] loadFactoryPairs",
      error.name + ":" + error.message
    );
  }
};

const getPastLogs = async (fromBlock, toBlock, address, topics) => {
  try {
    const block = await web3.eth.getPastLogs({
      fromBlock: fromBlock,
      toBlock: toBlock,
      address: address,
      topics: topics,
    });
    return block;
  } catch (error) {
    console.error(
      "[PANCAKESWAP] getPastLogs",
      error.name + ":" + error.message
    );
  }
};

module.exports = {
  init,
};
