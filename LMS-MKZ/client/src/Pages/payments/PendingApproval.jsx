import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import animationData from "../../lotties/pending.json"; // create a new lottie file or reuse existing

function PendingApproval() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    } else {
      document.title = "Payment Pending Approval - Learning Management System";
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 font-mulish">
      {/* Background glow */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-yellow-400/20 flex flex-col items-center gap-6"
      >
        {/* Animation */}
        <Lottie animationData={animationData} loop className="w-56 h-56" />

        {/* Text */}
        <p className="text-center text-lg md:text-xl font-semibold text-gray-200">
          Payment <span className="text-yellow-400 font-bold">Pending</span>
        </p>
        <p className="text-center text-sm md:text-base text-gray-400">
          We’ve received your payment receipt. Our admin team will review and
          approve it shortly.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full py-3 rounded-xl bg-[#E4B122] text-black font-semibold shadow-lg hover:bg-[#c9971a] transition-all text-center"
        >
          Go to Profile
        </button>
      </motion.div>
    </div>
  );
}

export default PendingApproval;
