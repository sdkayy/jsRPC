import net from "net";
const s = net.Socket();

export default class XboxConsole {
  constructor(ip, port = 730) {
    s.connect(
      port,
      ip
    );
    s.on("data", function(data) {
      readData.push(data);
      console.log("DATA " + s.remoteAddress + ": " + data);
    });
    this.socket = s;
    this.readData = [];
  }

  sendCommand(command) {
    this.socket.write(command + "\r\n");
  }

  setMemory(address, data) {
    this.sendCommand(`setmem addr={address} data={data}`);
  }

  /* Couldn't test this */
  getMemory(address, rlength) {
    let _tempLength = readData.length;
    this.sendCommand(`getmemex addr={address} length={rlength}`);
    let _data = readData.slice(_tempLength, _tempLength + rlength);
    return _data;
  }

  xNotify(message, type = "PLAIN") {
    let String = 2;
    let Int = 1;
    let command =
      "consolefeatures ver=2" +
      ' type=12 params="A\\0\\A\\2\\' +
      String +
      "/" +
      message.length +
      "\\" +
      Buffer.from(message, "utf8").toString("hex") +
      "\\" +
      Int +
      "\\";
    switch (type) {
      case "PLAIN":
        command += '0\\"';
        break;
      case "INVITE":
        command += '1\\"';
        break;
      case "FRIEND":
        command += '2\\"';
        break;
      default:
        command += '0\\"';
        break;
    }
    this.sendCommand(command);
  }
}
