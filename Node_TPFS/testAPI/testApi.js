const axios = require("axios");

const urlQ = "https://tridevchainapi.tridentity.me/bc/queryEvm";
const urlE = "https://tridevchainapi.tridentity.me/bc/evokeEvm";

const requestBody = {
  data: {
    contractName: "TestUM4",
    //
    // methodName: "getCaller",
    methodName: "currentBatchStart",
    // methodName: "getIdentityDetail",
    // contractArgs: [9999], //NationalID //1 - 20 million
    // methodName: "setAuthorizeUser",
    // contractArgs: ["0x4B3633554317829B1eE40034Fc97EA6037eC1a84", true],
    // methodName: "addDetails",
    // contractArgs: [
    //   "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    //   "TRIPFSCID",
    //   "0x0000000000000000000000000000000000000000000000000000000000000001",
    //   "0x0000000000000000000000000000000000000000000000000000000000000002",
    // ],
    // contractOwner: {
    //   userKey:
    //     "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgKc242BX3RmLCIFHh\nofoijByVcsP8SCjrjGLvhqzsuYGhRANCAATw3Dq7J4/DAWMMLzrWWAwdcIc+cYG7\neMF3zMCgPY+S/x+Y/b4mvjzi1damIBMolgv9UHP3q4tYhGDaahd1vMZD\n-----END PRIVATE KEY-----\n",
    //   userCrt:
    //     "-----BEGIN CERTIFICATE-----\nMIICtzCCAl2gAwIBAgIDApx7MAoGCCqGSM49BAMCMIGeMQswCQYDVQQGEwJDTjEQ\nMA4GA1UECBMHQmVpamluZzEQMA4GA1UEBxMHQmVpamluZzEpMCcGA1UEChMgb3Jn\nNjl2a2s5YS5jaGFpbm1ha2VyLW0xMGo4MzVnMHQxEjAQBgNVBAsTCXJvb3QtY2Vy\ndDEsMCoGA1UEAxMjY2Eub3JnNjl2a2s5YS5jaGFpbm1ha2VyLW0xMGo4MzVnMHQw\nHhcNMjQxMDE3MTcwNDE5WhcNMzQxMDE3MTcwNDE5WjCBqzELMAkGA1UEBhMCQ04x\nEDAOBgNVBAgTB0JlaWppbmcxEDAOBgNVBAcTB0JlaWppbmcxKTAnBgNVBAoTIG9y\nZzY5dmtrOWEuY2hhaW5tYWtlci1tMTBqODM1ZzB0MQ8wDQYDVQQLEwZjbGllbnQx\nPDA6BgNVBAMTMzE3MjkxODQ2NTk1MDcuc2lnbi5vcmc2OXZrazlhLmNoYWlubWFr\nZXItbTEwajgzNWcwdDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABPDcOrsnj8MB\nYwwvOtZYDB1whz5xgbt4wXfMwKA9j5L/H5j9via+POLV1qYgEyiWC/1Qc/eri1iE\nYNpqF3W8xkOjezB5MA4GA1UdDwEB/wQEAwIBpjAPBgNVHSUECDAGBgRVHSUAMCkG\nA1UdDgQiBCCym06kUADNCIfO2CLa4UMv5kMcOT4UbfTa5GB5BoMCnzArBgNVHSME\nJDAigCDH7iyNSOugJ04emUSHHign4fZVpOeF5ot1v+UypueOMzAKBggqhkjOPQQD\nAgNIADBFAiEAm8oaCaxeENuLoadP6CeHfRkWuvKOvM2wq5MZNHCH2kcCIBElS1jR\nqN3bYKUwopiHynnN2h8TeCzm7UG/gq1frNEG\n-----END CERTIFICATE-----\n",
    // },
    //
    useContractJson: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "neededRole",
            type: "bytes32",
          },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "IdentityDetailAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "identity",
            type: "address",
          },
        ],
        name: "IdentityDetailUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "previousAdminRole",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "newAdminRole",
            type: "bytes32",
          },
        ],
        name: "RoleAdminChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "granted",
            type: "bool",
          },
        ],
        name: "RoleUpdated",
        type: "event",
      },
      {
        inputs: [],
        name: "AUTHORIZED_USER_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            internalType: "string",
            name: "_tpfs",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "_data1",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "_data2",
            type: "bytes32",
          },
        ],
        name: "addDetails",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "batchSize",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "currentBatchStart",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCaller",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCaller1",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getIdentityDetail",
        outputs: [
          {
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            internalType: "string",
            name: "tpfs",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "data1",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data2",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "identity",
            type: "address",
          },
        ],
        name: "getIdentityDetailViaAuthorized",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "string",
            name: "",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
        ],
        name: "getRoleAdmin",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasRole",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "identityDetails",
        outputs: [
          {
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            internalType: "string",
            name: "tpfs",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "data1",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "data2",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "nextTokenId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "callerConfirmation",
            type: "address",
          },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        name: "setAuthorizeUser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "identity",
            type: "address",
          },
          {
            internalType: "string",
            name: "_tpfs",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "_data1",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "_data2",
            type: "bytes32",
          },
        ],
        name: "updateIdentityDetail",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};

async function DRCIdentityAPICall() {
  try {
    const response = await axios.post(urlQ, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error calling the API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

//API Calling//

// async function loopDRCIdentityAPICall() {
//   for (let i = 0; i < 10; i++) {
//     try {
//       const response = await DRCIdentityAPICall();
//       const responseSize = Buffer.byteLength(JSON.stringify(response), "utf8");
//       console.log(`API Call ${i + 1} Successful:`, response);
//       console.log(`Response size: ${responseSize} bytes`);
//     } catch (error) {
//       console.error(`API Call ${i + 1} Failed:`, error);
//     }
//   }
// }
// loopDRCIdentityAPICall();

DRCIdentityAPICall()
  .then((response) => {
    console.log("API Call Successful:", response);
  })
  .catch((error) => {
    console.error("API Call Failed:", error);
  });
