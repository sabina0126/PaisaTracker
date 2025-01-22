import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <>
      <section id="features" className="bg-secondary py-10 font-sans">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl text-teal-700 md:text-4xl font-bold mb-4">
              Features
            </h2>
            <div className="mt-2 mx-auto w-16 h-1 mb-5 bg-teal-800" />
          </div>

          <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-8">
            {/* Left Features */}
            <div className="flex flex-col space-y-8 items-center md:items-start">
              <div className="flex items-center space-x-4 bg-teal-100 rounded-lg p-4 shadow-md w-full max-w-sm">
                <Image
                  src="/Expense.PNG"
                  alt="Expense Tracking"
                  width={500}
                  height={500}
                  className="w-12 h-12"
                />
                <div>
                  <span className="font-semibold text-lg">
                    Expense Tracking
                  </span>
                  <p className="text-sm text-gray-500">
                    Keeping track of all personal or business expenses to
                    understand where money is being spent.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-teal-100 border-bold rounded-lg p-4 shadow-md w-full max-w-sm">
                <Image
                  src="/Financial.PNG"
                  width={500}
                  height={500}
                  alt="Financial Reporting"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-semibold text-lg">
                    Financial Reporting
                  </span>
                  <p className="text-sm text-gray-500">
                    Generating summaries and statements to analyze financial
                    performance over time.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Phone Image */}
            <div className="relative justify-center items-center hidden md:flex">
              <Image
                src="/Logo1.PNG"
                alt="img"
                width={500}
                height={500}
                className="absolute w-[60%] max-w-[250px] h-auto object-contain z-10"
              />
              <div className="relative bg-black border-4 border-solid border-teal-800 shadow w-[60%] max-w-[250px] h-[400px] rounded-lg"></div>
            </div>

            {/* Right Features */}
            <div className="flex flex-col space-y-8 items-center md:items-end">
              <div className="flex items-center space-x-4 bg-teal-100 rounded-lg p-4 shadow-md w-full max-w-sm">
                <Image
                  src="/Income.PNG"
                  width={500}
                  height={500}
                  alt="Income Management"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-semibold text-lg">
                    Income/Budgets Management
                  </span>
                  <p className="text-sm text-gray-500">
                    Organizing and controlling income and expenses to ensure
                    financial goals are met.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-teal-100 rounded-lg p-4 shadow-md w-full max-w-sm">
                <Image
                  src="/Visual.PNG"
                  width={500}
                  height={500}
                  alt="Visual Representation"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-semibold text-lg">
                    Visual Representation
                  </span>
                  <p className="text-sm text-gray-500">
                    Using graphs and charts to visually display financial data
                    for easier understanding and analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
