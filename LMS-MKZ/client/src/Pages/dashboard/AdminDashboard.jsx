import Chart, { ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js/auto";
import { useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import HomeLayout from "../../layouts/HomeLayout";
import { deleteCourse, getAllCourse } from "../../redux/slices/CourseSlice";
import { getPaymentsRecord } from "../../redux/slices/RazorpaySlice";
import { getStats } from "../../redux/slices/StatSlice";

Chart.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUserCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const Courses = useSelector((state) => state.course.courseData);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [
            {
                label: "User details",
                data: [allUserCount, subscribedCount],
                backgroundColor: ["#facc15", "#22c55e"], // yellow, green
                borderWidth: 1,
            },
        ],
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: monthlySalesRecord,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                pointBackgroundColor: "#f43f5e",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: { color: "white", font: { size: 14 } },
            },
        },
        scales: {
            x: { grid: { color: "rgba(255,255,255,0.1)" } },
            y: { grid: { color: "rgba(255,255,255,0.1)" } },
        },
        maintainAspectRatio: false, // ✅ responsive
        responsive: true,
    };

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourse());
            await dispatch(getStats());
            await dispatch(getPaymentsRecord());
        })();
    }, [dispatch]);

    async function onDelete(id) {
        const res = await dispatch(deleteCourse(id));
        if (res?.payload?.success) await dispatch(getAllCourse());
    }

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 pt-6 mb-16">
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text"
                >
                    Admin Dashboard
                </motion.h1>

                {/* Charts */}
                <div className="w-full flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-16">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="w-full lg:w-1/3 h-80 md:h-96 p-4 md:p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
                    >
                        <Pie data={userData} options={chartOptions} />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="w-full lg:w-2/3 h-80 md:h-96 p-4 md:p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
                    >
                        <Line data={salesData} options={chartOptions} />
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16">
                    {[
                        { label: "Registered Users", value: allUserCount, icon: <FaUsers className="text-yellow-400 text-3xl md:text-4xl" /> },
                        { label: "Subscribed Users", value: subscribedCount, icon: <FaUsers className="text-green-400 text-3xl md:text-4xl" /> },
                        { label: "Subscriptions", value: allPayments?.count, icon: <FcSalesPerformance className="text-3xl md:text-4xl" /> },
                        {
                            label: "Total Revenue",
                            value: isNaN(allPayments?.count) ? 0 : allPayments.count * 499,
                            icon: <GiMoneyStack className="text-green-400 text-3xl md:text-4xl" />,
                        },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 md:p-6 flex flex-col items-center text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg"
                        >
                            <h2 className="text-slate-300 font-semibold text-base md:text-lg">{stat.label}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                {stat.icon}
                                <p className="text-white font-bold text-2xl md:text-3xl">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Courses Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8 lg:px-16">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-300">Course Overview</h1>
                    <Link to={"/course/create"} className="w-full md:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="w-full md:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md"
                        >
                            + Create Course
                        </motion.button>
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto px-4 md:px-8 lg:px-16">
                    <table className="w-full text-sm text-left border-collapse rounded-xl overflow-hidden shadow-xl min-w-[700px]">
                        <thead className="bg-white/10 text-white uppercase text-xs md:text-sm">
                            <tr>
                                <th className="px-3 md:px-4 py-2 md:py-3">S No.</th>
                                <th className="px-3 md:px-4 py-2 md:py-3">Course Title</th>
                                <th className="px-3 md:px-4 py-2 md:py-3">Category</th>
                                <th className="px-3 md:px-4 py-2 md:py-3">Instructor</th>
                                <th className="px-3 md:px-4 py-2 md:py-3">Lectures</th>
                                <th className="px-3 md:px-4 py-2 md:py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Courses?.map((course, idx) => (
                                <tr
                                    key={course?._id}
                                    className="bg-white/5 border-b border-white/10 hover:bg-white/20 transition"
                                >
                                    <td className="px-3 md:px-4 py-2 md:py-3">{idx + 1}</td>
                                    <td
                                        onClick={() =>
                                            navigate(`/course/${course?.title}/${course?._id}/lectures`, { state: Courses[idx] })
                                        }
                                        className="px-3 md:px-4 py-2 md:py-3 font-medium text-yellow-400 hover:underline cursor-pointer"
                                    >
                                        {course?.title}
                                    </td>
                                    <td className="px-3 md:px-4 py-2 md:py-3">{course?.category}</td>
                                    <td className="px-3 md:px-4 py-2 md:py-3">{course?.createdBy}</td>
                                    <td className="px-3 md:px-4 py-2 md:py-3">{course?.numberOfLectures}</td>
                                    <td className="px-3 md:px-4 py-2 md:py-3 flex items-center justify-center gap-4">
                                        <button
                                            onClick={() =>
                                                navigate(`/course/${course?.title}/${course?._id}/editCourse`, { state: Courses[idx] })
                                            }
                                            className="text-blue-400 hover:text-blue-600 text-lg md:text-xl"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => onDelete(course?._id)}
                                            className="text-red-400 hover:text-red-600 text-lg md:text-xl"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;
