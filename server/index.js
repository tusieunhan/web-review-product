const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./Router/userRoute");
const postRoute = require("./Router/postRoute");

dotenv.config();
const PORT = 2222;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Server is running with port", PORT);
    });
  })
  .catch((err) => {
    console.log("Eroor", err);
  });

app.use("/user", userRoute);
app.use("/post", postRoute);

module.exports = app;
