// src/fileOperations.js
const fs = require("fs").promises;
const { paths } = require("./config");
const path = require("path");
const { generateRandomString } = require("./utils");
const { makeAESSecretKey } = require("./encryption");

async function createSecretKeysFile(ids) {
  const results = [];
  for (let i = 0; i < ids; i++) {
    const id = generateRandomString();
    const { key } = await makeAESSecretKey(id);
    results.push(`${id}:${key}`);
  }
  const filePath = path.join(paths.secretKeyDir, "secret_keys.txt");
  await fs.mkdir(paths.secretKeyDir, { recursive: true });
  await fs.appendFile(filePath, results.join("\n"), "utf8");
}

async function getKeyFromFile(nId) {
  const filePath = path.join(paths.secretKeyDir, "secret_keys.txt");
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.split("\n");
    for (const line of lines) {
      const match = line.match(/^([^:]+):(.+)$/);
      if (match && match[1] === nId) {
        return match[2];
      }
    }
    throw new Error(`Key not found for ID: ${nId}`);
  } catch (error) {
    console.error("Error reading keys file: ", error);
    throw error;
  }
}

async function getIdentifiersFromFile() {
  const filePath = path.join(paths.secretKeyDir, "secret_keys.txt");
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.split(":")[0]);
  } catch (error) {
    console.error("Error reading identifiers from file:", error.message);
    return [];
  }
}

module.exports = {
  createSecretKeysFile,
  getKeyFromFile,
  getIdentifiersFromFile,
};
