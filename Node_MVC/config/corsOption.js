const whitelist = ["http://localhost:4400", "http://127.0.0.1:5500"];

const corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("this origin is not allowed by cors"));
    }
  },
  optionSuccessstatus: 200,
};

module.exports = corsOption;
