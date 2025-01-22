import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Correct import from Recharts

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={'70%'} height={300}>
        <BarChart
          data={budgetList}
          margin={{ top: 7 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis className="text-sm" dataKey="name" />
          <YAxis className="text-sm"/>
          <Tooltip  className="text-sm" />
          <Legend  className="text-sm"/>
          <Bar dataKey="totalSpend" stackId="a" fill="#388687" />
          <Bar dataKey="amount" stackId="a" fill="#D7E6E7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
