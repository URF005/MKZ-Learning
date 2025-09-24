import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { motion } from "framer-motion";

import Footer from "../../components/Footer";
import { deleteLecture, getLectures } from "../../redux/slices/LectureSlice";

function CourseLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [autoPlay, setAutoPlay] = useState(
        localStorage.getItem("autoPlay") === "true"
    );
    const { role } = useSelector((state) => state.auth);

    const handleVideoEnded = () => {
        if (autoPlay && currentVideo < lectures.length - 1) {
            setCurrentVideo(currentVideo + 1);
        }
    };

    const toggleAutoPlay = () => {
        const newValue = !autoPlay;
        setAutoPlay(newValue);
        localStorage.setItem("autoPlay", newValue.toString());
    };

    async function fetchData() {
        await dispatch(getLectures(state?._id));
    }

    async function deleteHandle(cid, lectureId) {
        const data = { cid, lectureId };
        const res = await dispatch(deleteLecture(data));
        if (res?.payload?.success) {
            if (lectures) setCurrentVideo(0);
        }
    }

    function handleClick(idx) {
        setCurrentVideo(idx);
    }

    const splitParagraph = (paragraph) => {
        if (!paragraph) return null;
        const sentences = paragraph.split(".");
        return (
            <ul className="flex flex-col gap-3 list-disc pl-6">
                {sentences.map(
                    (sentence, index) =>
                        sentence.trim() && (
                            <li
                                key={index}
                                className="capitalize text-slate-200 leading-relaxed"
                            >
                                {sentence}
                            </li>
                        )
                )}
            </ul>
        );
    };

    useEffect(() => {
        if (!state) {
            navigate("/courses");
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (lectures && currentVideo !== undefined) {
            document.title = `${lectures[currentVideo]?.title} - Learning Management System`;
        }
    }, [lectures, currentVideo]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 font-mulish">
            {lectures?.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 lg:px-20 py-6">
                    {/* Left - Video Player + Description */}
                    <div className="lg:w-[70%] md:w-[60%] w-full flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-black/30 border-b border-white/10 sticky top-0 z-10">
                            <div className="flex gap-4 items-center">
                                <FaArrowLeft
                                    className="text-white text-xl cursor-pointer hover:text-[#E4B122] transition"
                                    onClick={() => navigate(-1)}
                                />
                                <p className="text-slate-200 text-sm md:text-lg">
                                    Now Playing:{" "}
                                    <span className="font-semibold text-[#E4B122] capitalize">
                                        {lectures[currentVideo]?.title}
                                    </span>
                                </p>
                            </div>
                            <label className="flex items-center gap-3">
                                <span className="hidden md:block font-semibold text-slate-200">
                                    Autoplay
                                </span>
                                <Switch
                                    onChange={toggleAutoPlay}
                                    checked={autoPlay}
                                    height={20}
                                    width={44}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onColor="#E4B122"
                                />
                            </label>
                        </div>

                        {/* Video */}
                        <div className="w-full">
                            {lectures.length > 0 && (
                                <motion.video
                                    key={lectures[currentVideo]?.lecture?.secure_url}
                                    controls
                                    autoPlay={autoPlay}
                                    controlsList="nodownload"
                                    disablePictureInPicture
                                    onEnded={handleVideoEnded}
                                    className="w-full h-72 md:h-[28rem] object-cover rounded-b-2xl"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <source
                                        src={lectures[currentVideo]?.lecture?.secure_url}
                                        type="video/mp4"
                                    />
                                </motion.video>
                            )}
                        </div>

                        {/* Description */}
                        <div className="p-6 md:p-8 flex flex-col gap-4">
                            <h2 className="text-[#E4B122] font-bold text-xl md:text-2xl">
                                Overview
                            </h2>
                            {splitParagraph(lectures[currentVideo]?.description)}
                        </div>
                    </div>

                    {/* Right - Lecture List */}
                    <div className="lg:w-[30%] md:w-[40%] w-full flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                        <div className="sticky top-0 z-10 bg-black/30 border-b border-white/10 flex flex-col gap-4">
                            <h1 className="text-center font-bold text-[#E4B122] py-4 text-lg md:text-xl capitalize">
                                {state?.title}
                            </h1>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/course/${state?.title}/${state?._id}/lectures/addlecture`,
                                            { state: state }
                                        )
                                    }
                                    className="mx-4 mb-4 py-2 rounded-lg bg-gradient-to-r from-[#E4B122] to-[#c9971a] text-black font-semibold shadow-lg hover:shadow-[#E4B122]/30 transition-all"
                                >
                                    + Add Lecture
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <ul className="flex flex-col gap-4">
                                {lectures &&
                                    lectures.map((lecture, idx) => (
                                        <li
                                            key={lecture._id}
                                            className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition ${currentVideo === idx
                                                ? "bg-[#E4B122]/20 border border-[#E4B122]"
                                                : "hover:bg-white/10"
                                                }`}
                                        >
                                            <span
                                                className="text-slate-200 font-semibold capitalize"
                                                onClick={() => handleClick(idx)}
                                            >
                                                {lecture?.title}
                                            </span>
                                            {role === "ADMIN" && (
                                                <div className="flex gap-3">
                                                    <button
                                                        className="text-blue-400 hover:text-blue-600 transition transform hover:scale-110"
                                                        onClick={() =>
                                                            navigate(
                                                                `/course/${state?.title}/${state?._id}/lectures/editlecture`,
                                                                { state: lectures[idx] }
                                                            )
                                                        }
                                                    >
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        className="text-red-400 hover:text-red-600 transition transform hover:scale-110"
                                                        onClick={() =>
                                                            deleteHandle(state?._id, lecture?._id)
                                                        }
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-[90vh] gap-5 items-center justify-center text-center">
                    <p className="font-semibold text-2xl text-slate-200">
                        No lectures available for{" "}
                        <span className="text-[#E4B122]">{state?.title}</span>
                    </p>
                    {role === "ADMIN" && (
                        <button
                            onClick={() =>
                                navigate(
                                    `/course/${state?.title}/${state?._id}/lectures/addlecture`,
                                    { state: state }
                                )
                            }
                            className="py-3 px-6 rounded-lg bg-gradient-to-r from-[#E4B122] to-[#c9971a] text-black font-semibold shadow-lg hover:shadow-[#E4B122]/30 transition-all"
                        >
                            + Add Lecture
                        </button>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default CourseLectures;
