"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

function ExpenseChart({ expenses = [] }) { // Default to empty array
  if (!Array.isArray(expenses)) {
    console.error("ExpenseChart: 'expenses' is not an array", expenses);
    return <p>Error: Expenses data is invalid.</p>;
  }

  // Group expenses by date and sum their amounts
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!expense?.createdAt || !expense?.amount) return acc; // Skip invalid data

    const date = new Date(expense.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Convert grouped data to chart format
  const chartData = Object.keys(groupedExpenses)
    .sort()
    .map((date) => ({
      date,
      amount: groupedExpenses[date],
    }));

  // Define colors for bars (alternating colors for better visibility)
  const colors = ["#388687", "#FFA726", "#AB47BC", "#29B6F6", "#FF7043"];

  return (
    <div className="w-full h-64 bg-white pb-10 rounded-md shadow-md">
      <h2 className="font-semibold text-lg mb-2">Expense Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ left: 7 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount">
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
