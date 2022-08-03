const { default: mongoose, mongo } = require("mongoose");
const userSchema = require("./User");
const helpers = require("../controllers/helpers");

const mealSchema = mongoose.Schema({
  title: String,
  date: {
    type: Date,
    required: true,
    unique: true,
    // default: Date.now, // without it, dates are always saved in with consistent h:m:s:ms values
  },
  guests: [
    {
      type: {
        user: { type: userSchema, required: true },
        status: {
          type: String,
          enum: ["cook", "eat", "ask", "absent"],
          required: true,
        },
        guests: { type: Number, default: 0, required: true },
      },
      required: true,
    },
  ],
});

mealSchema.statics.findByTitle = function (title) {
  return this.find({ title: new RegExp(title, "i") });
};

mealSchema.statics.findByTitleAndRemove = async function (title) {
  const mealsToBeRemoved = await this.findByTitle(title);
  await mealsToBeRemoved.forEach((meal) => {
    meal.remove();
  });
  return mealsToBeRemoved;
};

mealSchema.statics.findByDate = function (date) {
  // works same as method used in this.findByTitle()
  return this.where("date")
    .gte(helpers.addDays(date, 0).getTime())
    .lt(helpers.addDays(date, 1).getTime());

  // return this.find({
  //   date: {
  //     $gte: helpers.addDays(date, 0).getTime(),
  //     $lt: helpers.addDays(date, 1).getTime(),
  //   },
  // });
};

mealSchema.statics.findByDateBetween = function (date1, date2) {
  // works same as method used in this.findByTitle()
  return this.where("date").gte(date1.getTime()).lt(date2.getTime());
};

module.exports = mongoose.model("Meals", mealSchema);
