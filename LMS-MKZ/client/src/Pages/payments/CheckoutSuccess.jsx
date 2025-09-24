import Lottie from "lottie-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import animationData from "../../lotties/payment-successful.json";
import { getProfile } from "../../redux/slices/AuthSlice";

function CheckoutSuccess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    async function onLoad() {
        await dispatch(getProfile());
    }

    useEffect(() => {
        if (!state) {
            navigate("/");
        } else {
            document.title = "Checkout Success - Learning Management System";
            onLoad();
        }
    }, []);

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 font-mulish">
            {/* Glowing Orbs */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#E4B122] rounded-full blur-3xl opacity-10 pointer-events-none"></div>

            {/* Success Card */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-green-400/20 flex flex-col items-center gap-6">
                {/* Animation */}
                <Lottie animationData={animationData} loop className="w-56 h-56" />

                {/* Text */}
                <p className="text-center text-lg md:text-xl font-semibold text-gray-200">
                    🎉 Congratulations!{" "}
                    <span className="text-[#E4B122] font-bold">Payment Successful</span>
                </p>
                <p className="text-center text-sm md:text-base text-gray-400">
                    Welcome aboard! You now have{" "}
                    <span className="text-green-400 font-semibold">full access</span> to
                    your course bundle.
                </p>

                {/* CTA */}
                <Link
                    to="/"
                    className="w-full py-3 rounded-xl bg-[#E4B122] text-black font-semibold shadow-lg hover:bg-[#c9971a] transition-all text-center"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
