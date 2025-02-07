"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close mobile menu after scrolling
    }
  };

  return (
    <header className="py-2 border-b">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        {/* Desktop Navigation */}
        <nav className="font-serif text-black hidden md:flex space-x-6 lg:space-x-7">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:underline"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:underline"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="hover:underline"
          >
            Contact
          </button>
        </nav>

        {/* Logo */}
        <Link href={`/`}>
          <div className="flex items-center">
            <Image
              src={"/Logo.JPG"}
              alt="Paisa Tracker Logo"
              width={50}
              height={50}
              priority
            />
            <h1 className="text-xl lg:text-2xl text-teal-400 font-serif ml-2">
              Paisa Tracker
            </h1>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Auth Section */}
        <div className="relative flex items-center font-serif space-x-4 lg:space-x-6">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link href="/sign-in">
                <button className="border rounded-xl bg-teal-700 px-4 py-2 text-sm lg:text-base text-white">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="border rounded-xl bg-teal-700 px-4 py-2 text-sm lg:text-base text-white">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col mt-4 space-y-2 text-center font-serif text-black">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:underline"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:underline"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="hover:underline"
          >
            Contact
          </button>
        </nav>
      )}
    </header>
  );
}
