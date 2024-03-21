const Gt06 = require("gt06");
const net = require("net");
const serverPort = 8090;
var server = net.createServer((client) => {
  var gt06 = new Gt06();
  console.log("client connected");

  client.on("data", (data) => {
    try {
      gt06.parse(data);
    } catch (error) {
      console.error({ ...error, msg: error.msg?.toString("utf8") });
      return;
    }

    if (gt06.expectsResponse) {
      client.write(gt06.responseMsg);
    }

    gt06.msgBuffer.forEach((msg) => {
      console.log(msg);
    });

    gt06.clearMsgBuffer();
  });
});

server.listen(serverPort, () => {
  console.log("started server on port:", serverPort);
});
