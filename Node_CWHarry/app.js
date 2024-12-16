const events = require("events");

class MyEmitter extends events {}
const myEmitter = new MyEmitter();

myEmitter.on("CallEmit", () => {
  console.log("CallEmitStart");
  setTimeout(() => {
    console.log("CallEmitRunning");
  }, 3000);
});

myEmitter.emit("CallEmit");
