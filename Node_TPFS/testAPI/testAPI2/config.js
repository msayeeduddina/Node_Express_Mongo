// src/config.js
const path = require("path");

const paths = {
  secretKeyDir: path.join(__dirname, "../TencentCloudFiles"),
};

const urls = {
  query: "https://tridevchainapi.tridentity.me/bc/queryEvm",
  evoke: "https://tridevchainapi.tridentity.me/bc/evokeEvm",
};

module.exports = { paths, urls };
