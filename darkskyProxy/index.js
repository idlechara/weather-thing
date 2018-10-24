import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/API/query', urlencodedParser, (req, res) => {
  const coordinates = {
    lat: req.query.lat,
    lng: req.query.lng
  }
  
  console.log(coordinates);

  const key="2d3cd800738794b6698c638714579a64";

  axios.get(`https://api.darksky.net/forecast/${key}/${coordinates.lat},${coordinates.lng}`).then(response => {
    console.log(response.data);
  })
  
  res.send("hello world");
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
