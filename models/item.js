const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  meal_category: [
    {
      type: String,
      default: null,
    },
  ],
  food_category: [
    {
      type: String,
      default: null,
    },
  ],
  dietary_restrictions: [
    {
      type: String,
      default: null,
    },
  ],
  portion_in_grams: {
    type: Number,
    default: null,
  },
  protein: {
    type: Number,
    default: null,
  },
  fat: {
    type: Number,
    default: null,
  },
  carbs: {
    type: Number,
    default: null,
  },
  calories: {
    type: Number,
    default: null,
  },
  fibre: {
    type: Number,
    default: null,
  },
});
const Item = mongoose.model("Item", ItemSchema);
exports.Item = Item;
exports.ItemSchema = ItemSchema;
