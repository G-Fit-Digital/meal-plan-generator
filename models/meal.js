const mongoose = require("mongoose");
const { ItemSchema } = require("./item");

const MealSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: false,
    default: 0,
  },
  carbs: {
    type: Number,
    required: false,
    default: 0,
  },
  fat: {
    type: Number,
    required: false,
    default: 0,
  },
  items: [ItemSchema],
  meal: {
    type: String,
    required: false,
    default: null,
  },
  protein: {
    type: Number,
    required: false,
    default: 0,
  },
});

const Meal = mongoose.model("Meal", MealSchema);
exports.Meal = Meal;
