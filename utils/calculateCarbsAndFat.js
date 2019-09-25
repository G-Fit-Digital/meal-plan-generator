function calculateCarbsAndFat(totalCalories, proteinGrams, carbOrFat) {
  let protein_calories = proteinGrams * 4;
  let calorie_diff = totalCalories - protein_calories;
  let ret;
  if (carbOrFat === "carbs") {
    ret = (calorie_diff * 0.55) / 4;
  } else {
    ret = (calorie_diff * 0.45) / 9;
  }
  return ret;
}
module.exports = calculateCarbsAndFat;
