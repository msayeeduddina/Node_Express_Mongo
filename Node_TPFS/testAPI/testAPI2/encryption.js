// src/encryption.js
const crypto = require("crypto");

async function makeAESSecretKey(nId) {
  const idString = nId.toString();
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(salt + idString).digest("hex");
  return { key: hash.substring(0, 16), salt };
}

async function plainTextToAESEncryption(plainText, key) {
  const cipher = crypto.createCipheriv("aes-128-ecb", Buffer.from(key, "utf8"), null);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

async function aesDecryption(encryptedData, key) {
  const decipher = crypto.createDecipheriv("aes-128-ecb", Buffer.from(key, "utf8"), null);
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

async function stringToByte32(input) {
  let buffer = Buffer.from(input, "utf8");
  if (buffer.length > 32) {
    buffer = buffer.slice(0, 32);
  } else if (buffer.length < 32) {
    const paddedBuffer = Buffer.alloc(32);
    buffer.copy(paddedBuffer);
    buffer = paddedBuffer;
  }
  return buffer;
}

async function byte32ToString(byte32Buffer) {
  return byte32Buffer.toString("utf8").replace(/\0/g, "");
}

module.exports = { makeAESSecretKey, plainTextToAESEncryption, aesDecryption, stringToByte32, byte32ToString };
