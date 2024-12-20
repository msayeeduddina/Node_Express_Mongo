const crypto = require("crypto");

const hashAndSaltPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
  console.log("hashAndSaltPassword", hash + salt);
  return hash + salt;
};

hashAndSaltPassword("password");
