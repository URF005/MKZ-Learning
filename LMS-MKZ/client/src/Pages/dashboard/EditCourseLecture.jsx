import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { updateLecture } from "../../redux/slices/LectureSlice";

function EditCourseLecture() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();

    useEffect(() => {
        if (!state) navigate("/courses");
        document.title = "Edit Lecture - Learning Management System";
    }, []);

    const [data, setData] = useState({
        cid: id,
        lectureId: state?._id,
        lecture: null,
        title: state?.title,
        description: state?.description,
        videoSrc: state?.lecture?.secure_url,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleVideo = (e) => {
        const video = e.target.files[0];
        if (video) {
            const source = window.URL.createObjectURL(video);
            setData({
                ...data,
                lecture: video,
                videoSrc: source,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await dispatch(updateLecture(data));
        if (res?.payload?.success) {
            navigate(-1);
            setData({
                cid: id,
                lectureId: state?._id,
                lecture: null,
                title: state?.title,
                description: state?.description,
                videoSrc: state?.lecture?.secure_url,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 md:px-12 lg:px-20">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col lg:flex-row gap-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-10"
            >
                {/* Left - Video Preview */}
                <div className="lg:w-1/2 w-full flex flex-col gap-6">
                    <div
                        className="flex items-center gap-3 cursor-pointer text-slate-300 hover:text-yellow-400 transition"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft className="text-lg" />
                        <span className="font-semibold">Go Back</span>
                    </div>

                    {data.videoSrc ? (
                        <motion.video
                            key={data.videoSrc}
                            controls
                            controlsList="nodownload nofullscreen"
                            disablePictureInPicture
                            className="w-full h-80 md:h-96 rounded-xl border border-white/20 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                        >
                            <source src={data.videoSrc} type="video/mp4" />
                        </motion.video>
                    ) : (
                        <div className="w-full h-80 md:h-96 flex justify-center items-center border-2 border-dashed border-slate-500 rounded-xl">
                            <RiVideoAddFill size={"8rem"} className="text-slate-400" />
                        </div>
                    )}
                </div>

                {/* Right - Form */}
                <div className="lg:w-1/2 w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-slate-200 text-lg" htmlFor="lecture">
                            Replace Lecture Video
                        </label>
                        <input
                            type="file"
                            name="lecture"
                            id="lecture"
                            accept="video/mp4"
                            onChange={handleVideo}
                            className="file-input file-input-bordered file-input-accent w-full text-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-slate-200 text-lg" htmlFor="title">
                            Lecture Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Update lecture title"
                            className="input input-bordered w-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-yellow-400 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-slate-200 text-lg" htmlFor="description">
                            Lecture Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Update lecture description..."
                            className="textarea w-full min-h-[120px] bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-yellow-400 rounded-lg resize-y"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all"
                    >
                        Confirm Update
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}

export default EditCourseLecture;
