import Link from "next/link";
import React, { useEffect, useState } from "react";
import { predictExpense } from "utils/randomForest";

function BudgetItem({ budget }) {
  const amount = budget?.amount || 0;
  const totalSpend = budget?.totalSpend || 0;
  const remaining = amount - totalSpend;
  const totalItems = budget?.totalItem || 0;
  const [predictedExpense, setPredictedExpense] = useState("Loading...");

  const progressPercentage =
    Math.min(Math.round((totalSpend / amount) * 100), 100) || 0;

  let progressBarColor = "bg-green-500";
  if (progressPercentage >= 50 && progressPercentage < 80) {
    progressBarColor = "bg-yellow-500"; 
  } else if (progressPercentage >= 80) {
    progressBarColor = "bg-red-500"; 
  }

  useEffect(() => {
    const fetchPrediction = async () => {
      const currentMonth = new Date().getMonth() + 1; // 1-based index
      const result = await predictExpense(currentMonth, budget.name);
      setPredictedExpense(result);
    };

    fetchPrediction();
  }, [budget.name]);

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      aria-label={`View details for ${budget?.name || "budget"}`}
    >
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[190px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl p-3 bg-slate-100 rounded-full">
              {budget?.icon || <span className="text-gray-400">?</span>}
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name || "Untitled Budget"}</h2>
              <h2 className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary">Rs.{amount}</h2>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-slate-400">Rs.{totalSpend} Spent</h2>
            <h2 className="text-xs text-slate-400">
              Rs.{remaining >= 0 ? remaining : 0} Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${progressBarColor}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Prediction Section */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          <span className="font-semibold">Predicted Expense:</span> Rs.{predictedExpense}
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
