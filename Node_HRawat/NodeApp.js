const fs = require("fs");
const path = require("path");
const os = require("os");
const EventEmitter = require("events");
const http = require("http");

const eventEmitter = new EventEmitter();
const server = http.createServer((req, res) => {
  res.end("createServer => : Server Created");
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log("serverListening => : ", PORT);
});

fs.readFile("fsContent.txt", "utf8", (err, data) => {
  if (err) {
    return;
  }
  console.log("readFile => : ", data);
});
const data = fs.readFileSync("./fsContent.txt", {
  encoding: "utf8",
  flag: "r",
});
console.log("readFileSync => : ", data);

const addData = "Hello World";
fs.writeFile("fsContent.txt", addData, "utf8", (err) => {
  if (err) {
    return;
  }
  console.log("writeFile => added data : ", addData);
});

const fullPath = path.join("/docs", "Cont1");
console.log("fullPath", fullPath);

const parsedPath = path.parse("/docs/Cont1");
console.log("parsedPath", parsedPath);

console.log("ostype => : ", os.type());
console.log("osuserInfo => : ", os.userInfo());
console.log("osfreemem => : ", os.freemem());
console.log("ostotalme => : ", os.totalmem());

eventEmitter.on("myEvent1", () => {
  console.log("eventEmitter => : Event1 has been triggered");
});

eventEmitter.on("myEvent2", (a1, a2) => {
  console.log("eventEmitter => : Event2 has been triggered", a1, a2);
});

eventEmitter.emit("myEvent1");
eventEmitter.emit("myEvent2", "Arg1", "Arg2");
