import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-slate-300 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GenieAI
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Intelligent
              <span className="block">AI Assistant</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience the power of artificial intelligence with GenieAI. 
              Get instant answers, creative solutions, and intelligent assistance 
              for all your needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={"/signup"} className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200">
                Sign Up
              </Link>
              <Link to={"/login"} className="px-8 py-3 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transform hover:-translate-y-0.5 transition duration-200">
                Login
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg animate-float">
              <img
                src="/bot.png"
                alt="AI Robot Assistant"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default Home;