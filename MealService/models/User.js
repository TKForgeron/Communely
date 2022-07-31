const { default: mongoose, mongo } = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    validate: {
      validator: (v) => v.includes("@"),
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  dob: { type: Date },
  joinedAt: Date,
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = userSchema;
