import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/modal'; // Import the Modal component

const incomeTypes = [
  { value: 'Salary', label: 'Salary', icon: '💼' },
  { value: 'Freelance', label: 'Freelance', icon: '🖥️' },
  { value: 'Investment', label: 'Investment', icon: '📈' },
  { value: 'Gift', label: 'Gift', icon: '🎁' },
  { value: 'Stock', label: 'Stock', icon: '📊' },
  { value: 'Bitcoin', label: 'Bitcoin', icon: '₿' },
  { value: 'Bank Transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'Other', label: 'Other', icon: '📦' },
];

const Income = () => {
  const [income, setIncome] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });
  const [incomes, setIncomes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(''); 

  useEffect(() => {
    fetchIncomes();
  }, []); // Removed dependency on fetchIncomes

  const fetchIncomes = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get('https://income-expense-tacker.onrender.com/api/income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(res.data);
      calculateTotalIncome(res.data);
    } catch (error) {
      console.error('Error fetching incomes:', error.response ? error.response.data : error);
      toast.error("Failed to fetch income data. Please try again.");
    }
  };

  const calculateTotalIncome = (incomes) => {
    const newTotalIncome = incomes.reduce(
      (sum, entry) => sum + parseFloat(entry.amount),
      0
    );
    setTotalIncome(newTotalIncome);
  };

  const groupIncomesByMonth = (incomes) => {
    const groupedIncomes = {};
    incomes.forEach((income) => {
      const date = new Date(income.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (!groupedIncomes[monthYear]) {
        groupedIncomes[monthYear] = [];
      }
      groupedIncomes[monthYear].push(income);
    });
    return groupedIncomes;
  };

  const filterIncomesByMonth = (incomes, selectedMonth) => {
    if (!selectedMonth) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return incomes.filter(
        (income) =>
          new Date(income.date).getMonth() === currentMonth &&
          new Date(income.date).getFullYear() === currentYear
      );
    }

    const [selectedMonthNum, selectedYear] = selectedMonth.split('-');
    return incomes.filter(
      (income) =>
        new Date(income.date).getMonth() === parseInt(selectedMonthNum) - 1 &&
        new Date(income.date).getFullYear() === parseInt(selectedYear)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
  
    try {
      if (editId) {
        await axios.put(
          `https://income-expense-tacker.onrender.com/api/income/${editId}`,
          income,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        await axios.post(
          'https://income-expense-tacker.onrender.com/api/income',
          income,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
  
      setIncome({ title: '', amount: '', category: '', description: '', date: '' });
      setModalOpen(false);
      fetchIncomes();
    } catch (error) {
      console.error('Error submitting income:', error.response ? error.response.data : error);
      toast.error("Failed to submit income data.");
    }
  };

  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setIncome({ ...income, category: e.target.value });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleEdit = (id) => {
    const incomeToEdit = incomes.find((inc) => inc._id === id);
    setIncome(incomeToEdit);
    setEditId(id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`https://income-expense-tacker.onrender.com/api/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error("Failed to delete income.");
    }
  };

  const groupedIncomes = groupIncomesByMonth(incomes);
  const filteredIncomes = filterIncomesByMonth(incomes, selectedMonth);

  return (
    <>
      <h2>Income</h2>

      <div className="total-income income">
        <h2>
          Total Income: <span>{totalIncome.toFixed(2)}</span>
        </h2>
      </div>

      <div className="expense-container">
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={income.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="amount"
            type="number"
            value={income.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />

          <select
            name="category"
            onChange={handleCategoryChange}
            value={income.category}
            required
          >
            <option value="">Select Category</option>
            {incomeTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <input
            name="description"
            value={income.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="date"
            type="date"
            value={income.date ? income.date.split('T')[0] : ''}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? 'Update Income' : 'Add Income'}</button>
        </form>

        <div className="expense-cards">
          <div className="month-selector">
            <label>Select Month:</label>
            <select value={selectedMonth} onChange={handleMonthChange}>
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
          {filteredIncomes.map((inc) => {
            const incomeType = incomeTypes.find((type) => type.value === inc.category);
            return (
              <div key={inc._id} className="expense-card">
                <h3 className="expense-card-title">{inc.title}</h3>
                <h1 className="expense-card-icon">{incomeType?.icon}</h1>
                <div className="expense-card-details">
                  <p>${inc.amount}</p>
                  <p>{new Date(inc.date).toLocaleDateString()}</p>
                  <p>{inc.description}</p>
                </div>
                <div className="card-buttons">
                  <button onClick={() => handleEdit(inc._id)} className="edit-button">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(inc._id)} className="delete-button">
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
          data={income}
          income={income}
          handleChange={handleChange}
          type="income" 
        />
      </div>
    </>
  );
};

export default Income;