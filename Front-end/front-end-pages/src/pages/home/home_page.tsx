import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">BITS</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 font-medium">
                Help
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About Us
              </Link>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Login
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/help" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Help
            </Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              About Us
            </Link>
            <button className="block w-full px-4 py-2 bg-blue-600 text-white text-center hover:bg-blue-700">
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center bg-blue-100 text-center py-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Whats First</h2>
        <p className="text-lg text-gray-600 mb-6">
          Whats First helps you manage client interactions and call analytics with powerful reporting tools.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </header>

      {/* Service Description Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Call Tracking and Analytics</h4>
            <p className="text-gray-600">Track and analyze your calls with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">📋</div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Client Management Dashboard</h4>
            <p className="text-gray-600">Manage your clients efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">📈</div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Custom Reporting</h4>
            <p className="text-gray-600">Generate reports tailored to your needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">🔔</div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Real-Time Notifications</h4>
            <p className="text-gray-600">Stay updated with instant alerts.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm">Copyright © BITS 2025</p>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-white">
                Help
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;