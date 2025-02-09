"use client";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { db } from "utils/dbConfig";
import { Expenses, Budgets } from "utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { eq, sum } from "drizzle-orm";

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const addNewExpense = async () => {
    try {
      setLoading(true);

      // Convert amount to a number
      const expenseAmount = parseFloat(amount);
      if (!name.trim()) {
        toast.error("Please enter a valid expense name.");
        return;
      }
      if (isNaN(expenseAmount) || expenseAmount <= 0) {
        toast.error("Please enter a valid expense amount.");
        return;
      }

      // Fetch budget details
      const budgetData = await db
        .select({ amount: Budgets.amount })
        .from(Budgets)
        .where(eq(Budgets.id, budgetId))
        .limit(1);

      if (!budgetData.length) {
        toast.error("Budget not found.");
        return;
      }

      const budgetAmount = Number(budgetData[0]?.amount) || 0;

      // Fetch total expenses for the selected budget
      const currentExpensesData = await db
        .select({ total: sum(Expenses.amount) })
        .from(Expenses)
        .where(eq(Expenses.budgetId, budgetId));

      const currentExpenses = Number(currentExpensesData[0]?.total) || 0;
      const totalExpenses = currentExpenses + expenseAmount;

      if (totalExpenses > budgetAmount) {
        toast.error(
          `Budget exceeded! Total expenses: Rs.${totalExpenses}, Budget: Rs.${budgetAmount}`
        );
        return;
      }

      // Add the new expense
      await db.insert(Expenses).values({
        amount: expenseAmount,
        name: name.trim(),
        budgetId: budgetId,
        createdAt: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      });

      toast.success("Expense added successfully!");
      refreshData();
    } catch (error) {
      toast.error("Failed to add expense. Please try again.");
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
      setAmount("");
      setName("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Add Expense</h2>
      <div className="mt-2">
        <label htmlFor="expense-name" className="text-black font-medium my-1">
          Expense Name
        </label>
        <Input
          id="expense-name"
          placeholder="e.g., Groceries"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="expense-amount" className="text-black font-medium my-1">
          Expense Amount
        </label>
        <Input
          id="expense-amount"
          type="number"
          placeholder="e.g., 3000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={loading || !(name.trim() && amount)}
        onClick={addNewExpense}
        className={`mt-3 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Adding..." : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
