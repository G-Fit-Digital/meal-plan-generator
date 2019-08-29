const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

app.listen(3000, () => {
  console.log("App Running On Port 3000");
});
