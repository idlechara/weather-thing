const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const redis = require('redis');

const port = process.env.PORT || 8000;
const darkskyApiKey = process.env.DARKSKY_API_KEY || "THIS_IS_A_DUMMY_KEY";
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";

const app = express();
const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort
});

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
  
  const redisKey = lat + "," + lng;
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
  const lambdaQueryDarksky = () => {
    requestWeather(coordinates.lat, coordinates.lng)
    .then(temperature => {
      // save to redis and expire after one hour (which I think that is a good expiry time)
      redisClient.set(`${coordinates.lat},${coordinates.lng}`, temperature, 'EX', 60*60);
      res.json(temperature);
    })
    .catch(err => {
      console.error(err.message);
      lambdaQueryDarksky();
    });
  };

  // query redis, if not, then darksky
  redisClient.get(`${coordinates.lat},${coordinates.lng}`, (err, reply) => {
    if(reply){
      return res.json(reply);
    }
    lambdaQueryDarksky();
  })
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Darksky proxy listening at http://%s:%s", host, port);
});
