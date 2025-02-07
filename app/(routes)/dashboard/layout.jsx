"use client";
import React, { useEffect } from "react";
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { db } from "utils/dbConfig";
import { Budgets } from "utils/schema";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    if (!user) return; // Ensure the user exists before querying the database

    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      // If no budgets exist, redirect to the /dashboard/budgets page
      if (result?.length === 0) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error("Error checking user budgets:", error);
      // Optionally, handle errors by showing an alert, toast, etc.
    }
  };

  return (
    <>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </>
  );
}

export default DashboardLayout;
