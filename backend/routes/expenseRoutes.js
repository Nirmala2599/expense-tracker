const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");

// Add Expense
router.post("/", auth, async (req, res) => {
  try {
    const { type, category, amount, date, note } = req.body;

    const expense = await Expense.create({
      type,
      category,
      amount,
      date,
      note,
      user: req.userId,
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.userId,
    }).sort({ date: -1 });

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

// Update Expense
router.put("/:id", async (req, res) => {
  try {
    const { type, category, amount, date, note } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        type,
        category,
        amount,
        date,
        note,
      },
      { new: true }
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