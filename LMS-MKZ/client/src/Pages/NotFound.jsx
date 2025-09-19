import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import errorImage from '../assets/Images/error.png';
import Footer from '../components/Footer';

function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found - MKZ Learning Management System';
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#1A2238] to-[#2A3558] text-white">
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4 animate-pulse">404</h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-md">
            It seems you've ventured off the path. Let's get you back to learning with MKZ!
          </p>
          <img
            src={errorImage}
            alt="Page not found"
            className="w-full max-w-[400px] sm:max-w-[500px] h-auto mx-auto mb-8 opacity-80"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=404+Error')}
          />
          <Link to="/" className="inline-block">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-bold text-black bg-[#FACC15] rounded-lg hover:bg-[#E5B814] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              <FaArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;