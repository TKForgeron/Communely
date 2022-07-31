const { default: mongoose, mongo } = require("mongoose");
const userSchema = require("./User");

const mealSchema = mongoose.Schema({
  title: String,
  date: {
    type: Date,
    required: true,
    unique: true,
    // default: Date.now,
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

module.exports = mongoose.model("Meals", mealSchema);
