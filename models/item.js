const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null
  },
  meal_category: [
    {
      type: String,
      required: true,
      default: null
    }
  ],
  food_category: [
    {
      type: String,
      required: true,
      default: null
    }
  ],
  dietary_restrictions: [
    {
      type: String,
      required: true,
      default: null
    }
  ],
  portion_in_grams: {
    type: Number,
    required: true,
    default: null
  },
  protein: {
    type: Number,
    required: true,
    default: null
  },
  fat: {
    type: Number,
    required: true,
    default: null
  },
  carbs: {
    type: Number,
    required: true,
    default: null
  },
  calories: {
    type: Number,
    required: true,
    default: null
  },
  fibre: {
    type: Number,
    required: true,
    default: null
  }
});
const Item = mongoose.model("Item", ItemSchema);
exports.Item = Item;
exports.ItemSchema = ItemSchema;
