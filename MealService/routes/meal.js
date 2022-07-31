const express = require("express");
const router = express();
const Meal = require("../models/Meal");

// Adding addDays functionality to Date class
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Function that applies regex and parses datestrings
function checkParseCleanDate(datestring, sep = "-") {
  const regexForDate =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const reMatches = datestring.match(regexForDate);
  if (!reMatches) {
    throw new Error(
      "Date passed was not formatted correctly. Please use the following format: DD-MM-YYYY, e.g. 30-07-2022"
    );
  }
  const dateString = reMatches[datestring.search(regexForDate)];
  const dateStringList = dateString.split(sep);
  const finalDateObj = new Date([
    dateStringList[1],
    dateStringList[0],
    dateStringList[2],
  ]);
  finalDateObj.setHours(0, 0, 0, 0);

  return finalDateObj;
}

// Adds a meal
router.post("/add", async (req, res) => {
  const body = req.body;

  const meal = new Meal({
    title: body.title,
    date: body.date,
    guests: body.guests,
  });

  try {
    const savedMeal = await meal.save();
    res.status(200).json(savedMeal);
  } catch (err) {
    console.log(err.message);
    res.json({ message: err });
  }

  console.log(meal);
});

// Retrieves a meal on id
router.get("/id/:mealId", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.mealId);
    res.json(meal);
  } catch (err) {
    res.json({ message: err });
  }
});

// Retrieves today's meal
router.get("/today", async (req, res) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const meal = await Meal.find({
      date: {
        $gte: today,
        $lt: today.addDays(1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

// Retrieves last n meals
router.get("/previous/:nDays", async (req, res) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const meal = await Meal.find({
      date: {
        $gte: today.addDays(-1 * parseInt(req.params.nDays)),
        $lt: today.addDays(1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

// Retrieves a meal on date
router.get("/:date", async (req, res) => {
  try {
    const date = checkParseCleanDate(req.params.date, "-");
    const meal = await Meal.find({
      date: {
        $gte: date,
        $lt: date.addDays(1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

// Updates today's meal
router.patch("/update/today", async (req, res) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    let [todaysMeal] = await Meal.find({
      date: {
        $gte: today,
        $lt: today.addDays(1),
      },
    });

    if (req.body.title) {
      todaysMeal.title = req.body.title;
    }
    if (req.body.guests) {
      todaysMeal.guests = req.body.guests;
    }

    const savedMeal = await todaysMeal.save();
    res.status(200).json(savedMeal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

// Updates meal on date
router.patch("/update/:date", async (req, res) => {
  try {
    const finalDateObj = checkParseCleanDate(req.params.date, "-");
    let [meal] = await Meal.find({
      date: {
        $gte: finalDateObj,
        $lt: finalDateObj.addDays(1),
      },
    });

    console.log(meal);

    if (req.body.title) {
      meal.title = req.body.title;
    }
    if (req.body.guests) {
      meal.guests = req.body.guests;
    }

    const savedMeal = await meal.save();
    res.status(200).json(savedMeal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

// Drops meal on id
router.delete("/delete/:id", async function (req, res) {
  try {
    const removedMeal = await Meal.findByIdAndRemove(req.params.id);
    res.status(200).json(removedMeal);
  } catch (e) {
    res.json({ message: e.message });
  }
});

module.exports = router;
