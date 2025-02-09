"use client";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "utils/dbConfig";
import { Budgets, Expenses } from "utils/schema";
import ExpenseListTable from "./_components/ExpenseListTable";
import MonthSelector from "./_components/MonthSelector";
import ExpenseChart from "./_components/ExpenseChart";

function ExpensePage() {
  const { user, isLoading } = useUser();

  const [expensesList, setExpensesList] = useState([]);
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (user) {
      getBugdetList();
      getAllExpenses();
    }
  }, [user]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Filter expenses by selected month
  const filteredExpenses = Array.isArray(expensesList)
    ? expensesList.filter((expense) => {
        return new Date(expense.createdAt).getMonth() + 1 === selectedMonth;
      })
    : [];

  // Fetch budget list
  const getBugdetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  // Fetch all expenses
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">

      <h2 className="mb-3 font-bold text-2xl">My Expenses</h2>

      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {/* Expense Chart */}
      <ExpenseChart expenses={filteredExpenses} />

      <ExpenseListTable
        expensesList={filteredExpenses}
        refreshData={() => {
          getBugdetList();
          getAllExpenses();
        }}
      />
    </div>
  );
}

export default ExpensePage;
