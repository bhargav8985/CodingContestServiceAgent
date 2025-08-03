import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/main.png'; 
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Never Miss a Coding Contest Again
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Get personalized daily emails with upcoming contests tailored to your skills and schedule.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            to="/register" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            I Have an Account
          </Link>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium text-gray-900 mb-4">Preview</h3>
          <img 
            src={logo}
            alt="Sample email preview showing contest listings"
            className="rounded border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
