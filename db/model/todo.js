const mongoose = require("mongoose");

const toDo = mongoose.model("ToDo", {
  toDoTask: {
    type: String,
    required: true,
    index: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: { type: Date, default: Date.now },
  taskPriority: {
    type: Number
  },
  not_completed: {
    type: Boolean
  }
});

module.exports = toDo;
