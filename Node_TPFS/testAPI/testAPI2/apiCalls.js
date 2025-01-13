// src/apiCalls.js
const axios = require("axios");
const { urls } = require("./config");

async function DRCIdentityAPICallQuery(requestBody) {
  try {
    const response = await axios.post(urls.query, requestBody, {
      headers: { "Content-Type": "application/json" },
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

async function DRCIdentityAPICallEvoke(requestBody) {
  try {
    const response = await axios.post(urls.evoke, requestBody, {
      headers: { "Content-Type": "application/json" },
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

async function loopDRCIdentityAPICall(requestBody) {
  try {
    const response = await DRCIdentityAPICallEvoke(requestBody);
    console.log(`API Call Successful:`, response);
  } catch (error) {
    console.error(`API Call Failed:`, error);
  }
}

module.exports = {
  DRCIdentityAPICallQuery,
  DRCIdentityAPICallEvoke,
  loopDRCIdentityAPICall,
};
