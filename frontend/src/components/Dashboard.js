import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CashFlowChart from './barChat';
import "./dashboard.css";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [gainLoss, setGainLoss] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [retirementPlan, setRetirementPlan] = useState({
    current: 0,
    target: 1000000 // Example target balance for early retirement
  });
  const [yearsToRetirement, setYearsToRetirement] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]); // Initially empty

  useEffect(() => {
    fetchTotals();
    fetchMonthlyData(); // Fetch the monthly data for the chart
  }, []);

  const fetchTotals = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const incomeRes = await axios.get('https://income-expense-tacker.onrender.com/api/income', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const expenseRes = await axios.get('https://income-expense-tacker.onrender.com/api/expense', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const incomeSum = incomeRes.data.reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
      const expenseSum = expenseRes.data.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      const balance = incomeSum - expenseSum;
      setTotalIncome(incomeSum);
      setTotalExpense(expenseSum);
      setCurrentBalance(balance);
      setGainLoss(balance);

      // Update retirement plan's current balance
      setRetirementPlan((prev) => ({ ...prev, current: balance }));

      // Calculate years to retirement
      const annualSavings = balance > 0 ? balance : 0;
      const years = annualSavings > 0
        ? Math.ceil((retirementPlan.target - balance) / annualSavings)
        : Infinity;
      setYearsToRetirement(years);
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  const fetchMonthlyData = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const incomeRes = await axios.get('https://income-expense-tacker.onrender.com/api/income', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const expenseRes = await axios.get('https://income-expense-tacker.onrender.com/api/expense', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const monthlyDataArray = processMonthlyData(incomeRes.data, expenseRes.data);
      setMonthlyData(monthlyDataArray);

    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  const processMonthlyData = (incomeData, expenseData) => {
    const monthlyTotals = {};

    incomeData.forEach(({ date, amount }) => {
      const month = new Date(date).toLocaleString('default', { month: 'long' });
      monthlyTotals[month] = monthlyTotals[month] || { income: 0, expense: 0 };
      monthlyTotals[month].income += parseFloat(amount);
    });

    expenseData.forEach(({ date, amount }) => {
      const month = new Date(date).toLocaleString('default', { month: 'long' });
      monthlyTotals[month] = monthlyTotals[month] || { income: 0, expense: 0 };
      monthlyTotals[month].expense += parseFloat(amount);
    });

    return Object.entries(monthlyTotals).map(([month, { income, expense }]) => ({
      month,
      income,
      expense,
    }));
  };

  const isGain = gainLoss >= 0;
  // const retirementStatus = retirementPlan.current >= retirementPlan.target;

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h4>ASSETS</h4>
        <div className="dashboard-row">
          <div className="total-income">
            <h3>Total Income</h3>
            <p>{totalIncome.toFixed(2)}</p>
          </div>
          <div className="total-expense">
            <h3>Total Expense</h3>
            <p>{totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <div className="dashboard-row">
          <div className="gain-loss">
            <h3>Gain/Loss</h3>
            <p style={{ color: isGain ? '#4CAF50' : '#F44336' }}>
              {currentBalance.toFixed(2)}
            </p>
          </div>
          
          <div className="gain-loss">
            <h3>Current Balance</h3>
            <p>{currentBalance.toFixed(2)}</p>
          </div>
        </div>

        <h4>GOALS</h4>
        <div className="retirement-plan">
          <h3 className="dashboard-heading">Early Retirement</h3>
          <div className="retirement-info">
            <div className="current-savings">
              <h3>Current</h3>
              <h2>{retirementPlan.current.toFixed(2)}</h2>
            </div>
            <div className="target-amount">
              <h3>Target</h3>
              <h2>{retirementPlan.target.toFixed(2)}</h2>
            </div>
          </div>
          <p className="years-to-retirement">
            {yearsToRetirement !== Infinity ? `In ${yearsToRetirement.toFixed(1)} years` : "N/A"}
          </p>
        </div>
      </div>

      <div className="dashboard-right">
        <div className="chart-container">
          <CashFlowChart monthlyData={monthlyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
