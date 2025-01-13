// src/encryptionArrayGenerator.js
const { getKeyFromFile } = require("./fileOperations");
const { plainTextToAESEncryption, stringToByte32 } = require("./encryption");

async function generateEncryptionArray(identifier) {
  const results = [];
  try {
    const aesKey = await getKeyFromFile(identifier);
    const encryptedIdentifier = await plainTextToAESEncryption(
      identifier,
      aesKey
    );
    results.push(encryptedIdentifier);

    const ethAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
    const docsUri =
      "file:///D:/TRIDENT/LOCAL/Node_TPFS/TencentCloudFiles/55aac58eedadccc59f43c62145f25a76cc0dd8ad6df9a803b9f824c3cb83cfef.jpg";
    results.push(ethAddress);

    const firstName = `${identifier}firstName`;
    const lastName = `${identifier}lastName`;
    const [encryptedFirstName, encryptedLastName, encryptedDocsUri] =
      await Promise.all([
        plainTextToAESEncryption(firstName, aesKey),
        plainTextToAESEncryption(lastName, aesKey),
        plainTextToAESEncryption(docsUri, aesKey),
      ]);
    results.push([encryptedFirstName, encryptedLastName]);
    results.push([encryptedDocsUri]);
    const [hexString1, hexString2] = await Promise.all([
      stringToByte32(firstName),
      stringToByte32(lastName),
    ]);
    results.push([`0x${hexString1.toString("hex")}`]);
    results.push([
      `0x${hexString1.toString("hex")}`,
      `0x${hexString2.toString("hex")}`,
    ]);
  } catch (error) {
    console.error("Error generating encryption array:", error.message);
  }
  return results;
}

module.exports = { generateEncryptionArray };
