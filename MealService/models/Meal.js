const { default: mongoose, mongo } = require("mongoose");
const userSchema = require("./User");

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
  return this.where("title").equals(new RegExp(title, "i"));
};

mealSchema.statics.findByTitleAndRemove = async function (title) {
  const mealsToBeRemoved = await this.findByTitle(title);
  await mealsToBeRemoved.forEach((meal) => {
    meal.remove();
  });
  return mealsToBeRemoved;
};

module.exports = mongoose.model("Meals", mealSchema);
