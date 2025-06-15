import React from "react";
import { Link } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Corner - Logo */}
        <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-200">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <BanknotesIcon className="h-5 w-5 text-white" />
          </div>
          <span>SpendWiseAI</span>
        </Link>
        
        {/* Right Corner - Navigation */}
        <nav className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;