const express = require("express");
const app = express();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// respond with "hello world" when a GET request is made to the homepage
app.get('/', urlencodedParser, (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
