import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Send } from "lucide-react"; // run: npm install lucide-react

import option2 from "../assets/Json/option2.json";
import Particle from "../components/Particle";
import axiosInstance from "../helpers/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let hasError = false;

    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are required");
      hasError = true;
    } else if (
      !userInput.email.match(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      )
    ) {
      toast.error("Enter a valid email");
      hasError = true;
    }

    if (!hasError) {
      try {
        toast.loading("Sending message...", { position: "top-center" });
        const response = await axiosInstance.post("/contactus", userInput);
        toast.dismiss();
        if (response.data?.success) {
          toast.success(response.data.message || "Message sent successfully!");
          setUserInput({ name: "", email: "", message: "" });
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.statusText || "Something went wrong");
      }
    }
  }

  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option2} />

      {/* Contact Form Overlay */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 font-mulish">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl 
                     p-8 w-full max-w-lg text-white space-y-6"
        >
          <h1
            className="text-4xl font-bold text-center bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #E4B122, #d1a41f)",
            }}
          >
            Contact Us
          </h1>

          <p className="text-center text-slate-300 font-normal">
            Our support team will respond within{" "}
            <span className="font-semibold" style={{ color: "#E4B122" }}>
              24 hours
            </span>
            .
          </p>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-slate-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInput.name}
                onChange={handleUserInput}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                           focus:outline-none focus:ring-2 focus:ring-[#E4B122] placeholder-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInput.email}
                onChange={handleUserInput}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                           focus:outline-none focus:ring-2 focus:ring-[#E4B122] placeholder-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-slate-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={userInput.message}
                onChange={handleUserInput}
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                           focus:outline-none focus:ring-2 focus:ring-[#E4B122] placeholder-slate-400 resize-none"
              ></textarea>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg 
                       text-black font-bold text-lg shadow-lg transition-all bg-[#E4B122]"
          >
            <Send className="w-5 h-5" /> Send Message
          </motion.button>
        </motion.form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
