function calculateMealCatories(weight, numberMeals, meal, max_calories) {
  let breakfast_calories = 0;
  if (weight < 170) {
    switch (numberMeals) {
      case 0:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.33;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.33;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.33;
            break;
        }
        break;
      case 1:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.2667;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.1667;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.2667;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.2667;
        }
        break;
      case 2:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.2333;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.1333;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.2333;
            break;
          case "secondSnack":
            breakfast_calories = max_calories * 0.1333;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.2666;
            break;
        }
        break;
      case 3:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.2;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.1166;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.2;
            break;
          case "secondSnack":
            breakfast_calories = max_calories * 0.1166;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.25;
            break;
          case "thirdSnack":
            breakfast_calories = max_calories * 0.1166;
            break;
        }
        break;
    }
  } else if (weight > 170) {
    switch (numberMeals) {
      case 0:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.33;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.33;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.33;
            break;
        }
        break;
      case 1:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.2667;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.1667;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.2667;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.2667;
            break;
        }
        break;
      case 2:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.22;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.17;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.22;
            break;
          case "secondSnack":
            breakfast_calories = max_calories * 0.17;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.22;
            break;
        }
        break;
      case 3:
        switch (meal) {
          case "breakfast":
            breakfast_calories = max_calories * 0.1933;
            break;
          case "snack":
            breakfast_calories = max_calories * 0.14;
            break;
          case "lunch":
            breakfast_calories = max_calories * 0.1933;
            break;
          case "secondSnack":
            breakfast_calories = max_calories * 0.14;
            break;
          case "dinner":
            breakfast_calories = max_calories * 0.1933;
            break;
          case "thirdSnack":
            breakfast_calories = max_calories * 0.14;
            break;
        }
    }
  }
  return breakfast_calories;
}
module.exports = calculateMealCatories;
