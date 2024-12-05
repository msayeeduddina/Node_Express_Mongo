const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    // _id: String,
    firstName: String,
    lastName: String,
    tech: String,
    age: Number,
  },
  {
    // _id: false,
    id: false,
    versionKey: false,
    strict: false,
  }
);
module.exports = mongoose.model("users", userSchema);
