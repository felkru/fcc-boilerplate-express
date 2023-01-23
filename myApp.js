let bodyParser = require("body-parser");
let express = require("express");
let app = express();
let obj = { message: "Hello json" };

app.use(
  "/",
  function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  },
  bodyParser.urlencoded({ extended: false })
);
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/json", function (req, res) {
  if (process.env["MESSAGE_STYLE"] == "uppercase") {
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);
app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word.toString() });
});
app
  .route("/name")
  .get(function (req, res) {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post(function (req, res) {
    res.json({ name: req.body.first + " " + req.body.last });
  });

module.exports = app;
