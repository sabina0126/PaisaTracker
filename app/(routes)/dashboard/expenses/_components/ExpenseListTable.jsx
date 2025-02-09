"use client";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { db } from "utils/dbConfig";
import { Expenses } from "utils/schema";

function ExpenseListTable({ expensesList, refreshData }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Filter expenses by selected month
  const filteredExpenses = expensesList.filter((expense) => {
    return new Date(expense.createdAt).getMonth() + 1 === selectedMonth;
  });

  const deleteExpense = async (expense) => {
    try {
      await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();
      refreshData();
      toast("Expense Deleted!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold mb-2">Expenses List</h2>
      {/* Expense Table */}
      <div className="grid grid-cols-4 bg-primary p-2 mt-3">
        <h2 className="text-white text-sm">Name</h2>
        <h2 className="text-white text-sm">Amount</h2>
        <h2 className="text-white text-sm">Date</h2>
        <h2 className="text-white text-sm">Action</h2>
      </div>

      {filteredExpenses.map((expense) => (
        <div key={expense.id} className="grid grid-cols-4 bg-slate-50 p-2">
          <h2 className="text-sm">{expense.name}</h2>
          <h2 className="text-sm">Rs.{expense.amount}</h2>
          <h2 className="text-sm">{new Date(expense.createdAt).toLocaleDateString()}</h2>
          <h2 className="text-sm">
            <Trash className="text-red-600 cursor-pointer text-sm" onClick={() => deleteExpense(expense)} />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
