import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import errorImage from '../assets/Images/error.png';
import Footer from '../components/Footer';

function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found - MZK Learning Management System';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#1A2238] to-[#2A3558] text-white overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Glassmorphism background effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#FACC15]/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#FACC15]/5 rounded-full blur-3xl animate-float delay-700" />
        </div>

        <div className="text-center relative z-10">
          <h1 className="text-7xl sm:text-9xl font-extrabold text-[#FACC15] mb-6 animate-glow">
            404
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-200 mb-4 tracking-tight">
            Page Not Found
          </p>
          <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
            Looks like you've hit a dead end. Let's guide you back to the MZK Learning journey!
          </p>
          <img
            src={errorImage}
            alt="Page not found"
            className="w-full max-w-[350px] sm:max-w-[450px] h-auto mx-auto mb-10 rounded-2xl shadow-xl border border-[#FACC15]/20 hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=404+Error')}
          />
          <Link to="/" className="inline-block group">
            <button className="relative flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-[#1A2238] bg-[#FACC15] rounded-xl overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_4px_14px_rgba(250,204,21,0.4)] group">
              <span className="absolute inset-0 bg-[#FACC15]/70 backdrop-blur-sm group-hover:bg-[#FACC15]/90 transition-all duration-300" />
              <FaArrowLeft size={14} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="relative z-10">Back to Home</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Custom Tailwind CSS for animations (add to your tailwind.config.js or global CSS)
const tailwindConfigExtension = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(250, 204, 21, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(250, 204, 21, 0.6)' },
        },
      },
    },
  },
};
`;

export default NotFound;