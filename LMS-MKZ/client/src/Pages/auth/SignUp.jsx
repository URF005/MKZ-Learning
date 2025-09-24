import Cookies from "js-cookie";
import { useState } from "react";
import { BsCloudUpload, BsEnvelope, BsLock, BsPerson } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import option3 from "../../assets/Json/option3.json";
import Particle from "../../components/Particle";
import HomeLayout from "../../Layouts/HomeLayout";
import { signup } from "../../redux/slices/AuthSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = import.meta.env.VITE_TOKEN;

  const [viewImage, setViewImage] = useState("");
  const [signUpData, setSignUpData] = useState({
    avatar: "",
    name: "",
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignUpData({ ...signUpData, avatar: uploadedImage });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => setViewImage(fileReader.result);
    }
  }

  async function createAccount(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", signUpData.avatar);
    formData.append("name", signUpData.name);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);

    const response = await dispatch(signup(formData));
    if (response.payload?.success) {
      navigate("/");
      setSignUpData({
        avatar: "",
        name: "",
        email: "",
        password: "",
      });
      setViewImage("");
      Cookies.set("authToken", token, { expires: 7 });
    }
  }

  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option3} />

      {/* SignUp Form */}
      <div className="relative z-10 flex flex-col gap-6 justify-center items-center min-h-screen px-4 font-mulish">
        <motion.form
          onSubmit={createAccount}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
                     rounded-2xl p-8 w-full max-w-md text-white space-y-6"
        >
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-[#E4B122] to-[#c9971a] bg-clip-text text-transparent">
              Sign Up
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Fill in your details to create a new account
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            {viewImage ? (
              <img
                src={viewImage}
                alt="avatar"
                className="rounded-full w-14 h-14 object-cover border-2 border-[#E4B122]"
              />
            ) : (
              <label
                htmlFor="image"
                className="text-xl text-[#E4B122] cursor-pointer hidden md:block"
              >
                <BsCloudUpload />
              </label>
            )}
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg, .jpeg, .png, .svg"
              className="file-input file-input-bordered w-full text-white border-[#E4B122]/50 focus:border-[#E4B122] focus:ring-[#E4B122]"
              onChange={getImage}
            />
          </div>

          {/* Name Input */}
          <div className="flex items-center w-full gap-3 px-4 h-14 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-[#E4B122]">
            <label htmlFor="name" className="text-xl text-[#E4B122] hidden md:block">
              <BsPerson />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={signUpData.name}
              onChange={handleUserInput}
              required
              className="w-full bg-transparent border-0 outline-0 text-white placeholder-slate-400"
            />
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
              value={signUpData.email}
              onChange={handleUserInput}
              required
              className="w-full bg-transparent border-0 outline-0 text-white placeholder-slate-400"
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
              value={signUpData.password}
              onChange={handleUserInput}
              required
              className="w-full bg-transparent border-0 outline-0 text-white placeholder-slate-400"
            />
          </div>

          {/* SignUp Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#E4B122] text-black font-semibold text-lg 
                       shadow-lg hover:shadow-[0_0_15px_rgba(228,177,34,0.5)] transition-all"
          >
            Sign Up
          </motion.button>
        </motion.form>

        {/* Already have account */}
        <p className="text-white mt-2 text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E4B122] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
