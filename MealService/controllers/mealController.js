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
  //   console.log(req.body.date);
  //   console.log(typeof req.body.date);

  try {
    const meal = new Meal({
      title: req.body.title,
      date: helpers.checkParseCleanDate(req.body.date).toString(),
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
    const finalDateObj = helpers.checkParseCleanDate(req.params.date, "-");
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
    const finalDateObj = helpers.checkParseCleanDate(req.params.date, "-");
    let [meal] = await Meal.find({
      date: {
        $gte: finalDateObj,
        $lt: helpers.addDays(finalDateObj, 1),
      },
    });
    console.log(helpers.addDays(finalDateObj, 1).toString());

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
    const toBeRemovedMeals = await Meal.where("title").equals(req.params.title);
    await toBeRemovedMeals.forEach((meal) => {
      meal.remove();
    });
    res.status(200).json(toBeRemovedMeals);
  } catch (e) {
    res.json({ message: e.message });
  }
}
