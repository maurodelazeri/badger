// require("log-timestamp")(function () {
//   return new Date().toISOString() + " %s";
// });
const Web3 = require("web3");
//const connection = require("./connection");
const config = require("./config");

const { init: InitUniSwapV2 } = require("./protocols/uniswap_v2/");
const { init: InitSushiSwap } = require("./protocols/sushiswap/");
const { init: InitBalancer } = require("./protocols/balancer/");
const { init: InitBancor } = require("./protocols/bancor/");
const { init: InitCurveFi } = require("./protocols/curvefi/");

const local = {
  ip: config.systemconfig.web3.HOST,
  port: config.systemconfig.web3.PORT,
};
const ip = local.ip;
const port = local.port;

try {
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
    new Web3.providers.WebsocketProvider(`ws://${ip}:${port}`, options)
  );

  //const checkConnectionPromise = connection.checkConnection(ip, port);
  const args = process.argv;

  console.log(`[BAGDER] Connected successfully to ws://${ip}:${port} !`);

  switch (args[2]) {
    case "uniswap_v2":
      InitUniSwapV2(web3);
      break;
    case "sushiswap":
      InitSushiSwap(web3);
      break;
    case "balancer":
      InitBalancer(web3);
      break;
    case "bancor":
      InitBancor(web3);
      break;
    case "curvefi":
      InitCurveFi(web3);
      break;
    default:
      console.log("[PLEASE SELECT THE TARGEG: ex: uniswap]");
      process.exit();
  }
} catch (error) {
  console.error("[BAGDER] ", error.name + ":" + error.message);
}
