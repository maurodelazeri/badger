const Web3 = require("web3");

var options = {
  timeout: 30000, // ms
  // Useful if requests result are large
  clientConfig: {
    maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
  },
  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 15,
    onTimeout: false,
  },
};

web3 = new Web3(
  new Web3.providers.WebsocketProvider(`ws://wss.zinnion.com:8585`, options)
);

const bancor = async () => {
  const block = await web3.eth.getPastLogs({
    fromBlock: 10287430 - 10000,
    toBlock: 10287430 + 10000,
    address: "0x2F9EC37d6CcFFf1caB21733BdaDEdE11c823cCB0",
    topics: [
      "0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095",
    ],
  });
  return block;
};

const balancer = async () => {
  const block = await web3.eth.getPastLogs({
    fromBlock: 9569113 - 1000,
    toBlock: 9569113 + 1000,
    address: "0x9424b1412450d0f8fc2255faf6046b98213b76bd",
    topics: [
      "0x8ccec77b0cb63ac2cafd0f5de8cdfadab91ce656d262240ba8a6343bccc5f945",
    ],
  });
  return block;
};

(async () => {
  try {
    const data = await bancor();
    //console.log(data[0]);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
