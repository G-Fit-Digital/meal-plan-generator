const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");

mongoose
  .connect("mongodb://localhost/gfit")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Not Connecting", err);
  });
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("GFIT SERVER RUNNING");
});
app.get(`/search/:query`, async (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/search/?format=json&q=${req.params.query}&sort=r&max=100&offset=0&api_key=7gmRblmCoIbJpYoNpXJStU9jR99wHM78S973VXrz&ds=Standard%20Reference`
    )
    .then(response => {
      res.send(response.data.list.item[0].ndbno);
      // axios
      //   .get(
      //     `https://api.nal.usda.gov/ndb/reports/?ndbno=${response.data.list.item[0].ndbno}&type=s&format=json&api_key=7gmRblmCoIbJpYoNpXJStU9jR99wHM78S973VXrz`
      //   )
      //   .then(data => {
      //     res.send(data.data);
      //     console.log(data.data);
      //   });
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
