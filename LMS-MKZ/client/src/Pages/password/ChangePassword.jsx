import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { LockKeyhole, CheckCircle } from "lucide-react";

import HomeLayout from "../../layouts/HomeLayout";
import { changePassword, logout } from "../../redux/slices/AuthSlice";

function ChangePassword() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.auth?.data?._id);

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        cnfPassword: "",
        userId,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let hasError = false;

        if (!data.oldPassword || !data.newPassword || !data.cnfPassword) {
            toast.error("All fields are mandatory");
            hasError = true;
        } else if (data.oldPassword === data.newPassword) {
            toast.error("New password and old password should not be the same");
            hasError = true;
        } else if (data.newPassword !== data.cnfPassword) {
            toast.error("New password and confirm password should match");
            hasError = true;
        }

        if (!hasError) {
            const response = await dispatch(changePassword(data));
            if (response.payload?.success) {
                toast.success("Password changed successfully. Please login again.");
                await dispatch(logout());
            }
        }
    }

    return (
        <HomeLayout>
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
                {/* Glow effects */}
                <div className="absolute top-40 -left-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                {/* Form Card */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6"
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <LockKeyhole className="w-12 h-12 text-yellow-400" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Change Password
                        </h1>
                        <p className="text-sm text-gray-300">
                            Enter your current and new password to update your account.
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block mb-1 text-sm font-medium text-gray-300"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Current password"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={data.oldPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block mb-1 text-sm font-medium text-gray-300"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                placeholder="New password"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={data.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="cnfPassword"
                                className="block mb-1 text-sm font-medium text-gray-300"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="cnfPassword"
                                id="cnfPassword"
                                placeholder="Confirm new password"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={data.cnfPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Confirm
                    </motion.button>
                </motion.form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
