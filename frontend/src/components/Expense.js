import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/modal'; // Import the Modal component
import './expense.css';

const expenseTypes = [
  { value: 'House Rent', label: 'House Rent', icon: '🏠' },
  { value: 'Utilities', label: 'Utilities', icon: '💡' },
  { value: 'Groceries', label: 'Groceries', icon: '🛒' },
  { value: 'Transportation', label: 'Transportation', icon: '🚗' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'Medical', label: 'Medical', icon: '💊' },
  { value: 'Insurance', label: 'Insurance', icon: '🛡️' },
  { value: 'other', label: 'Other', icon: '📦' },
];

const Expense = () => {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(''); // Track selected month

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get('http://localhost:5000/api/expense', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      calculateTotalExpense(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error.response ? error.response.data : error);
    }
  };

  // Group expenses by month and year
  const groupExpensesByMonth = (expenses) => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format as "MM-YYYY"

      if (!groupedExpenses[monthYear]) {
        groupedExpenses[monthYear] = [];
      }

      groupedExpenses[monthYear].push(expense);
    });

    return groupedExpenses;
  };

  // Filter expenses by selected month
  const filterExpensesByMonth = (expenses, selectedMonth) => {
    if (!selectedMonth) {
      const currentMonth = new Date().getMonth(); // 0-indexed
      const currentYear = new Date().getFullYear();
      return expenses.filter(
        (expense) =>
          new Date(expense.date).getMonth() === currentMonth &&
          new Date(expense.date).getFullYear() === currentYear
      );
    }

    const [selectedMonthNum, selectedYear] = selectedMonth.split('-');
    return expenses.filter(
      (expense) =>
        new Date(expense.date).getMonth() === parseInt(selectedMonthNum) - 1 &&
        new Date(expense.date).getFullYear() === parseInt(selectedYear)
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('authToken');

  //   try {
  //     if (editId) {
  //       // Update existing expense
  //       await axios.put(
  //         `http://localhost:5000/api/expense/${editId}`,
  //         expense,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       setEditId(null);
  //     } else {
  //       // Add new expense
  //       await axios.post(
  //         'http://localhost:5000/api/expense',
  //         expense,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     }

  //     setExpense({ title: '', amount: '', category: '', description: '', date: '' });
  //     setModalOpen(false);
  //     fetchExpenses();
  //   } catch (error) {
  //     console.error('Error submitting expense:', error.response ? error.response.data : error);
  //   }
  // };

  // Calculate total expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
  
    try {
      if (editId) {
        // Update existing expense
        await axios.put(
          `http://localhost:5000/api/expense/${editId}`,
          expense,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null); // Reset editId after successful update
      } else {
        // Add new expense
        await axios.post(
          'http://localhost:5000/api/expense',
          expense,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
  
      setExpense({ title: '', amount: '', category: '', description: '', date: '' }); // Clear form
      setModalOpen(false); // Close modal after submit
      fetchExpenses(); // Fetch updated expense list
    } catch (error) {
      console.error('Error submitting expense:', error.response ? error.response.data : error);
    }
  };
  
  
  
  
  const calculateTotalExpense = (expenses) => {
    const newTotalExpense = expenses.reduce(
      (sum, entry) => sum + parseFloat(entry.amount),
      0
    );
    setTotalExpense(newTotalExpense);
  };

  const handleChange = (e) => {
    console.log("Updating field:", e.target.name, "Value:", e.target.value);  // Debug log
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setExpense({ ...expense, category: e.target.value });
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((exp) => exp._id === id);
    setExpense(expenseToEdit); // Set the expense state with the selected expense data
    setEditId(id); // Set the editId to keep track of the item being edited
    setModalOpen(true); // Open the modal for editing
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:5000/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const groupedExpenses = groupExpensesByMonth(expenses);
  const filteredExpenses = filterExpensesByMonth(expenses, selectedMonth);

  return (
    <>
      <h2 >Expenses</h2>
      <div className="total-income expense ">
        <h2>
          Total Expense: <span>{totalExpense.toFixed(2)}</span>
        </h2>
      </div>

     

      <div className="expense-container">
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={expense.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />

          <select
            name="category"
            onChange={handleCategoryChange}
            value={expense.category}
            required
          >
            <option value="">Select Category</option>
            {expenseTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <input
            name="description"
            value={expense.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="date"
            type="date"
            value={expense.date ? expense.date.split('T')[0] : ''}
            onChange={handleChange}
            required
          />
          <button className="form-button" type="submit">{editId ? 'Update Expense' : 'Add Expense'}</button>
        </form>

        <div className="expense-cards">

        <div className="month-selector">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Current Month</option>
          {Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0');
            const year = new Date().getFullYear();
            return (
              <option key={`${month}-${year}`} value={`${month}-${year}`}>
                {`${month}-${year}`}
              </option>
            );
          })}
        </select>
      </div>
      
          {filteredExpenses.map((exp) => {
            const expenseType = expenseTypes.find((type) => type.value === exp.category);
            return (
              <div key={exp._id} className="expense-card">
                <h3 className="expense-card-title">{exp.title}</h3>
                <h1 className="expense-card-icon">{expenseType?.icon}</h1>
                <div className="expense-card-details">
                  <p>${exp.amount}</p>
                  <p>{new Date(exp.date).toLocaleDateString()}</p>
                  <p>{exp.description}</p>
                </div>
                <div className="card-buttons">
                  <button onClick={() => handleEdit(exp._id)} className="edit-button">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(exp._id)} className="delete-button">
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
  isOpen={isModalOpen}
  onClose={() => setModalOpen(false)}
  onSubmit={handleSubmit}
  data={expense}
  expense={expense}
  handleChange={handleChange}  
   type="expense"
/>
      </div>
    </>
  );
};

export default Expense;