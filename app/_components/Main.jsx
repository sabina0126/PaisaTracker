"use client"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Main() {
  const { user, isSignedIn } = useUser();
  return (
    <>
      <div>
        <section className="py-8 md:pb-8 overflow-hidden">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            {/* Text content */}
            <div className="font-serif md:w-1/2 px-4 text-center md:text-left z-30">
              <h2 className="text-5xl md:text-5xl font-bold mb-4 text-black">
                Welcome to the Paisa Tracker
              </h2>
              <p className="text-lg mb-6 text-gray-500">
                Manage your finance and be a saving expert.
              </p>
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-950 transition-colors duration-300"
                >
                  Get Started
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-950 transition-colors duration-300"
                >
                  Get Started
                </Link>
              )}
            </div>
            <div className="relative pb-10 md:w-1/2 flex justify-center md:mt-0 z-10">
              {/* Image */}
              <div className="absolute top-0 left-0 right-0 flex justify-center items-center mb-10">
                <Image
                  src="/Vector image.PNG"
                  width={500}
                  height={300}
                  alt="vector"
                  className="object-contain"
                />
              </div>
              <Image
                src="/Homepage.PNG"
                alt="img"
                width={500}
                height={500}
                className="transition-transform duration-500 hover:scale-105 object-cover"
              />
            </div>
          </div>
        </section>
        <Image
          src="/dashboard.png"
          alt="dashboard"
          width={1000}
          height={700}
          className="my-5 md:ml-48 rounded-xl border-2 sm:ml-0"
        />
      </div>
    </>
  );
}
