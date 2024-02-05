var express = require("express");
var router = express.Router();
require("dotenv").config();
const axios = require("axios");

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const client = new MongoClient(process.env.MONGO_CONNECTION, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({
    env: process.env.WEATHER_API,
  });
});

async function getWeather() {
  let options = {
    method: "GET",
    url: 
      "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=" +
      process.env.WEATHER_API,
  };
  const response = await axios.request(options);
  return response.data;
}

router.get("/envtest", async function (req, res, next) {
  res.send({
    env: process.env.WEATHER_API,
    response: await getWeather(),
  });
});

module.exports = router;
