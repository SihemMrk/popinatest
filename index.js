const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
var path = require("path");

const port = process.env.PORT || 4000;

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(port, function() {
  console.log(`Your server, listening on port ${port}`);
});
