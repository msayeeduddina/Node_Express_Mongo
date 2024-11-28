const bcrypt = require("bcrypt");

exports.doHash = async (value, saltValue) => {
  try {
    const result = await bcrypt.hash(value, saltValue);
    return result;
  } catch (error) {
    throw new Error("Hashing failed: " + error.message);
  }
};
