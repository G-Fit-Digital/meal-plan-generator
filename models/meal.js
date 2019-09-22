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
  target_calories: {
    type: Number,
    required: false,
    default: 0,
  },
  target_protein: {
    type: Number,
    required: false,
    default: 0,
  },
  target_carbs: {
    type: Number,
    required: false,
    default: 0,
  },
  target_fat: {
    type: Number,
    required: false,
    default: 0,
  },
});

const Meals = new mongoose.Schema({
  meal: [MealSchema],
  client_name: {
    type: String,
    required: false,
  },
  created_on: {
    type: String,
    required: false,
  },
});

const Meal = mongoose.model("Meal", Meals);
exports.Meal = Meal;
