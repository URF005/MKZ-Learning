// U:\LMS-MKZ\client\src\Pages\payments\Checkout.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Smartphone, Banknote } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { uploadReceipt } from "../../Redux/slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const userdata = useSelector((s) => s.auth?.data);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const price = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(499);

  async function handleConfirmPayment(e) {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload your payment receipt first.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", state?._id);
    formData.append("receipt", selectedFile);

    await dispatch(uploadReceipt(formData));

    toast.info("Receipt uploaded. Awaiting admin approval.");
    navigate("/checkout/pending", { state });
  }

  function handleFileChange(file) {
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    } else {
      document.title = "Checkout - Learning Management System";
    }
  }, []);

  // 🚫 If user already has pending or active subscription → block re-upload
  if (
    userdata?.subscription?.status === "pending" ||
    userdata?.subscription?.status === "active"
  ) {
    return (
      <HomeLayout>
        <div className="flex items-center justify-center min-h-[80vh] text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/60 border border-[#E4B122]/40 p-8 rounded-2xl shadow-lg max-w-lg"
          >
            <h2 className="text-2xl font-bold text-[#E4B122] mb-4">
              Subscription Status
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              You already have a{" "}
              <span className="font-semibold text-[#E4B122]">
                {userdata.subscription.status}
              </span>{" "}
              subscription. <br />
              {userdata.subscription.status === "pending"
                ? "Please wait for admin approval."
                : "You already have an active subscription."}
            </p>
          </motion.div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[90vh] px-4 sm:px-6 md:px-8 font-mulish">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 
                     p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl
                     bg-gradient-to-br from-[#1a1a1a]/90 to-[#2b2b2b]/80 
                     backdrop-blur-2xl border border-[#E4B122]/30 flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold 
                           bg-gradient-to-r from-[#E4B122] to-[#c9971a] 
                           bg-clip-text text-transparent leading-snug">
              Subscription Bundle
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base px-2">
              Pay via{" "}
              <span className="font-semibold text-[#E4B122]">
                Easypaisa, JazzCash, or Bank Transfer
              </span>{" "}
              to unlock unlimited learning for{" "}
              <span className="font-bold text-[#E4B122]">1 year</span>.
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-col items-center gap-1">
            <p className="flex flex-wrap justify-center items-end gap-1 sm:gap-2 text-green-400">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                {price}
              </span>
              <span className="text-sm sm:text-base md:text-lg text-gray-400">
                /year
              </span>
            </p>
            <span className="text-[10px] sm:text-xs text-gray-400 text-center">
              14-day money-back guarantee
            </span>
          </div>

          {/* Account Details */}
          <div className="w-full bg-gray-800/60 rounded-xl p-4 sm:p-6 
                          border border-[#E4B122]/40 space-y-3 sm:space-y-4 
                          text-xs sm:text-sm md:text-base text-gray-200">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#E4B122] mb-1">
              Payment Instructions
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" />
                <span>
                  Easypaisa: <b>0345-1234567</b> (Account Name: <b>ABC LMS</b>)
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
                <span>
                  JazzCash: <b>0301-9876543</b> (Account Name: <b>ABC LMS</b>)
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                <span>
                  Bank: <b>MCB</b> – Acc#: <b>01234567890123</b>{" "}
                  (Title: <b>ABC LMS</b>)
                </span>
              </p>
            </div>

            {/* Upload Section */}
            <div className="mt-4 w-full">
              <label className="block text-sm font-medium mb-2 text-[#E4B122]">
                Upload Payment Receipt
              </label>

              <label
                htmlFor="receipt-upload"
                className="flex flex-col items-center justify-center w-full h-28 
                           border-2 border-dashed border-[#E4B122]/50 rounded-xl 
                           cursor-pointer bg-gray-900/40 hover:bg-gray-800/50 
                           transition-all duration-300"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Receipt Preview"
                    className="max-h-24 rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-400 text-xs sm:text-sm text-center">
                    Click to choose or drag & drop your receipt here
                  </p>
                )}
                <input
                  id="receipt-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
              </label>

              {selectedFile && (
                <p className="mt-2 text-green-400 text-xs sm:text-sm truncate">
                  📄 {selectedFile.name}
                </p>
              )}

              <p className="mt-2 text-[10px] sm:text-xs text-gray-400">
                Accepted formats: JPG, PNG (Max size: 5MB)
              </p>
            </div>
          </div>

          {/* Buy Now Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirmPayment}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-[#E4B122] 
                       text-black text-sm sm:text-base font-semibold 
                       shadow-lg hover:bg-[#c9971a] transition-all"
          >
            Buy Now
          </motion.button>

          <p className="text-[10px] sm:text-xs text-gray-400 text-center">
            Secure local transactions 🔒
          </p>
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
