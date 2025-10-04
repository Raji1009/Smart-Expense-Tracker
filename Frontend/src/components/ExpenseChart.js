import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { categoryColors } from './utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

const ExpenseChart = ({ expenses }) => {
  // totals by category
  const totals = categories.map(cat => 
    expenses.filter(e => e.category === cat).reduce((s, v) => s + v.amount, 0)
  );

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Spent (₹)',
        data: totals,
        backgroundColor: categories.map(c => categoryColors[c]),
        borderRadius: 6
      }
    ]
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: totals,
        backgroundColor: categories.map(c => categoryColors[c]),
        hoverOffset: 6
      }
    ]
  };

  return (
    <section className="charts card">
      <div className="chart-left">
        <h3>Category Spend (bar)</h3>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="chart-right">
        <h3>Category Split (pie)</h3>
        <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } } }} />
      </div>
    </section>
  );
};

export default ExpenseChart;
