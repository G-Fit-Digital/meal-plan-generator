const { Item } = require("../models/item");
const express = require("express");
const router = express.Router();

router.post("/item", async (req, res) => {
  let item = new Item(req.body);
  await item.save();
  res.send(item);
});

module.exports = router;
