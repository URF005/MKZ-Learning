import Cookies from "js-cookie";
import { useState } from "react";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import option2 from "../../assets/Json/option2.json";
import Particle from "../../components/Particle";
import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword, login } from "../../redux/slices/AuthSlice";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = import.meta.env.VITE_TOKEN;

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  }

  async function onLogin(event) {
    event.preventDefault();
    const response = await dispatch(login(logInData));
    if (response.payload?.success) {
      navigate("/");
      setLogInData({ email: "", password: "" });
      Cookies.set("authToken", token, { expires: 7 });
    }
  }

  async function onForgotPassword() {
    const response = await dispatch(forgotPassword({ email: logInData.email }));
    if (response.payload?.success) {
      setLogInData({ email: "", password: "" });
    }
  }

  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option2} />

      {/* Login Form */}
      <div className="relative z-10 flex flex-col gap-6 justify-center items-center min-h-screen px-4 font-mulish">
        <motion.form
          onSubmit={onLogin}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
                     rounded-2xl p-8 w-full max-w-md text-white space-y-6"
        >
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-[#E4B122] to-[#c9971a] bg-clip-text text-transparent">
              Sign In
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Please enter your details to access your account
            </p>
          </div>

          {/* Email Input */}
          <div className="flex items-center w-full gap-3 px-4 h-14 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-[#E4B122]">
            <label htmlFor="email" className="text-xl text-[#E4B122] hidden md:block">
              <BsEnvelope />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={logInData.email}
              onChange={handleUserInput}
              className="w-full bg-transparent border-0 outline-0 text-white placeholder-slate-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center w-full gap-3 px-4 h-14 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-[#E4B122]">
            <label htmlFor="password" className="text-xl text-[#E4B122] hidden md:block">
              <BsLock />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={logInData.password}
              onChange={handleUserInput}
              className="w-full bg-transparent border-0 outline-0 text-white placeholder-slate-400"
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#E4B122] text-black font-semibold text-lg 
                       shadow-lg hover:shadow-[0_0_15px_rgba(228,177,34,0.5)] transition-all"
          >
            Sign In
          </motion.button>

          {/* Forgot Password */}
          <p
            onClick={onForgotPassword}
            className="text-right text-slate-400 text-sm cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </motion.form>

        {/* Signup Redirect */}
        <p className="text-white mt-2 text-sm md:text-base">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#E4B122] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </HomeLayout>
  );
}

export default LogIn;
