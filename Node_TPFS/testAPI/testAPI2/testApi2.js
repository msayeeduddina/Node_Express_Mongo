// testAPI1.js
const { getIdentifiersFromFile } = require("./fileOperations");
const { generateEncryptionArray } = require("./encryptionArrayGenerator");
const {
  loopDRCIdentityAPICall,
  DRCIdentityAPICallQuery,
} = require("./apiCalls");
const { jsonAbi } = require("./jsonABI");
const { createSecretKeysFile } = require("./fileOperations");
const { makeAESSecretKey } = require("./encryption");

////AddDetails
// (async () => {
//   const identifiers = await getIdentifiersFromFile();
//   for (let i = 40000; i < 41000; i++) {    //Prev: S = 40000 , E = 41000
//     const identifier = identifiers[i];
//     const encryptionArray = await generateEncryptionArray(identifier);
//     console.log(
//       `Encryption array for identifier ${identifier}:`,
//       encryptionArray
//     );
//     const requestBody = {
//       data: {
//         contractName: "TestUM5",
//         methodName: "addDetails",
//         contractArgs: encryptionArray,
//         useContractJson: jsonAbi,
//       },
//     };
//     await loopDRCIdentityAPICall(requestBody);
//     await delay(500);
//   }
// })();
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

////GetCaller
// (async () => {
//   const requestBody = {
//     data: {
//       contractName: "TestUM5",
//       methodName: "getCaller",
//       useContractJson: jsonAbi,
//     },
//   };
//   const resGetCaller = await DRCIdentityAPICallQuery(requestBody);
//   console.log("queryGetCaller", resGetCaller);
// })();

////GetNextIdentity
(async () => {
  const requestBody = {
    data: {
      contractName: "TestUM5",
      methodName: "nextIdentity",
      useContractJson: jsonAbi,
    },
  };
  const resGetNextIdentity = await DRCIdentityAPICallQuery(requestBody);
  console.log("queryGetNextIdentity", resGetNextIdentity);
})();

// // GetIdentityDetail
(async () => {
  const requestBody = {
    data: {
      contractName: "TestUM5",
      methodName: "getIdentityDetail",
      contractArgs: ["2ZH/OPQ+rdR9ew2igYaLi041I9ORI+n9Lp6ExiygUSg="],
      useContractJson: jsonAbi,
    },
  };
  const resGetIdentityDetail = await DRCIdentityAPICallQuery(requestBody);
  console.log("queryGetIdentityDetail", resGetIdentityDetail);
})();

// (async () => {
//   const nId = "abcd";
//   const result = await makeAESSecretKey(nId);
//   console.log(result);
// })();