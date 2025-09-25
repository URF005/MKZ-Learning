import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import HomeImage from "../assets/Images/homeImage.png"
import option1 from "../assets/Json/option1.json"
import Particle from "../components/Particle"
import HomeLayout from "../Layouts/HomeLayout"

const testimonials = [
    {
        text: "The YouTube course gave me the exact roadmap to grow my channel — I gained 10k subscribers in just 2 months!",
        name: "Ayesha, Content Creator"
    },
    {
        text: "The TikTok strategies were spot on! I went from random posting to consistent viral videos.",
        name: "Ali, TikTok Influencer"
    },
    {
        text: "The Video Editing course made editing so much easier. My videos now look professional and engaging.",
        name: "Sara, Video Editor"
    },
    {
        text: "YouTube Automation changed everything for me. Now I run multiple channels with minimal effort.",
        name: "Hassan, Digital Entrepreneur"
    }
]


const HomePage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <HomeLayout>
            <Particle option={option1} />

            {/* Hero Section */}
            <div className="h-screen flex lg:px-8 px-4 pb-8 lg:pb-0 flex-col lg:flex-row justify-around items-center font-mulish">
                {/* Left Content */}
                <div className="lg:px-4 md:px-4 space-y-8 lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-snug">
                        Find out best{" "}
                        <span className="text-[#E4B122] font-extrabold">
                            Online Courses
                        </span>
                    </h1>
                    <p className="text-gray-200 lg:text-xl text-base tracking-wide font-normal max-w-xl mx-auto lg:mx-0">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    <div className="flex gap-4 lg:flex-row md:flex-row items-center justify-center lg:justify-start">
                        {/* Explore Courses Button */}
                        <Link to={"/courses"} className="w-fit">
                            <button
                                className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg font-semibold text-black border-2 cursor-pointer transition-all ease-in-out duration-300 font-mulish"
                                style={{ backgroundColor: "#E4B122", borderColor: "white" }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "white"
                                    e.target.style.color = "#E4B122"
                                    e.target.style.borderColor = "#E4B122"
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#E4B122"
                                    e.target.style.color = "black"
                                    e.target.style.borderColor = "white"
                                }}
                            >
                                Explore Courses
                            </button>
                        </Link>

                        {/* Contact Us Button */}
                        <Link to={"/contact"} className="w-fit">
                            <button
                                className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg font-semibold bg-transparent text-white border-2 cursor-pointer transition-all ease-in-out duration-300 font-mulish"
                                style={{ borderColor: "#E4B122" }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#E4B122"
                                    e.target.style.color = "black"
                                    e.target.style.borderColor = "white"
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "transparent"
                                    e.target.style.color = "white"
                                    e.target.style.borderColor = "#E4B122"
                                }}
                            >
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="mt-10 lg:mt-0">
                    <img src={HomeImage} alt="Learning illustration" className="bg-transparent w-64 sm:w-80 lg:w-full h-auto" />
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white font-mulish">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                    Why <span className="text-[#E4B122]">Choose Us?</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: "🎓", title: "Expert Instructors", desc: "Learn from professionals with years of industry experience." },
                        { icon: "⏰", title: "Flexible Learning", desc: "Study anytime, anywhere, with lifetime access." },
                        { icon: "💸", title: "Affordable Pricing", desc: "Premium education at a fraction of the cost." },
                        { icon: "📜", title: "Certificates", desc: "Earn industry-recognized certifications." },
                        { icon: "🌍", title: "Global Community", desc: "Join thousands of learners worldwide." },
                        { icon: "🚀", title: "Career Growth", desc: "Gain practical skills to boost your career." }
                    ].map((f, idx) => (
                        <div
                            key={idx}
                            className="p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center hover:scale-105 transition"
                            style={{ boxShadow: "0 4px 12px rgba(228, 177, 34, 0.2)" }}
                        >
                            <div className="text-3xl sm:text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#E4B122]">
                                {f.title}
                            </h3>
                            <p className="text-gray-300 text-sm sm:text-base font-normal">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Courses */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white font-mulish">
                <h2 className="w-full text-3xl sm:text-4xl font-bold text-center mb-12 relative">
                    Our <span className="text-[#E4B122]">Courses</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Featured Upcoming Course */}
                    <div
                        className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg group border border-gray-700 transition"
                        style={{ boxShadow: "0 4px 12px rgba(228, 177, 34, 0.3)" }}
                    >
                        <div className="overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1594321120022-7649850959bb?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="TikTok Course"
                                className="w-full h-52 sm:h-64 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#E4B122]">
                                TikTok Growth Mastery
                            </h3>
                            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
                                Learn how to create viral content, grow your audience, and monetize TikTok effectively with step-by-step strategies.
                            </p>


                        </div>
                    </div>

                    {/* Small Upcoming Courses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Video Editing Masterclass",
                                img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                desc: "Master Premiere Pro, After Effects, and CapCut to edit professional-quality videos."
                            },
                            {
                                title: "YouTube Content Creation",
                                img: "https://images.unsplash.com/photo-1678329885908-85eb768aa61b?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                desc: "Build, grow, and monetize your YouTube channel with proven techniques."
                            },
                            {
                                title: "YouTube Automation Secrets",
                                img: "https://images.unsplash.com/photo-1746608942838-a484d55ffeda?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                desc: "Learn how to run multiple cash-cow YouTube channels with automation."
                            },
                            {
                                title: "SEO Mastery Course",
                                img: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                desc: "Boost website rankings with SEO strategies for Google and YouTube search."
                            }
                        ].map((course, idx) => (
                            <div
                                key={idx}
                                className="p-5 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 transition group hover:shadow-lg"
                                style={{ borderColor: "#E4B122", boxShadow: "0 4px 12px rgba(228, 177, 34, 0.2)" }}
                            >
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={course.img}
                                        alt={course.title}
                                        className="h-28 sm:h-32 w-full object-cover rounded-md mb-4 transform group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <h4 className="font-semibold text-base sm:text-lg text-[#E4B122]">
                                    {course.title}
                                </h4>
                                <p className="text-gray-400 text-xs sm:text-sm mt-1 font-normal">
                                    {course.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




            {/* Testimonials */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white flex flex-col items-center font-mulish">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">What Our Students Say</h2>
                <div className="w-full max-w-2xl p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center transition-all duration-500">
                    <p className="text-base sm:text-lg italic font-normal">
                        "{testimonials[currentTestimonial].text}"
                    </p>
                    <h4 className="mt-3 sm:mt-4 font-semibold text-sm sm:text-base text-[#E4B122]">
                        - {testimonials[currentTestimonial].name}
                    </h4>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gray-900 text-white font-mulish">
                <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 sm:px-6">
                    {/* Text */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Start Your <span className="text-[#E4B122]">Learning Journey</span> Today
                        </h2>
                        <p className="text-gray-300 mb-6 text-sm sm:text-base font-normal">
                            Get access to world-class courses and boost your career with flexible, affordable learning.
                        </p>

                        {/* Get Started Button */}
                        <Link to="/signup">
                            <button
                                className="px-6 sm:px-8 py-2 sm:py-3 text-black rounded-lg text-sm sm:text-lg font-semibold transition font-mulish"
                                style={{ backgroundColor: "#E4B122" }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "white"
                                    e.target.style.color = "#E4B122"
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#E4B122"
                                    e.target.style.color = "black"
                                }}
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Illustration */}
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                            alt="Learning Illustration"
                            className="w-32 sm:w-40 lg:w-64 h-auto object-contain"
                        />
                    </div>
                </div>
            </section>
        </HomeLayout>
    )
}

export default HomePage
