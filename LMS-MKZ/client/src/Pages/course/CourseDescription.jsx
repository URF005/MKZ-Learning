import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  // ✅ Check if user is subscribed to this specific course
  const isSubscribedToThisCourse = data?.subscriptions?.some(
    (sub) => sub.courseId === state._id && sub.status === "active"
  );

  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col lg:flex-row items-start gap-10 px-4 md:px-12 lg:px-20 py-12 font-mulish">
        {/* Left - Thumbnail & Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 w-full flex flex-col gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6"
        >
          <img
            src={state.thumbnail?.secure_url}
            alt="thumbnail"
            className="rounded-2xl w-full h-80 md:h-96 object-cover shadow-lg hover:scale-[1.02] transition-transform duration-500"
          />

          <div className="flex flex-col gap-4 mt-4">
            <p className="font-semibold text-base md:text-lg text-gray-300">
              Category:{" "}
              <span className="text-[#E4B122] font-bold">
                {state.category}
              </span>
            </p>
            <p className="font-semibold text-base md:text-lg text-gray-300">
              Instructor:{" "}
              <span className="text-[#E4B122] font-bold">
                {state.createdBy}
              </span>
            </p>
            <p className="font-semibold text-base md:text-lg text-gray-300">
              Price:{" "}
              <span className="text-green-400 font-bold">
                {new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  minimumFractionDigits: 0,
                }).format(state.price)}
              </span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E4B122] to-[#c9971a] text-black font-semibold shadow-lg hover:shadow-[#E4B122]/30 transition-all"
            onClick={() =>
              role === "ADMIN" || isSubscribedToThisCourse
                ? navigate(`/course/${state.title}/${state._id}/lectures`, { state })
                : navigate(`/course/${state.title}/checkout`, { state })
            }
          >
            {role === "ADMIN" || isSubscribedToThisCourse
              ? "Go to Lectures"
              : "Subscribe Now"}
          </motion.button>
        </motion.div>

        {/* Right - Description */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 w-full flex flex-col gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6"
        >
          <h1 className="font-extrabold text-3xl md:text-5xl bg-gradient-to-r from-[#E4B122] to-[#c9971a] bg-clip-text text-transparent capitalize tracking-tight">
            {state.title}
          </h1>

          <h2 className="font-semibold text-lg md:text-2xl text-gray-300">
            About this course
          </h2>

          <p className="font-medium text-sm md:text-base text-slate-200 leading-relaxed tracking-wide">
            {state.description}
          </p>
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
