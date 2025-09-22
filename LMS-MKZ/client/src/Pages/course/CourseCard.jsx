import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/course/description", { state: { ...data } })}
            className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl cursor-pointer overflow-hidden transition-all"
        >
            {/* Thumbnail */}
            <div className="relative w-full h-56 overflow-hidden">
                <motion.img
                    src={data.thumbnail?.secure_url}
                    alt="course thumbnail"
                    className="w-full h-full object-cover rounded-t-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                />
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    NEW
                </span>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col gap-3">
                <h2 className="text-xl font-bold capitalize text-white truncate">
                    {data.title}
                </h2>

                <p className="text-sm font-medium text-slate-300">
                    Instructor:{" "}
                    <span className="text-yellow-400 font-semibold">{data.createdBy}</span>
                </p>



                <div className="flex justify-end mt-2">
                    <span className="px-4 py-2 text-xs font-bold uppercase border border-yellow-400 text-yellow-400 rounded-full tracking-wide shadow-md hover:bg-yellow-400 hover:text-black transition">
                        {data.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default CourseCard;
