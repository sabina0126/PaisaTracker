import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { db } from "utils/dbConfig"; // Ensure you import the db instance
import { Expenses } from "utils/schema";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db // Use the db instance here
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        refreshData();
        toast("Expense Deleted!");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-primary p-2 mt-3">
        <h2 className="text-white text-sm">Name</h2>
        <h2 className="text-white text-sm">Amount</h2>
        <h2 className="text-white text-sm">Date</h2>
        <h2 className="text-white text-sm">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div key={expense.id} className="grid grid-cols-4 bg-slate-50 p-2">
          <h2 className="text-sm">{expense.name}</h2>
          <h2 className="text-sm">{expense.amount}</h2>
          <h2 className="text-sm">{expense.createdAt}</h2>
          <h2 className="text-sm">
            <Trash
              className="text-red-600 cursor-pointer text-sm"
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
