const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");


// Add Expense
router.post("/", auth, async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.userId,
  });

  res.json(expense);

  try {
    const { amount, category, note } = req.body;

    const newExpense = new Expense({
      amount,
      category,
      note
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get All Expenses
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({
    user: req.userId,
  });

  res.json(expenses);

  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete Expense
router.delete("/:id", async (req, res) => {
    console.log("DELETE HIT", req.params.id); 
    
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Expense
router.put("/:id", async (req, res) => {
  console.log("PUT HIT", req.params.id, req.body);
  try {
    const { amount, category, note } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, note },
      { new: true } // updated data return aagum
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;