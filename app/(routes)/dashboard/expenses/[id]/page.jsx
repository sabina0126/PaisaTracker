"use client";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "utils/dbConfig";
import { Budgets, Expenses } from "utils/schema";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@components/ui/button";
import { ArrowLeft, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";
import MonthSelector from "../_components/MonthSelector";
import ExpenseChart from "../_components/ExpenseChart";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && params?.id) {
      fetchData();
    }
  }, [user, params?.id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([getBudgetInfo(), getExpensesList()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBudgetInfo = async () => {
    if (!user?.primaryEmailAddress?.emailAddress || !params?.id) return;

    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      if (result.length > 0) {
        setBudgetInfo(result[0]);
      } else {
        setBudgetInfo(null); // Handle case where no budget is found
      }
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  const getExpensesList = async () => {
    if (!params?.id) return;

    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  const deleteBudget = async () => {
    if (!params?.id || isDeleting) return;

    setIsDeleting(true);
    try {
      await db.delete(Expenses).where(eq(Expenses.budgetId, params.id));
      await db.delete(Budgets).where(eq(Budgets.id, params.id));
      toast("Budget Deleted!");
      router.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Error deleting budget:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Filter expenses by selected month
  const filteredExpenses = Array.isArray(expensesList)
    ? expensesList.filter((expense) => {
        return new Date(expense.createdAt).getMonth() + 1 === selectedMonth;
      })
    : [];

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />{" "}
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget budgetInfo={budgetInfo} refreshData={fetchData} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex gap-2"
                variant="destructive"
                disabled={isDeleting}
              >
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with your expenses and remove your
                  data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBudget} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading ? (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        ) : budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div>No budget data found</div>
        )}
        <AddExpense budgetId={params?.id} user={user} refreshData={fetchData} />
      </div>

      <div>
        <h2 className="mb-3 font-bold text-2xl">My Expenses</h2>

        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {/* Expense Chart */}
        <ExpenseChart expenses={filteredExpenses} />
        <ExpenseListTable
          expensesList={filteredExpenses}
          refreshData={getExpensesList}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
