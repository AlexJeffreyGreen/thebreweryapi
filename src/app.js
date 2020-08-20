const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./routehelper.js")(app);
const dbConfig = require("../config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to the database.");
  })
  .catch((err) => {
    console.log("error with the connection", err);
    process.exit();
  });

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API BASE URL.",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
