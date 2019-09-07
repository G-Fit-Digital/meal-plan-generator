const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const randomInteger = require("../utils");

router.get("/", async (req, res) => {
  let max_calories = 3259;
  let min_protein = 233;
  let min_carb = 220;
  let min_fat = 80;
  const items = await Item.find();
  let filtered_breakfast = items.filter(function(item) {
    return item.meal_category[0].includes("Breakfast");
  });
  let filtered_lunch = items.filter(function(item) {
    return item.meal_category[0].includes("Lunch");
  });
  let filtered_dinner = items.filter(function(item) {
    return item.meal_category[0].includes("Dinner");
  });
  let filtered_snack = items.filter(function(item) {
    return item.meal_category[0].includes("Snack");
  });
  function randomBreakfast() {
    let breakfast_calories = max_calories * 0.35;
    let breakfast_protein = min_protein * 0.35;
    let breakfast_carbs = min_carb * 0.35;
    let breakfast_fat = min_fat * 0.35;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let items = [];
    while (calories < breakfast_calories + breakfast_calories * 0.1) {
      let random = randomInteger(filtered_breakfast.length);
      let randomItem = filtered_breakfast[random];
      if (
        protein + randomItem.protein <
          breakfast_protein - breakfast_protein * 0.1 &&
        carbs + randomItem.carbs < breakfast_carbs - breakfast_carbs * 0.1 &&
        fat + randomItem.fat < breakfast_fat - breakfast_fat * 0.1
      ) {
        items.push(randomItem);
        calories += filtered_breakfast[random].calories;
        protein += filtered_breakfast[random].protein;
        carbs += filtered_breakfast[random].carbs;
        fat += filtered_breakfast[random].fat;
      } else {
        // if (items.length > 2) {
        //   let randomNumber = Math.floor(Math.random());
        //   calories -= items[randomNumber].calories;
        //   protein -= items[randomNumber].protein;
        //   carbs -= items[randomNumber].carbs;
        //   fat -= items[randomNumber].fat;
        //   items.splice(randomNumber, 1);
        // }

        filtered_breakfast = filtered_breakfast.filter(function(item) {
          return item.protein < breakfast_protein - protein;
        });
        filtered_breakfast = filtered_breakfast.filter(function(item) {
          return item.carbs < breakfast_carbs - carbs;
        });
        filtered_breakfast = filtered_breakfast.filter(function(item) {
          return item.fat < breakfast_fat - fat;
        });
        filtered_breakfast = filtered_breakfast.filter(function(item) {
          return item.calories < breakfast_calories - calories;
        });
      }
      console.log(calories, protein, carbs, fat);
    }
    return { items, protein, calories, carbs, fat };
  }
  randomMenuItem = randomBreakfast();
  res.send(randomMenuItem);
});

module.exports = router;
