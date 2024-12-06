const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const path = require("path");
const corsOption = require("./config/corsOption");
const { logger } = require("./middlewares/logEvents");

const PORT = process.env.PORT || 4400;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employee"));
app.use(logger);

app.listen(PORT, () => {
  console.log("Listening: ", PORT);
});
