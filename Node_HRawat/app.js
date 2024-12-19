const fs = require("fs");
const path = require("path");

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
