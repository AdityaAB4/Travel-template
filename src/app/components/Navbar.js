"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const menuItems = [
    { id: 1, link: "/packages", menu: "Packages" },
    { id: 2, link: "/about", menu: "About Us" },
    { id: 3, link: "/contact", menu: "Contact Us" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="text-gray-600 body-font border-solid border-pink-500 border-b-2 sticky top-0 shadow backdrop-blur-lg z-50">
      <div className="container mx-auto p-5 flex flex-wrap items-center justify-between">
        {/* Flex container for logo and hamburger icon */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900"
          >
            <span className="text-xl text-pink-500 border border-pink-400 rounded-full px-2 py-1 hover:bg-pink-600 hover:text-white hover:top-0.5 transition-all duration-300 ease-in-out shadow-inner">
              Travel and Enjoy
            </span>
          </Link>

          {/* Hamburger Icon for Medium Screens */}
          <div className="md:block lg:hidden">
            {/* <button
              id="menu_btn"
              aria-label="menu_button"
              onClick={toggleMenu}
              className="text-3xl text-pink-500"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button> */}
            <button
              id="menu_btn"
              aria-label="menu_button"
              onClick={toggleMenu}
              className="text-3xl text-pink-500  flex items-center justify-center w-10 h-10"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" flex items-center justify-center"
                  >
                    <FaTimes />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" flex items-center justify-center"
                  >
                    <FaBars />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Menu Items for Large Screens */}
        <nav className="hidden lg:flex lg:ml-auto text-gray-700 items-center text-base justify-center space-x-4">
          {menuItems.map((item) => {
            return (
              <Link href={item.link} key={item.id}>
                <span className="block hover:bg-pink-500 hover:text-white rounded-full px-3 py-1 transition-colors duration-300">
                  {item.menu}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Dropdown Menu for Medium Screens */}
        {isMenuOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: isMenuOpen ? "0%" : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-20 left-0 min-h-screen w-full bg-white text-gray-900 shadow-lg z-50"
          >
            {menuItems.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  className="text-lg hover:text-pink-400"
                  onClick={toggleSidebar}
                  key={item.id}
                >
                  <div className="flex flex-col p-6 space-y-4 hover:bg-pink-200">
                    {item.menu}
                  </div>
                  <hr />
                </Link>
              );
            })}
            {/* <nav className="flex flex-col p-6 space-y-4">
              <Link
                href="/"
                className="text-lg hover:text-pink-400"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </nav> */}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
