import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { db } from "utils/dbConfig";
import { Expenses } from "utils/schema";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Add a new expense
  const addNewExpense = async () => {
    setLoading(true);

    const numericAmount = Number(amount);
    if (!name.trim() || !amount || numericAmount <= 0 || isNaN(numericAmount)) {
      toast.error("Please provide valid input for name and amount.");
      setLoading(false); // Reset loading state if validation fails
      return;
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: numericAmount,
          budgetId: budgetId,
          createdAt: moment().toISOString(), // Use ISO format for consistency
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        setName(""); // Reset fields only after successful insertion
        setAmount("");
        refreshData(); // Refresh data to reflect changes
        toast.success("New Expense Added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setLoading(false); // Reset loading state in all cases
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <label htmlFor="expense-name" className="text-black font-medium my-1">
          Expense Name
        </label>
        <Input
          id="expense-name"
          placeholder="e.g. Room Decor"
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
          placeholder="e.g. 3000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={loading || !(name && amount)} // Disable button during loading or when inputs are empty
        onClick={addNewExpense}
        className={`mt-3 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Adding..." : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
