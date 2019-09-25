function calculateMealProtein(numberMeals, meal, min_protein) {
  let breakfast_protein = 0;
  if (min_protein < 170) {
    switch (numberMeals) {
      case 0:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.3;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.35;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.35;
            break;
        }
        break;
      case 1:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.25;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.1667;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2917;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2917;
        }
        break;
      case 2:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.25;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.125;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2917;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.125;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2917;
            break;
        }
        break;
      case 3:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.2167;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.1166;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2667;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.1166;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2667;
            break;
          case "thirdSnack":
            breakfast_protein = min_protein * 0.1166;
            break;
        }
        break;
      default:
        breakfast_protein = min_protein = 0;
    }
  } else if (min_protein < 220) {
    switch (numberMeals) {
      case 0:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.3;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.35;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.35;
            break;
        }
        break;
      case 1:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.25;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.1667;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2917;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2917;
            break;
        }
        break;
      case 2:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.25;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.125;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2917;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.125;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2917;
            break;
        }
        break;
      case 3:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.2167;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.1166;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.2667;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.1166;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.2667;
            break;
          case "thirdSnack":
            breakfast_protein = min_protein * 0.1166;
            break;
        }
    }
  } else {
    switch (numberMeals) {
      case 0:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.2;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.35;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.35;
            break;
        }
        break;
      case 1:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.25;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.25;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.25;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.25;
            break;
        }
        break;
      case 2:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.2;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.13;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.22;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.13;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.22;
            break;
        }
        break;
      case 3:
        switch (meal) {
          case "breakfast":
            breakfast_protein = min_protein * 0.17;
            break;
          case "snack":
            breakfast_protein = min_protein * 0.1333;
            break;
          case "lunch":
            breakfast_protein = min_protein * 0.17;
            break;
          case "secondSnack":
            breakfast_protein = min_protein * 0.1333;
            break;
          case "dinner":
            breakfast_protein = min_protein * 0.17;
            break;
          case "thirdSnack":
            breakfast_protein = min_protein * 0.1333;
            break;
        }
    }
  }
  return breakfast_protein;
}
module.exports = calculateMealProtein;
