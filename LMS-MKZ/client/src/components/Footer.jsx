import {
  BsFacebook,
  BsWhatsapp,
  BsYoutube,
  BsInstagram,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/Images/Image from iOS.jpg";

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-gray-200 w-full py-10 px-4 sm:px-6 lg:px-16 font-mulish">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Company Description */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center mb-4">
            <img
              src={logo}
              alt="MZK Learning Logo"
              className="h-16 w-auto sm:h-20 lg:h-24 object-contain rounded-lg shadow-md"
            />
          </div>
          <p className="text-sm text-gray-400 text-center sm:text-left leading-relaxed font-normal">
            MZK Learning Management System empowers education with innovative
            tools and seamless user experiences for learners and educators
            worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm font-normal">
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm font-normal">
            <li>
              <Link
                to="/help"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <a
              href="https://wa.me/923487181867?text=I%20am%20interested%20in%20your%20course"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
            >
              <BsWhatsapp size={24} />
            </a>
            <a
              href="https://youtube.com/@zubairkhan.mzk418?si=6BurZ85PFi0Bu7o5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
            >
              <BsYoutube size={24} />
            </a>
            <a
              href="https://www.facebook.com/share/1A1YQaBZWy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
            >
              <BsFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/mzkdigital?igsh=bjUydTZncDMwN21w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#E4B122] transition-colors duration-300"
            >
              <BsInstagram size={24} />
            </a>
          </div>

          <p className="text-sm text-gray-400 font-normal">
            Email:{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@MZKlearning.com&su=Support%20Request&body=Hi%20MZK%20Learning%2C%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E4B122] hover:underline"
            >
              Learnwithmzkdigital@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-400 font-normal">
            Phone:{" "}
            <a
              href="tel:+923487181867"
              className="text-[#E4B122] hover:underline"
              aria-label="Call MZK Learning support"
            >
              +92 348 7181867
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <span className="text-sm text-gray-400 font-normal">
          &copy; {currentYear} MZK Learning. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
