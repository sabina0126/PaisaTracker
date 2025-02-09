import React from "react";
import { predictExpense } from "utils/randomForest";

function Prediction({ budgetName }) {
  const currentMonth = new Date().getMonth() + 1; // 1-based index
  const predictedExpense = predictExpense(currentMonth, budgetName);

  return (
    <div className="mt-3 text-xs text-gray-500 text-center">
      <span className="font-semibold">Predicted Expense:</span>{" "}
      {typeof predictedExpense === "number"
        ? `Rs.${predictedExpense}`
        : predictedExpense} {/* Show message if unavailable */}
    </div>
  );
}

export default Prediction;
