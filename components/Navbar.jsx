"use client";

import Link from "next/link";
import logo from "./assets/img/logo.png";

const Navbar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    console.log("Logged out.");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img className="w-auto h-auto" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center ">
          <ul className="flex space-x-4 ">
            <li>
              <Link href="/admin" className="text-gray-800 hover:text-blue-600">
                ADMIN
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                className="text-gray-800 hover:text-blue-600"
              >
                ARTICLE
              </Link>
            </li>
            <li>
              <Link
                href="/document"
                className="text-gray-800 hover:text-orange-500"
              >
                DOCUMENT
              </Link>
            </li>
          </ul>
          <button
            className="ml-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-500"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
