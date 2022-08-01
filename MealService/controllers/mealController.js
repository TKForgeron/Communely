const Meal = require("../models/Meal");
const helpers = require("./helpers");

module.exports = {
  addMeal,
  retrieveMealOnId,
  retrieveMealToday,
  retrievePreviousNMeals,
  retrieveMealOnDate,
  updateMealToday,
  updateMealOnDate,
  removeMealOnId,
  removeMealsOnTitle,
};

async function addMeal(req, res) {
  try {
    const meal = new Meal({
      title: req.body.title,
      date: helpers
        .checkParseCleanDate(
          (dateString = req.body.date),
          (sep = "-"),
          (monthStart = 1),
          (dayStart = 0)
        )
        .toString(),
      //   date: req.body.date,
      guests: req.body.guests,
    });
    const savedMeal = await meal.save();
    res.status(200).json(savedMeal);
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function retrieveMealOnId(req, res) {
  try {
    const meal = await Meal.findById(req.params.mealId);
    res.json(meal);
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function retrieveMealToday(req, res) {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const meal = await Meal.find({
      date: {
        $gte: today,
        $lt: helpers.addDays(today, 1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function retrievePreviousNMeals(req, res) {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const meal = await Meal.find({
      date: {
        $gte: helpers.addDays(today, -1 * parseInt(req.params.nDays)),
        $lt: helpers.addDays(today, 1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function retrieveMealOnDate(req, res) {
  try {
    const finalDateObj = helpers.checkParseCleanDate(
      (dateString = req.params.date),
      (sep = "-"),
      (monthStart = 1),
      (dayStart = 1)
    ); // still adds one day to date
    const meal = await Meal.find({
      date: {
        $gte: finalDateObj,
        $lt: helpers.addDays(finalDateObj, 1),
      },
    });
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
}
async function updateMealToday(req, res) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    let [todaysMeal] = await Meal.find({
      date: {
        $gte: today,
        $lt: helpers.addDays(today, 1),
      },
    });

    if (!todaysMeal) {
      throw new Error("Could not find today's meal.");
    }

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
}

async function updateMealOnDate(req, res) {
  try {
    const finalDateObj = helpers.checkParseCleanDate(
      (dateString = req.params.date),
      (sep = "-"),
      (monthStart = 1),
      (dayStart = 1)
    );
    let [meal] = await Meal.find({
      date: {
        $gte: finalDateObj,
        $lt: helpers.addDays(finalDateObj, 1),
      },
    });
    if (!meal) {
      throw new Error(
        `Could not find meal on date ${finalDateObj.toDateString()}`
      );
    }

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
}

async function removeMealOnId(req, res) {
  try {
    const removedMeal = await Meal.findByIdAndRemove(req.params.id);
    res.status(200).json(removedMeal);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function removeMealsOnTitle(req, res) {
  try {
    const mealsToBeRemoved = await Meal.findByTitleAndRemove(req.params.title);
    res.status(200).json(mealsToBeRemoved);
  } catch (e) {
    res.json({ message: e.message });
  }
}
