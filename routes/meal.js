const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const randomInteger = require("../utils/utils");
const { Meal } = require("../models/meal");
const calculateMealCalories = require("../utils/calculateCalories");
const calculateMealProtein = require("../utils/calculateProtein");
const calculateCarbsAndFat = require("../utils/calculateCarbsAndFat");

router.post(
  `/calories/:calories/protein/:protein/carb/:carb/fat/:fat`,
  async (req, res) => {
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
        for (var i = 0; i < restrictions.length; i++) {
          meal_items = meal_items.filter(function(item) {
            return !item.dietary_restrictions[0].includes(
              restrictions[i].substring(0, 1).toUpperCase() +
                restrictions[i].substring(1)
            );
          });
        }
      }
      let breakfast_calories = calculateMealCalories(
        req.body.data.weight,
        req.body.data.numberMeals,
        meal,
        req.params.calories
      );
      let breakfast_protein = calculateMealProtein(
        req.body.data.numberMeals,
        meal,
        req.params.protein
      );
      let breakfast_fat = calculateCarbsAndFat(
        breakfast_calories,
        breakfast_protein,
        "fat"
      );
      let breakfast_carbs = calculateCarbsAndFat(
        breakfast_calories,
        breakfast_protein,
        "carbs"
      );
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;
      let items = [];
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
      }
      return {
        items,
        protein,
        calories,
        carbs,
        fat,
        meal,
        target_calories: breakfast_calories,
        target_protein: breakfast_protein,
        target_carbs: breakfast_carbs,
        target_fat: breakfast_fat,
      };
    }
    let randomBreakfast = generate_meal(
      filtered_breakfast,
      req.body.data.restrictions,
      "breakfast"
    );
    let randomLunch = generate_meal(
      filtered_lunch,
      req.body.data.restrictions,
      "lunch"
    );
    let randomSnack = generate_meal(
      filtered_snack,
      req.body.data.restrictions,
      "snack"
    );
    //Todo: Better way to instantiate a second snack
    let secondSnack = generate_meal(
      filtered_snack,
      req.body.data.restrictions,
      "snack"
    );
    let randomDinner = generate_meal(
      filtered_dinner,
      req.body.data.restrictions,
      "dinner"
    );
    let thirdSnack = generate_meal(
      filtered_snack,
      req.body.data.restrictions,
      "snack"
    );
    let menu;
    if (req.body.data.numberMeals === 0) {
      menu = new Meal({
        meal: [randomBreakfast, randomLunch, randomDinner],
        client_name: req.body.data.client_name,
        created_on: new Date(),
      });
    }
    if (req.body.data.numberMeals === 1) {
      menu = new Meal({
        meal: [randomBreakfast, randomLunch, randomSnack, randomDinner],
        client_name: req.body.data.client_name,
        created_on: new Date(),
      });
    }
    if (req.body.data.numberMeals === 2) {
      menu = new Meal({
        meal: [
          randomBreakfast,
          randomSnack,
          randomLunch,
          secondSnack,
          randomDinner,
        ],
        client_name: req.body.data.client_name,
        created_on: new Date(),
      });
    }
    if (req.body.data.numberMeals === 3) {
      menu = new Meal({
        meal: [
          randomBreakfast,
          randomSnack,
          randomLunch,
          secondSnack,
          randomDinner,
          thirdSnack,
        ],
        client_name: req.body.data.client_name,
        created_on: new Date(),
      });
    }
    await menu.save();
    res.send(menu);
  }
);

router.get("/:id", async (req, res) => {
  let meal = await Meal.findOne({ _id: req.params.id });
  res.send(meal);
});
router.delete("/:id/meal/:meal/item/:item", async (req, res) => {
  let meal = await Meal.findOne({ _id: req.params.id });
  let item_db = await Item.findOne({ _id: req.params.item });
  let curr = meal.meal.filter(
    meal => meal._id.toString() === req.params.meal.toString()
  );
  let item = curr[0].items.findIndex(
    item => item._id.toString() === req.params.item.toString()
  );
  curr[0].items.splice(item, 1);
  curr[0].calories -= item_db.calories;
  curr[0].protein -= item_db.protein;
  curr[0].carbs -= item_db.carbs;
  curr[0].fat -= item_db.fat;
  await meal.save();
  res.send(meal);
});
router.post("/:id/meal/:meal/item/:item", async (req, res) => {
  let meal = await Meal.findOne({ _id: req.params.id });
  let item_db = await Item.findOne({ _id: req.params.item });
  let curr = meal.meal.filter(
    meal => meal._id.toString() === req.params.meal.toString()
  );
  curr[0].items.push(item_db);
  curr[0].calories += item_db.calories;
  curr[0].protein += item_db.protein;
  curr[0].carbs += item_db.carbs;
  curr[0].fat += item_db.fat;
  await meal.save();
  res.send(meal);
});
router.get("/", async (req, res) => {
  let meal = await Meal.find();
  res.send(meal);
});

module.exports = router;
