const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const userRoute=require('./routers/user.route')
const testRoute=require("./routers/test.route")
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use('/',userRoute);
app.use('/',testRoute);

app.listen(port, (req, res) => {
  console.log(`localhost:${port}`);
});