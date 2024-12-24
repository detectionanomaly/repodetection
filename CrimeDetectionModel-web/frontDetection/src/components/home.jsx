import React from 'react';
import { FaShieldAlt, FaCogs, FaChartLine, FaUserShield } from 'react-icons/fa';
import heroVideo from '../assets/hero.mp4'; // Adjust the path as necessary

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Crime Detection
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Leveraging AI to enhance public safety and security.
          </p>
          <video 
            src={heroVideo} 
            alt="Crime Detection" 
            className="w-full h-96 object-cover rounded-xl shadow-2xl"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaShieldAlt className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Monitoring</h3>
            <p className="text-gray-300">
              Continuous surveillance and monitoring to detect and prevent crimes in real-time.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaCogs className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">
              Utilizing advanced analytics to identify crime patterns and trends.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaChartLine className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Predictive Insights</h3>
            <p className="text-gray-300">
              Providing predictive insights to help law enforcement agencies stay ahead.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaUserShield className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Enhanced Security</h3>
            <p className="text-gray-300">
              Ensuring enhanced security through AI-driven crime detection solutions.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Us in Making the World Safer</h2>
          <p className="text-gray-300 text-lg mb-8">
            Get started with our AI-powered crime detection system today.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;