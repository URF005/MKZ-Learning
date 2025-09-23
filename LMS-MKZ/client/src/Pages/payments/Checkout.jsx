import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
            theme: { color: "#facc15" }, // yellow highlight
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
            <div className="flex justify-center items-center min-h-[90vh] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6"
                >
                    {/* Header */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Subscription Bundle
                    </h1>
                    <p className="text-slate-300 text-center leading-relaxed">
                        Unlock{" "}
                        <span className="font-semibold text-yellow-400">
                            unlimited access
                        </span>{" "}
                        to all current and upcoming courses for{" "}
                        <span className="text-yellow-400 font-bold">1 year</span>.
                    </p>

                    {/* Price */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="flex items-end gap-2 text-green-400">
                            <span className="text-5xl font-extrabold">{price}</span>
                            <span className="text-lg text-slate-400">/year</span>
                        </p>
                        <p className="text-slate-400 text-sm">
                            100% refund on cancellation within 14 days
                        </p>
                    </div>

                    {/* Perks */}
                    <ul className="text-slate-200 text-sm md:text-base space-y-2 text-center">
                        <li>✅ Access to all existing courses</li>
                        <li>✅ Free access to newly launched courses</li>
                        <li>✅ 1-year unlimited learning</li>
                    </ul>

                    {/* Buy button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubscription}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all"
                    >
                        Buy Now
                    </motion.button>

                    <p className="text-xs text-slate-400 text-center">
                        Secure payments powered by Razorpay 🔒
                    </p>
                </motion.div>
            </div>
        </HomeLayout>
    );
}

export default Checkout;
