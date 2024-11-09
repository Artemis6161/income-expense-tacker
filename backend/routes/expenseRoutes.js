const express = require('express');
const Expense = require('../models/ExpenseModels'); // Import Expense model
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Add expense (with user ID)
router.post('/expense', verifyToken, async (req, res) => {
  try {
    // Logging request data for debugging
    console.log('Received data:', req.body);

    const expense = new Expense({
      ...req.body,
      userId: req.userId, // Make sure the userId is correctly set
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding expense:', error); // Log the actual error
    res.status(500).json({ error: 'Error adding expense', details: error.message });
  }
});

// Get expenses for the logged-in user only
router.get('/expense', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }); // Filter by userId
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

// Update expense, ensuring only the owner can update
router.put('/expense/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Filter by userId and expense ID
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ error: 'Expense not found or unauthorized' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Error updating expense' });
  }
});

// Delete expense, ensuring only the owner can delete
router.delete('/expense/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!expense) return res.status(404).json({ error: 'Expense not found or unauthorized' });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

module.exports = router;
