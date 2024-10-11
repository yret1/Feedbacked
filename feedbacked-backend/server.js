const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const { ATLAS_URI } = process.env;

app.use("/", router);

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
