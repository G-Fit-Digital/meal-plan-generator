const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
var cors = require("cors");
const item = require("./routes/item");
const meal = require("./routes/meal");

mongoose
  .connect("mongodb://localhost/gfit")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Not Connecting", err);
  });
app.use(cors());
app.use(express.json());
app.use("/api/item", item);
app.use("/api/meal", meal);
app.get("/", async (req, res) => {
  res.send("GFIT SERVER RUNNING");
});
//Todo: Break these requests into their own routes
app.get(`/search/:query`, async (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/search/?format=json&q=${req.params.query}&sort=r&max=100&offset=0&api_key=7gmRblmCoIbJpYoNpXJStU9jR99wHM78S973VXrz&ds=Standard%20Reference`
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err.message);
    });
});
app.get("/select/:id", async (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/reports/?ndbno=${req.params.id}&type=b&format=json&api_key=7gmRblmCoIbJpYoNpXJStU9jR99wHM78S973VXrz`
    )
    .then(response => {
      res.send(response.data);
    });
});
app.listen(3000, () => {
  console.log("App Running On Port 3000");
});
