import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import HomeLayout from "../../layouts/HomeLayout";
import { createCourse } from "../../redux/slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    }

    function handleImage(e) {
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.onload = () => {
                setUserInput({
                    ...userInput,
                    previewImage: fileReader.result,
                    thumbnail: uploadImage,
                });
            };
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!userInput.thumbnail) {
            toast.error("Please upload a course thumbnail");
            return;
        }

        const formData = new FormData();
        formData.append("title", userInput.title);
        formData.append("description", userInput.description);
        formData.append("category", userInput.category);
        formData.append("createdBy", userInput.createdBy);
        formData.append("thumbnail", userInput.thumbnail);

        const response = await dispatch(createCourse(formData));
        if (response.payload?.success) {
            navigate("/courses");
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewImage: "",
            });
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 md:px-12 lg:px-20">
                <motion.form
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col lg:flex-row gap-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-10"
                >
                    {/* Left side - Image Upload */}
                    <div className="lg:w-1/2 w-full flex flex-col gap-6">
                        {userInput.previewImage ? (
                            <motion.img
                                src={userInput.previewImage}
                                alt="thumbnail"
                                className="rounded-xl w-full h-80 md:h-96 object-cover shadow-lg"
                                whileHover={{ scale: 1.02 }}
                            />
                        ) : (
                            <div className="w-full h-80 md:h-96 flex justify-center items-center border-2 border-dashed border-slate-500 rounded-xl">
                                <FcAddImage size={"8rem"} />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-slate-200 text-lg" htmlFor="thumbnail">
                                Course Thumbnail
                            </label>
                            <input
                                type="file"
                                name="thumbnail"
                                id="thumbnail"
                                accept=".jpg, .jpeg, .png, .svg"
                                onChange={handleImage}
                                className="file-input file-input-bordered file-input-accent w-full text-white"
                            />
                        </div>
                    </div>

                    {/* Right side - Form fields */}
                    <div className="lg:w-1/2 w-full flex flex-col gap-6">
                        {[
                            { id: "title", label: "Course Title", type: "text", value: userInput.title },
                            { id: "createdBy", label: "Course Instructor", type: "text", value: userInput.createdBy },
                            { id: "category", label: "Course Domain", type: "text", value: userInput.category },
                        ].map((field) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <label htmlFor={field.id} className="font-semibold text-slate-200 text-lg">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.id}
                                    id={field.id}
                                    value={field.value}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field.label}`}
                                    className="input input-bordered w-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-yellow-400 rounded-lg"
                                />
                            </div>
                        ))}

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="font-semibold text-slate-200 text-lg">
                                Course Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={userInput.description}
                                onChange={handleChange}
                                placeholder="Type course description here..."
                                className="textarea w-full min-h-[120px] bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-yellow-400 rounded-lg resize-y"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/30 transition-all"
                        >
                            Create Course
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;
