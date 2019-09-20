const { Item } = require("../models/item");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let item = new Item(req.body);
  await item.save();
  res.send(item);
});
router.get("/search/:query", async (req, res) => {
  let items = await Item.find();
  const result = [];
  if (req.params.query.length > 0) {
    for (var i = 0; i < items.length; i++) {
      if (
        items[i].name.toLowerCase().includes(req.params.query.toLowerCase())
      ) {
        result.push(items[i]);
      }
    }
  }
  res.send(result);
});

module.exports = router;
