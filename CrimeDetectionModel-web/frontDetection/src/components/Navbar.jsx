import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Shield className="h-8 w-8 text-red-600" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl">Crime Detection</span>
              <span className="text-red-600 text-xs font-semibold">Security & Surveillance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Analysis
            </Link>
            <Link to="/reports" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Reports
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              About
            </Link>
            <button 
              onClick={() => navigate('/login')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 transition-colors duration-200"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-b-lg">
              <button 
                onClick={() => handleNavigation('/')}
                className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/analysis')}
                className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Analysis
              </button>
              <button 
                onClick={() => handleNavigation('/reports')}
                className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                About
              </button>
              <div className="pt-4 space-y-2">
                <button 
                  onClick={() => handleNavigation('/login')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavigation('/register')}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 transition-colors duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;