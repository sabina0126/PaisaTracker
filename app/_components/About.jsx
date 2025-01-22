import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <>
      <section id='about' className="font-serif">
          <div className="container pt-24 md:pt-3 flex flex-col items-center md:flex-row md:items-center">
            {/* Image Section */}
            <div className="relative pb-10 md:w-1/2 flex justify-center mt-10 md:mt-0 z-10">
              <div className="relative flex justify-center items-center pt-8">
                {/* Dashed Border Circle */}
                <div className="absolute z-0 border-2 border-dashed border-gray-500 rounded-full w-[60vw] h-[60vw] max-w-[300px] max-h-[300px]"></div>
                {/* Background Circle */}
                <div className="absolute z-10 flex items-center justify-center w-[50vw] max-w-[250px] h-[50vw] max-h-[250px] bg-teal-100 rounded-full">
                  {/* Image */}
                  <img
                    src="/About.png"
                    alt="Businessman Icon"
                    className="z-20 object-cover h-auto transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="font-serif py-28 md:w-1/2 px-6 md:px-4 text-center md:text-left">
              <h2 className="text-3xl text-teal-700 md:text-4xl font-bold mb-4">
                About Us
              </h2>
              <div className="w-16 h-1 bg-teal-700 mx-auto md:mx-0 mb-5"></div>
              <p className="text-sm mb-6">
                Paisa Tracker is your simple, effective tool for managing
                personal finances. From tracking expenses to setting savings
                goals, we help you stay on top of your money and make smarter
                financial decisions.
              </p>
              <p className="text-sm pb-6">
                Let us guide you toward a more secure financial future!
              </p>
              <Link
                href="/sign-in"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
    </>
  )
}
