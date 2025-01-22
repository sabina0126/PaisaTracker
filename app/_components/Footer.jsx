import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <footer id="footer" className="bg-secondary py-10 font-serif">
        <div className="container mx-auto px-2 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex gap-3 items-center md:items-start">
              <img
                src="favicon.ico"
                alt="Paisa Tracker Logo"
                className="w-10 mb-4 border rounded-full"
              />
              <h4 className="font-bold text-xl">Paisa Tracker</h4>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h5 className="font-semibold mb-2">Pages</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h5 className="font-semibold mb-2">Service</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    Financial Reports
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    Savings Plans
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-600">
                    Support & FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h5 className="font-semibold mb-2">Contact</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-teal-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>01-5555555</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-teal-800"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>

                  <span>paisatracker@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-teal-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>Kathmandu, Nepal</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center">
              <h5 className="font-semibold mb-2">Social Media</h5>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-teal-600">
                  <div className="border border-teal-800 rounded-full p-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 text-teal-800 "
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="hover:text-teal-600">
                  <div className="border border-teal-800 rounded-full p-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 text-teal-800"
                      >
                        <path d="M7.75 2h8.5C18.55 2 20 3.45 20 5.75v8.5c0 2.3-1.45 3.75-3.75 3.75h-8.5C5.45 18 4 16.55 4 14.25v-8.5C4 3.45 5.45 2 7.75 2zm0 2C6.8 4 6 4.8 6 5.75v8.5c0 .95.8 1.75 1.75 1.75h8.5c.95 0 1.75-.8 1.75-1.75v-8.5C18 4.8 17.2 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-2.25a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="hover:text-teal-600">
                  <div className="border border-teal-800 rounded-full p-2">
                    <div>
                      <Link href="#" className="hover:text-teal-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 text-teal-800"
                        >
                          <path d="M4.75 3a1.75 1.75 0 110 3.5A1.75 1.75 0 014.75 3zM3 8.25h3.5v12.5H3V8.25zm6.5 0H13v1.85h.05a4.18 4.18 0 013.75-2.07c4 0 4.75 2.63 4.75 6.06v6.66H18v-5.91c0-1.41-.03-3.22-2-3.22-2 0-2.3 1.57-2.3 3.11v6.02h-3.5V8.25z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-teal-700 my-3"></div>
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Paisa Tracker
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
