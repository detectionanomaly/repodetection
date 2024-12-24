import React from 'react';
import { FaGithub, FaLinkedin, FaPython, FaServer, FaBrain } from 'react-icons/fa';
import me from '../assets/me.jpg'; // Adjust the path as necessary

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
       
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About The Developer
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
        </div>

      
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/3 flex justify-center items-center">
              <img 
                src={me} 
                alt="Developer" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-white mb-4">Namous Nassim</h2>
              <p className="text-gray-300 text-lg mb-6">
              I’m just a dude who’s trying his best to become a solid developer and decent human being somewhere along the way.
              </p>
              <div className="flex space-x-4 mb-8">
                <a 
                  href="https://github.com/NamousNassim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/namous/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <FaLinkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <FaPython className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Python & XGBoost</h3>
            </div>
            <p className="text-gray-300">
              Implementing advanced machine learning algorithms using Python and XGBoost 
              for accurate crime pattern detection and prediction.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <FaServer className="h-8 w-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Spring Boot</h3>
            </div>
            <p className="text-gray-300">
              Building robust and scalable backend services with Spring Boot, ensuring 
              secure and efficient data processing.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <FaBrain className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">AI Integration</h3>
            </div>
            <p className="text-gray-300">
              Seamlessly integrating AI models with web services to provide real-time 
              crime detection and analysis capabilities.
            </p>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">About The Project</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            This crime detection system represents a fusion of modern web technologies 
            and artificial intelligence. By combining Spring Boot's robust backend 
            capabilities with Python's powerful machine learning libraries, particularly 
            XGBoost, we've created a sophisticated platform capable of analyzing and 
            detecting potential criminal activities. The system employs advanced 
            algorithms to process and analyze data, providing law enforcement agencies 
            with valuable insights and predictive capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;