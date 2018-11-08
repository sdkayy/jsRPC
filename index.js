import XboxConsole from "./xboxConsole";

let x = new XboxConsole("10.0.0.190");
x.xNotify("Testing Connect", "PLAIN");
x.setMemory(0x50, 0x2222);
let _data = x.getMemory(0x50, "20");
