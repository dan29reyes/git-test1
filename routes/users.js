var express = require("express");
var router = express.Router();
require("dotenv").config();
const axios = require("axios");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({
    env: process.env.WEATHER_API,
  });
});

router.get("/envtest", async function (req, res, next) {
  let options = {
    method: "GET",
    url:
      "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=" +
      process.env.WEATHER_API,
  };
  const response = await axios.request(options);
  res.send({
    env: process.env.WEATHER_API,
    response: response.data,
  });
});

module.exports = router;
