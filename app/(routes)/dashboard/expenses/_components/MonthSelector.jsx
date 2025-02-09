"use client";
import React, { useState } from "react";

function MonthSelector({ selectedMonth, setSelectedMonth }) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="mb-4 flex gap-2">
      {months.map((month, index) => (
        <button
          key={index}
          className={`px-3 py-1 text-sm rounded-md ${
            selectedMonth === index + 1 ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedMonth(index + 1)}
        >
          {month}
        </button>
      ))}
    </div>
  );
}

export default MonthSelector;
