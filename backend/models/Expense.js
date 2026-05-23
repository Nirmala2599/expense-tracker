const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model("Expense", expenseSchema);