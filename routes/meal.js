const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const randomInteger = require("../utils");
const { Meal } = require("../models/meal");

router.post(
  `/calories/:calories/protein/:protein/carb/:carb/fat/:fat`,
  async (req, res) => {
    let max_calories = req.params.calories;
    let min_protein = req.params.protein;
    let min_carb = req.params.carb;
    let min_fat = req.params.fat;
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
    function generate_meal(meal_items, restrictions, meal) {
      if (restrictions) {
        console.log(restrictions);
        for (var i = 0; i < restrictions.length; i++) {
          meal_items = meal_items.filter(function(item) {
            return !item.dietary_restrictions[0].includes(
              restrictions[i].substring(0, 1).toUpperCase() +
                restrictions[i].substring(1)
            );
          });
        }
      }
      let breakfast_calories = max_calories * 0.3;
      let breakfast_protein = min_protein * 0.3;
      let breakfast_carbs = min_carb * 0.3;
      let breakfast_fat = min_fat * 0.3;
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;
      let items = [];
      let count = 0;
      while (calories < breakfast_calories * 0.85) {
        let random = randomInteger(meal_items.length);
        let randomItem = meal_items[random];
        if (
          protein + randomItem.protein < breakfast_protein &&
          carbs + randomItem.carbs < breakfast_carbs &&
          fat + randomItem.fat < breakfast_fat
        ) {
          items.push(randomItem);
          calories += meal_items[random].calories;
          protein += meal_items[random].protein;
          carbs += meal_items[random].carbs;
          fat += meal_items[random].fat;
        } else {
          if (items.length > 2) {
            calories = calories - items[0].calories;
            protein = protein - items[0].protein;
            carbs = carbs - items[0].carbs;
            fat = fat - items[0].fat;
            items.splice(0, 1);
          }
        }
        count++;
      }
      return {
        items,
        protein,
        calories,
        carbs,
        fat,
        meal,
      };
    }
    let randomBreakfast = generate_meal(
      filtered_breakfast,
      req.body.restrictions,
      "breakfast"
    );
    let randomLunch = generate_meal(
      filtered_lunch,
      req.body.restrictions,
      "lunch"
    );
    let randomSnack = generate_meal(
      filtered_snack,
      req.body.restrictions,
      "lunch"
    );
    let randomDinner = generate_meal(
      filtered_dinner,
      req.body.restrictions,
      "dinner"
    );
    let menu = new Meal({
      meal: [randomBreakfast, randomLunch, randomSnack, randomDinner],
    });
    await menu.save();
    res.send(menu);
  }
);

router.get("/:id", async (req, res) => {
  let meal = await Meal.findOne({ _id: req.params.id });
  console.log(meal.meal);
  res.send(meal);
});

module.exports = router;
