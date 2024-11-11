// src/components/CashFlowChart.js

import React from 'react';
import { Chart } from 'react-google-charts';
import "./dashboard.css"
const CashFlowChart = ({ monthlyData }) => {
  // Prepare data array for Google Charts
  const data = [
    ['Month', 'Income', 'Expenses'],
    ...monthlyData.map(({ month, income, expense }) => [month, income, expense]),
  ];

  const options = {
    title: 'Monthly Cash Flow',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Amount',
      minValue: 0,
    },
    vAxis: {
      title: 'Month',
    },
    legend: { position: 'top' },
    bars: 'horizontal',
    colors: ['#76C7C0', '#FF5733'], // Customize bar colors
  };

  return (
    <div >

      <div >


        <Chart
          chartType="BarChart"
          width="500px"
          height="200px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default CashFlowChart;
