import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Zap } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import {
    getRazorpayKey,
    purchaseCourseBundle,
    verifyUserPayment,
} from "../../redux/slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const razorpay = useSelector((state) => state.razorpay);
    const userdata = useSelector((state) => state.auth?.data);

    const paymentDetails = {
        payment_id: "",
        subscription_id: "",
        razorpay_signature: "",
    };

    // Format price dynamically (PKR)
    const price = new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        minimumFractionDigits: 0,
    }).format(499);

    async function handleSubscription() {
        if (!razorpay.key || !razorpay.subscription_id) {
            toast.error("Something went wrong! Please try again later");
            return;
        }

        const options = {
            key: razorpay.key,
            subscription_id: razorpay.subscription_id,
            name: "Dutta Pvt. LTD",
            description: "Yearly Subscription",
            theme: { color: "#E4B122" }, // brand gold
            prefill: { email: userdata.email, name: userdata.name },
            handler: async function (response) {
                paymentDetails.payment_id = response.razorpay_payment_id;
                paymentDetails.subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                const res = await dispatch(verifyUserPayment(paymentDetails));
                if (res?.payload?.success) {
                    navigate(`/course/${state?.title}/checkout/success`, { state });
                } else {
                    navigate(`/course/${state?.title}/checkout/fail`, { state });
                }
            },
        };

        const paymentObj = new window.Razorpay(options);
        paymentObj.open();
    }

    async function onLoad() {
        await dispatch(getRazorpayKey());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        if (!state) {
            navigate("/courses");
        } else {
            document.title = "Checkout - Learning Management System";
            onLoad();
        }
    }, []);

    return (
        <HomeLayout>
            <div className="flex justify-center items-center min-h-[90vh] px-6 font-mulish">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full max-w-lg p-10 rounded-3xl shadow-2xl
            bg-gradient-to-br from-[#1a1a1a]/90 to-[#2b2b2b]/80 
            backdrop-blur-2xl border border-[#E4B122]/30 flex flex-col items-center gap-8"
                >
                    {/* Subtle glowing background orb */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#E4B122] rounded-full blur-3xl opacity-10 pointer-events-none"></div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#E4B122] to-[#c9971a] bg-clip-text text-transparent">
                            Subscription Bundle
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base">
                            Unlock{" "}
                            <span className="font-semibold text-[#E4B122]">
                                unlimited access
                            </span>{" "}
                            to all courses for{" "}
                            <span className="font-bold text-[#E4B122]">1 year</span>.
                        </p>
                    </div>

                    {/* Price Card */}
                    <div className="flex flex-col items-center gap-1">
                        <p className="flex items-end gap-2 text-green-400">
                            <span className="text-5xl font-extrabold">{price}</span>
                            <span className="text-lg text-gray-400">/year</span>
                        </p>
                        <span className="text-xs text-gray-400">
                            14-day money-back guarantee
                        </span>
                    </div>

                    {/* Perks */}
                    <ul className="w-full text-gray-200 text-sm md:text-base space-y-3">
                        <li className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-[#E4B122]" />
                            Access to all existing courses
                        </li>
                        <li className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-[#E4B122]" />
                            Free access to new launches
                        </li>
                        <li className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#E4B122]" />
                            1-year unlimited learning
                        </li>
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubscription}
                        className="w-full py-3 rounded-xl bg-[#E4B122] text-black font-semibold shadow-lg hover:bg-[#c9971a] transition-all"
                    >
                        Buy Now
                    </motion.button>

                    <p className="text-xs text-gray-400 text-center">
                        Secure payments powered by Razorpay 🔒
                    </p>
                </motion.div>
            </div>
        </HomeLayout>
    );
}

export default Checkout;
