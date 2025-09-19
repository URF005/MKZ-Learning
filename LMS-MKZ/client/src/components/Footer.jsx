import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 w-full py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Company Description */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-xl font-bold text-[#FACC15]">
              MKZ Learning
            </h2>
          </div>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            MKZ Learning Management System empowers education with innovative tools and seamless user experiences for learners and educators worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">About Us</Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Courses</Link>
            </li>
            <li>
              <Link to="/pricing" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Pricing</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Help Center</Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">FAQ</Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://www.facebook.com/sukomal.dutta.7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300"
            >
              <BsFacebook size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/duttasukomal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300"
            >
              <BsLinkedin size={24} />
            </a>
            <a
              href="https://github.com/Sukomal07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300"
            >
              <BsGithub size={24} />
            </a>
            <a
              href="https://twitter.com/CryptoOrbiT6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300"
            >
              <BsTwitter size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-400">Email: support@mkzlearning.com</p>
          <p className="text-sm text-gray-400">Phone: +1 (800) 123-4567</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm text-gray-400">
          &copy; {currentYear} MKZ Learning. All rights reserved.
        </span>
        <div className="mt-4 sm:mt-0 flex space-x-4 text-sm">
          <Link to="/terms" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Terms</Link>
          <Link to="/privacy" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Privacy</Link>
          <Link to="/cookies" className="text-gray-400 hover:text-[#FACC15] transition-colors duration-300">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;