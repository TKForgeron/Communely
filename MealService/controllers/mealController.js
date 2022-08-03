const Meal = require("../models/Meal");
const helpers = require("./helpers");

module.exports = {
  addMeal,
  retrieveMealOnId,
  retrieveMealOnDate,
  retrieveMealToday,
  retrievePreviousNMeals,
  retrieveNextNMeals,
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
    const today = helpers.retrieveTodaysDate();
    const meal = await Meal.findByDate(today);
    res.status(200).json(meal);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function retrieveMealOnDate(req, res) {
  try {
    const finalDateObj = helpers.checkParseCleanDate(
      (dateString = req.params.date),
      (sep = "-"),
      (monthStart = 1),
      (dayStart = 0)
    ); // still adds one day to date
    const meal = await Meal.findByDate(finalDateObj);
    res.json(meal);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function retrievePreviousNMeals(req, res) {
  try {
    const nDays = Number(req.params.nDays); // better to use Number() than parseInt()
    if (!nDays && nDays != 0) {
      throw new Error(
        `Could not parse given number of days, req.params.nDays: ${req.params.nDays}`
      );
    } else if (nDays < 1) {
      throw new Error(
        `Please give a positive number of days, req.params.nDays: ${req.params.nDays}`
      );
    }
    const today = helpers.retrieveTodaysDate();
    const nDaysBack = helpers.addDays(today, -nDays);
    const meals = await Meal.findByDateBetween(nDaysBack, today);
    res.json(meals);
  } catch (e) {
    res.json({ message: e.message });
  }
}

// NOT TESTED
async function retrieveNextNMeals(req, res) {
  try {
    const nDays = Number(req.params.nDays); // better to use Number() than parseInt()
    if (!nDays && nDays != 0) {
      throw new Error(
        `Could not parse given number of days, req.params.nDays: ${req.params.nDays}`
      );
    } else if (nDays < 1) {
      throw new Error(
        `Please give a positive number of days, req.params.nDays: ${req.params.nDays}`
      );
    }
    const today = helpers.retrieveTodaysDate();
    const nDaysBack = helpers.addDays(today, nDays);
    const meals = await Meal.findByDateBetween(nDaysBack, today);
    res.json(meals);
  } catch (e) {
    res.json({ message: e.message });
  }
}

async function updateMealToday(req, res) {
  const today = helpers.retrieveTodaysDate();
  try {
    const [todaysMeal] = await Meal.findByDate(today);

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
  const date = helpers.checkParseCleanDate(
    (dateString = req.params.date),
    (sep = "-"),
    (monthStart = 1),
    (dayStart = 0)
  );
  try {
    const [meal] = await Meal.findByDate(date);
    if (!meal) {
      throw new Error(`Could not find meal on date ${date.toDateString()}`);
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
    res.json({
      message: e.message,
      messageFromDeveloper: `Probably unknown id: ${req.params.id}`,
    });
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
