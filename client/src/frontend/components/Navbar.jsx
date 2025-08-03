import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMail,  FiLogOut, FiUser  } from 'react-icons/fi';
import logo from '../assets/logo.png'; 
export const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Title */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Logo"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900 hidden md:inline">
                Contest Mailer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
            >
              <FiCalendar className="mr-1" /> Contest Preferences
            </Link>
            <Link
              to="/preferences"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
            >
              <FiMail className="mr-1" /> Email Preferences
            </Link>
            {user && (
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
              >
                <FiUser  className="mr-1" /> Profile
              </Link>
            )}
          </div>

          {/* User/Auth Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm text-gray-500">
                  {user.email}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center p-2 rounded-full hover:bg-gray-100 text-gray-700 transition duration-200"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by default) */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link
            to="/dashboard"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
          >
            <FiCalendar className="mr-2" /> Contests
          </Link>
          <Link
            to="/preferences"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
          >
            <FiMail className="mr-2" /> Email Preferences
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
              >
                <FiUser  className="mr-2" /> Profile
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 transition duration-200"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
