import Chart, {
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js/auto";
import { useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourse } from "../../redux/slices/CourseSlice";
import {
  getAllTransactions,
  updateTransactionStatus,
  expireTransaction,
} from "../../Redux/slices/RazorpaySlice";
import { getStats } from "../../redux/slices/StatSlice";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscribedCount } = useSelector((s) => s.stat);
  const { transactions, revenue, expiredCount } = useSelector(
    (s) => s.razorpay
  );
  const Courses = useSelector((s) => s.course.courseData);

  const userData = {
    labels: ["Registered", "Subscribed", "Expired"],
    datasets: [
      {
        label: "User details",
        data: [allUserCount, subscribedCount, expiredCount],
        backgroundColor: ["#E4B122", "#22c55e", "#ef4444"],
      },
    ],
  };

  const salesData = {
    labels: transactions.map((t) =>
      new Date(t.createdAt).toLocaleDateString("en-US")
    ),
    datasets: [
      {
        label: "Sales",
        data: transactions.map((t, i) => (t.status === "approved" ? i + 1 : null)),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        pointBackgroundColor: "#E4B122",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: "white", font: { size: 12 } } },
    },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.1)" } },
      y: { grid: { color: "rgba(255,255,255,0.1)" } },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    dispatch(getAllCourse());
    dispatch(getStats());
    dispatch(getAllTransactions());
  }, [dispatch]);

  async function onDelete(id) {
    const res = await dispatch(deleteCourse(id));
    if (res?.payload?.success) await dispatch(getAllCourse());
  }

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8 sm:gap-10 pt-6 mb-16 font-mulish">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold 
            text-transparent bg-gradient-to-r from-[#E4B122] to-[#c9971a] bg-clip-text"
        >
          Admin Dashboard
        </motion.h1>

        {/* Charts */}
        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 px-3 sm:px-6 md:px-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-1/3 h-64 sm:h-80 md:h-96 p-3 sm:p-4 bg-white/10 rounded-2xl"
          >
            <Pie data={userData} options={chartOptions} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-2/3 h-64 sm:h-80 md:h-96 p-3 sm:p-4 bg-white/10 rounded-2xl"
          >
            <Line data={salesData} options={chartOptions} />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-3 sm:px-6 md:px-10">
          {[
            {
              label: "Registered Users",
              value: allUserCount,
              icon: <FaUsers className="text-[#E4B122] text-2xl sm:text-3xl" />,
            },
            {
              label: "Subscribed Users",
              value: subscribedCount,
              icon: <FaUsers className="text-green-400 text-2xl sm:text-3xl" />,
            },
            {
              label: "Expired Subscriptions",
              value: expiredCount,
              icon: <FaUsers className="text-red-400 text-2xl sm:text-3xl" />,
            },
            {
              label: "Total Revenue",
              value: revenue,
              icon: <GiMoneyStack className="text-green-400 text-2xl sm:text-3xl" />,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-4 sm:p-5 flex flex-col items-center text-center bg-white/10 rounded-2xl"
            >
              <h2 className="text-slate-300 font-medium sm:font-semibold text-sm sm:text-base">
                {stat.label}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2 mt-2">
                {stat.icon}
                <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8 lg:px-16">
          <h1 className="text-xl md:text-2xl font-bold text-slate-300">
            Course Overview
          </h1>
          <Link to={"/course/create"} className="w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-[#E4B122] to-[#c9971a] text-black font-semibold shadow-md hover:shadow-[#E4B122]/40 transition"
            >
              + Create Course
            </motion.button>
          </Link>
        </div>

        {/* Courses Table */}
        <div className="px-3 sm:px-6 md:px-10">
          <h1 className="text-lg sm:text-xl font-bold text-slate-300">Courses</h1>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-700 text-xs sm:text-sm min-w-[700px]">
              <thead className="bg-white/10 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">S No.</th>
                  <th className="px-4 py-3 text-left">Course Title</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Instructor</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Courses?.map((c, i) => (
                  <tr
                    key={c._id}
                    className="odd:bg-white/5 even:bg-white/10 border-b border-gray-700"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td
                      onClick={() =>
                        navigate(`/course/${c.title}/${c._id}/lectures`, { state: c })
                      }
                      className="text-[#E4B122] cursor-pointer font-medium"
                    >
                      {c.title}
                    </td>
                    <td className="px-4 py-3">{c.category}</td>
                    <td className="px-4 py-3">{c.createdBy}</td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/course/${c.title}/${c._id}/editCourse`, { state: c })
                        }
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => onDelete(c._id)}
                        className="text-red-400 hover:text-red-500"
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

        {/* Transactions Table */}
        <div className="px-3 sm:px-6 md:px-10 mt-8 sm:mt-10">
          <h1 className="text-lg sm:text-xl font-bold text-slate-300">
            Transactions
          </h1>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-700 text-xs sm:text-sm min-w-[800px]">
              <thead className="bg-white/10 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-center">Receipt</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t._id}
                    className={`odd:bg-white/5 even:bg-white/10 border-b border-gray-700 ${t.status === "expired" ? "opacity-50" : ""
                      }`}
                  >
                    <td className="px-4 py-3">{t.user?.name}</td>
                    <td className="px-4 py-3">{t.course?.title}</td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={t.receipt}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center capitalize">{t.status}</td>
                    <td className="px-4 py-3 text-center">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-2 flex-wrap">
                      {t.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              dispatch(
                                updateTransactionStatus({
                                  transactionId: t._id,
                                  status: "approved",
                                })
                              )
                            }
                            className="bg-green-500 px-3 py-1 rounded text-white text-xs sm:text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                updateTransactionStatus({
                                  transactionId: t._id,
                                  status: "rejected",
                                })
                              )
                            }
                            className="bg-red-500 px-3 py-1 rounded text-white text-xs sm:text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {t.status === "approved" && (
                        <button
                          onClick={() => dispatch(expireTransaction(t._id))}
                          className="bg-yellow-500 px-3 py-1 rounded text-white text-xs sm:text-sm"
                        >
                          Session Over
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
