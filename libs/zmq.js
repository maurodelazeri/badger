const zmq = require("zeromq");
let sock = zmq.socket("pub");
const config = require("../config");

const IP = config.systemconfig.zmq.HOST;
const PORT = config.systemconfig.zmq.PORT;

sock = zmq.socket("pub");

sock.connect("tcp://" + IP + ":" + PORT + "");
console.log("[ZMQ] Publisher bound to port 31337");

function zmqSendMsg(channel, pool, msg) {
  sock.send(channel + "_" + pool + "_ZINNION" + msg);
  // console.log(
  //   "[" + new Date().toLocaleTimeString() + "] zmq sent ",
  //   channel + "_" + pool + "_ZINNION"
  // );
}

module.exports = {
  zmqSendMsg,
};
