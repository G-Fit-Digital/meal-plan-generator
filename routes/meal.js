const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const randomInteger = require("../utils");

router.get("/", async (req, res) => {
  let max_calories = 2535;
  let min_protein = 233;
  let min_carb = 220;
  let min_fat = 80;
  const items = await Item.find();
  let filtered_breakfast = items.filter(function(item) {
    return (
      item.meal_category[0].includes("Breakfast") &&
      !item.food_category[0].includes("Condiments")
    );
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
    let breakfast_calories = max_calories * 0.3;
    let breakfast_protein = min_protein * 0.3;
    let breakfast_carbs = min_carb * 0.3;
    let breakfast_fat = min_fat * 0.3;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let items = [];
    while (calories < breakfast_calories * 0.95) {
      let random = randomInteger(filtered_breakfast.length);
      let randomItem = filtered_breakfast[random];
      if (
        protein + randomItem.protein < breakfast_protein &&
        carbs + randomItem.carbs < breakfast_carbs &&
        fat + randomItem.fat < breakfast_fat
      ) {
        items.push(randomItem);
        calories += filtered_breakfast[random].calories;
        protein += filtered_breakfast[random].protein;
        carbs += filtered_breakfast[random].carbs;
        fat += filtered_breakfast[random].fat;
      } else {
        calories = calories - items[0].calories;
        protein = protein - items[0].protein;
        carbs = carbs - items[0].carbs;
        fat = fat - items[0].fat;
        items.splice(0, 1);
      }
    }
    return { items, protein, calories, carbs, fat };
  }
  // function randomLunch() {
  //   let breakfast_calories = max_calories * 0.35;
  //   let breakfast_protein = min_protein * 0.35;
  //   let breakfast_carbs = min_carb * 0.35;
  //   let breakfast_fat = min_fat * 0.35;
  //   let calories = 0;
  //   let protein = 0;
  //   let carbs = 0;
  //   let fat = 0;
  //   let items = [];
  //   while (calories < breakfast_calories * 0.95) {
  //     let random = randomInteger(filtered_lunch.length);
  //     let randomItem = filtered_lunch[random];
  //     if (
  //       protein + randomItem.protein < breakfast_protein &&
  //       carbs + randomItem.carbs < breakfast_carbs &&
  //       fat + randomItem.fat < breakfast_fat
  //     ) {
  //       items.push(randomItem);
  //       calories += filtered_lunch[random].calories;
  //       protein += filtered_lunch[random].protein;
  //       carbs += filtered_lunch[random].carbs;
  //       fat += filtered_lunch[random].fat;
  //     } else {
  //       calories = calories - items[0].calories;
  //       protein = protein - items[0].protein;
  //       carbs = carbs - items[0].carbs;
  //       fat = fat - items[0].fat;
  //       items.splice(0, 1);
  //     }
  //   }
  //   return { items, protein, calories, carbs, fat };
  // }
  // function randomDinner() {
  //   let breakfast_calories = max_calories * 0.35;
  //   let breakfast_protein = min_protein * 0.35;
  //   let breakfast_carbs = min_carb * 0.35;
  //   let breakfast_fat = min_fat * 0.35;
  //   let calories = 0;
  //   let protein = 0;
  //   let carbs = 0;
  //   let fat = 0;
  //   let items = [];
  //   while (calories < breakfast_calories * 0.95) {
  //     let random = randomInteger(filtered_dinner.length);
  //     let randomItem = filtered_dinner[random];
  //     if (
  //       protein + randomItem.protein < breakfast_protein &&
  //       carbs + randomItem.carbs < breakfast_carbs &&
  //       fat + randomItem.fat < breakfast_fat
  //     ) {
  //       items.push(randomItem);
  //       calories += filtered_dinner[random].calories;
  //       protein += filtered_dinner[random].protein;
  //       carbs += filtered_dinner[random].carbs;
  //       fat += filtered_dinner[random].fat;
  //     } else {
  //       calories = calories - items[0].calories;
  //       protein = protein - items[0].protein;
  //       carbs = carbs - items[0].carbs;
  //       fat = fat - items[0].fat;
  //       items.splice(0, 1);
  //     }
  //   }
  //   return { items, protein, calories, carbs, fat };
  // }
  randomBreakfast = randomBreakfast();
  // randomLunch = randomLunch();
  // randomDinner = randomDinner();
  res.send({
    breakfast: randomBreakfast,
    // lunch: randomLunch,
    // dinner: randomDinner,
    // totals: {
    //   calories:
    //     randomBreakfast.calories + randomLunch.calories + randomDinner.calories,
    //   protein:
    //     randomBreakfast.protein + randomLunch.protein + randomDinner.protein,
    //   carbs: randomBreakfast.carbs + randomLunch.carbs + randomDinner.carbs,
    //   fat: randomBreakfast.fat + randomLunch.fat + randomDinner.fat,
    // },
  });
});

module.exports = router;
