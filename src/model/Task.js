const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
    validate(t) {
      if (t <= 5) {
        throw new Error("Validate must be at least 5 characters long!");
      }
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
