import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = process.env.PORT || 8000;
const darkskyApiKey = process.env.DARKSKY_API_KEY || "THIS_IS_A_DUMMY_KEY";

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * Request weather status using darksky. This method has a 10% of chance to fail, if so,
 * a exception is raised.
 * 
 * @param lat latitude to query
 * @param lng longitude to query
 * @throws exception if new the request failed
 * @returns a promise with the current temperature
 */
const requestWeather = (lat, lng) => {
  // Compute failure (?)
  if ( Math.random() <= 0.1 ) {
    return Promise.reject(new Error("DarkSky call failed -as requested-"));
  }
  
  return axios.get(`https://api.darksky.net/forecast/${darkskyApiKey}/${lat},${lng}`)
  .then(response => {
    let temperature = response.data.currently.temperature;
    // convert to Celsius
    temperature = ((temperature - 32) / (9.0 / 5.0));
    return temperature
  })
  .catch(err => err);
}

app.get('/API/query', urlencodedParser, (req, res) => {
  const coordinates = {
    lat: req.query.lat,
    lng: req.query.lng
  }

  // Because of this is why I hate javascript and it's promises.
  // RxJS is a better way to handle this but as it's not SO adopted...
  const lambdaRetry = () => {
    requestWeather(coordinates.lat, coordinates.lng)
    .then(temperature => {
      res.json(temperature);
    })
    .catch(err => {
      console.error(err.message);
      lambdaRetry();
    });
  };
  lambdaRetry();
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Darksky proxy listening at http://%s:%s", host, port);
});
