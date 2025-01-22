import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const amount = budget?.amount || 0;
  const totalSpend = budget?.totalSpend || 0;
  const remaining = amount - totalSpend;
  const totalItems = budget?.totalItem || 0;

  const progressPercentage =
    Math.min(Math.round((totalSpend / amount) * 100), 100) || 0;

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      aria-label={`View details for ${budget?.name || "budget"}`}
    >
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[150px]">
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
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
