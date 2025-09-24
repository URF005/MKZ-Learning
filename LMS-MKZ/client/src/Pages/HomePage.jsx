import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import HomeImage from "../assets/Images/homeImage.png"
import option1 from "../assets/Json/option1.json"
import Particle from "../components/Particle"
import HomeLayout from "../Layouts/HomeLayout"

const testimonials = [
    { text: "This platform completely changed my career! Highly recommend.", name: "Ayesha, Web Developer" },
    { text: "Affordable and high-quality courses. Learned at my own pace.", name: "Ali, Data Scientist" },
    { text: "Best LMS I’ve ever used. Certificates helped me land a job!", name: "Sara, Marketing Specialist" },
    { text: "Amazing instructors and very user-friendly platform.", name: "Hassan, Designer" }
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

            {/* Popular Courses */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white font-mulish">
                <h2 className="w-full text-3xl sm:text-4xl font-bold text-center mb-12 relative">
                    Popular <span className="text-[#E4B122]">Courses</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Featured Course */}
                    <div
                        className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg group border border-gray-700 transition"
                        style={{ boxShadow: "0 4px 12px rgba(228, 177, 34, 0.3)" }}
                    >
                        <div className="overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                                alt="Web Development Bootcamp"
                                className="w-full h-52 sm:h-64 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 text-xs text-black rounded-full bg-[#E4B122]">
                                    Beginner Friendly
                                </span>
                                <span className="px-3 py-1 text-xs bg-green-500/80 text-white rounded-full">
                                    Certificate
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#E4B122]">
                                Web Development Bootcamp
                            </h3>
                            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed font-normal">
                                Master HTML, CSS, JavaScript, and React to build full-stack applications. Includes Node.js, Express,
                                MongoDB, and real-world projects to boost your portfolio.
                            </p>

                            {/* Enroll Now Button */}
                            <Link to="/signup">
                                <button
                                    className="mt-5 px-6 py-3 text-black rounded-lg transition font-semibold shadow-md font-mulish"
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
                                    Enroll Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Small Courses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Data Science with Python",
                                img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
                                desc: "Learn Pandas, NumPy, and ML basics.",
                                tag: "Intermediate"
                            },
                            {
                                title: "Digital Marketing Mastery",
                                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                                desc: "SEO, Social Media, and Ads strategies.",
                                tag: "Beginner"
                            },
                            {
                                title: "UI/UX Design Fundamentals",
                                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
                                desc: "Design modern interfaces with Figma.",
                                tag: "Creative"
                            },
                            {
                                title: "Cloud Computing Essentials",
                                img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
                                desc: "Intro to AWS, Azure, and deployments.",
                                tag: "Certificate"
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
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 text-xs text-black rounded-full bg-[#E4B122]">
                                        {course.tag}
                                    </span>
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
