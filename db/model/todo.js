const mongoose = require("mongoose");

const toDo = mongoose.model("ToDo", {
  toDoTask: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number
  }
});

module.exports = toDo;
