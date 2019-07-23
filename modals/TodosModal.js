const mongoose = require("mongoose");

const Modal = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", Modal);
