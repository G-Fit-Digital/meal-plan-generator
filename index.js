const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
var request = require("request");

var options = {
  method: "POST",
  url: "https://oauth.fatsecret.com/connect/token",
  method: "POST",
  auth: {
    user: "d54eb23a23424e41a0ad006dd1894d6e",
    password: "a48334524e7845b0820a3842a2ddbca4"
  },
  headers: { "content-type": "application/json" },
  form: {
    grant_type: "client_credentials",
    scope: "basic"
  },
  json: true
};
let token = "";
mongoose
  .connect("mongodb://localhost/gfit")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      token = body.access_token;
    });
  })
  .catch(err => {
    console.log("Not Connecting", err);
  });
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("GFIT SERVER RUNNING");
});
app.get("/bananas", async (req, res) => {
  axios
    .get(
      `https://api.edamam.com/api/food-database/parser?ingr=chicken&app_id=2097ad97&app_key=36761b375e99e5d91bacf51798ffe0c2`
    )
    .then(response => {
      res.send(response.data.hints[0]);
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.listen(3000, () => {
  console.log("App Running On Port 3000");
});
