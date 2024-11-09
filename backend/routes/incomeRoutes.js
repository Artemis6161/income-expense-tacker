const express = require('express');
const Income = require('../models/IncomeModels');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();



router.post('/income', verifyToken, async (req, res) => {
  try {
    // Logging request data for debugging
    console.log('Received data:', req.body);
    
    const income = new Income({
      ...req.body,
      userId: req.userId, // Make sure the userId is correctly set
    });

    await income.save();
    res.status(201).json(income);
  } catch (error) {
    console.error('Error adding income:', error);  // Log the actual error
    res.status(500).json({ error: 'Error adding income', details: error.message });
  }
});


// Get incomes for the logged-in user only
router.get('/income', verifyToken, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.userId }); // Filter by userId
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching incomes' });
  }
});

// Update income, ensuring only the owner can update
router.put('/income/:id', verifyToken, async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Filter by userId and income ID
      req.body,
      { new: true }
    );
    if (!income) return res.status(404).json({ error: 'Income not found or unauthorized' });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: 'Error updating income' });
  }
});

// Delete income, ensuring only the owner can delete
router.delete('/income/:id', verifyToken, async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!income) return res.status(404).json({ error: 'Income not found or unauthorized' });
    res.status(200).json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting income' });
  }
});

module.exports = router;

