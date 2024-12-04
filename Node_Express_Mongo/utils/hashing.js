const bcrypt = require("bcrypt");
const { createHmac } = require("crypto");

exports.doHash = async (value, saltValue) => {
  try {
    const result = await bcrypt.hash(value, saltValue);
    return result;
  } catch (error) {
    throw new Error("Hashing failed: " + error.message);
  }
};

exports.doHashValidation = async (value, hashedValue) => {
  try {
    const result = await bcrypt.compare(value, hashedValue);
    return result;
  } catch (error) {
    throw new Error("Hashing comparing failed: " + error.message);
  }
};

exports.hmacProcess = async (value, key) => {
  try {
    const result = await createHmac("SHA256", key).update(value).digest("hex");
    return result;
  } catch (error) {
    throw new Error("hmacProcess failed: " + error.message);
  }
};
