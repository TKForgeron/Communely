const express = require("express");
const router = express();
const mealController = require("../controllers/mealController");

// Adds a meal
router.post("/add", mealController.addMeal);

// Retrieves a meal on id
router.get("/id/:mealId", mealController.retrieveMealOnId);

// Retrieves today's meal
router.get("/today", mealController.retrieveMealToday);

// Retrieves last n meals
router.get("/previous/:nDays", mealController.retrievePreviousNMeals);

// Retrieves a meal on date
router.get("/:date", mealController.retrieveMealOnDate);

// Updates today's meal
router.patch("/update/today", mealController.updateMealToday);

// Updates meal on date
router.patch("/update/:date", mealController.updateMealOnDate);

// Removes meal on id
router.delete("/delete/id/:id", mealController.removeMealOnId);

// Removes meal on id
router.delete("/delete/:title", mealController.removeMealsOnTitle); // FOR DEBUGGING ONLY

module.exports = router;
