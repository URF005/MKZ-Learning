import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import HomeImage from "../assets/Images/homeImage.png"
import option1 from '../assets/Json/option1.json'
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
            <div className="h-screen flex lg:px-8 px-4 pb-8 lg:pb-0 flex-col lg:flex-row justify-around items-center">
                {/* Left Content */}
                <div className="lg:px-4 md:px-4 space-y-8 lg:w-1/2">
                    <h1 className="lg:text-5xl text-2xl text-white font-semibold">
                        Find out best <span className="text-yellow-500 font-bold">Online Courses</span>
                    </h1>
                    <p className="text-gray-200 lg:text-xl tracking-wider">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    <div className="flex gap-4 lg:flex-row md:flex-row items-center">
                        <Link to={'/courses'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg font-semibold bg-yellow-500 hover:bg-white hover:text-yellow-400 transition-all ease-in-out duration-300 text-black border-2 border-white hover:border-yellow-400 cursor-pointer">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to={'/contact'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg font-semibold bg-transparent text-white border-2 border-yellow-400 hover:border-white cursor-pointer hover:bg-yellow-400 transition-all ease-in-out duration-300 hover:text-black">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side Image */}
                <div>
                    <img src={HomeImage} alt="image" className="bg-transparent w-full h-full" />
                </div>
            </div>


            {/* Features Section */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                    Why <span className="text-yellow-500">Choose Us?</span>
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
                        <div key={idx} className="p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center hover:scale-105 hover:shadow-yellow-500/20 transition">
                            <div className="text-3xl sm:text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">{f.title}</h3>
                            <p className="text-gray-300 text-sm sm:text-base">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Popular Courses (Featured + Grid) */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white">
                <h2 className="w-full text-3xl sm:text-4xl font-bold text-center mb-12 relative">
                    Popular <span className="text-yellow-500">Courses</span>

                </h2>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Featured Course */}
                    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition group border border-gray-700 hover:border-yellow-400/50">
                        <div className="overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                                alt="Web Development Bootcamp"
                                className="w-full h-52 sm:h-64 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 text-xs bg-yellow-500 text-black rounded-full">
                                    Beginner Friendly
                                </span>
                                <span className="px-3 py-1 text-xs bg-green-500/80 text-white rounded-full">
                                    Certificate
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-yellow-400 transition">
                                Web Development Bootcamp
                            </h3>
                            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
                                Master HTML, CSS, JavaScript, and React to build full-stack applications.
                                Includes Node.js, Express, MongoDB, and real-world projects to boost your portfolio.
                            </p>

                            <Link to="/signup">
                                <button className="mt-5 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-semibold shadow-md">
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
                                tag: "Intermediate",
                            },
                            {
                                title: "Digital Marketing Mastery",
                                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                                desc: "SEO, Social Media, and Ads strategies.",
                                tag: "Beginner",
                            },
                            {
                                title: "UI/UX Design Fundamentals",
                                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
                                desc: "Design modern interfaces with Figma.",
                                tag: "Creative",
                            },
                            {
                                title: "Cloud Computing Essentials",
                                img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
                                desc: "Intro to AWS, Azure, and deployments.",
                                tag: "Certificate",
                            },
                        ].map((course, idx) => (
                            <div
                                key={idx}
                                className="p-5 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 transition group"
                            >
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={course.img}
                                        alt={course.title}
                                        className="h-28 sm:h-32 w-full object-cover rounded-md mb-4 transform group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 text-xs bg-yellow-500/80 text-black rounded-full">
                                        {course.tag}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-base sm:text-lg group-hover:text-yellow-400 transition">
                                    {course.title}
                                </h4>
                                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                    {course.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Testimonials */}
            <section className="py-16 px-4 sm:px-8 bg-gray-900 text-white flex flex-col items-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">What Our Students Say</h2>
                <div className="w-full max-w-2xl p-6 sm:p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center transition-all duration-500">
                    <p className="text-base sm:text-lg italic">"{testimonials[currentTestimonial].text}"</p>
                    <h4 className="mt-3 sm:mt-4 font-semibold text-yellow-400 text-sm sm:text-base">
                        - {testimonials[currentTestimonial].name}
                    </h4>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 sm:px-6">
                    {/* Text */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Start Your <span className="text-yellow-500">Learning Journey</span> Today
                        </h2>
                        <p className="text-gray-300 mb-6 text-sm sm:text-base">
                            Get access to world-class courses and boost your career with flexible, affordable learning.
                        </p>
                        <Link to="/signup">
                            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-yellow-500 text-black rounded-lg text-sm sm:text-lg font-semibold hover:bg-yellow-400 transition">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    {/* Illustration */}
                    <div className="lg:w-1/2 flex justify-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Learning Illustration"
                            className="w-32 sm:w-40 lg:w-64 h-auto object-contain" />
                    </div>
                </div>
            </section>
        </HomeLayout>
    )
}

export default HomePage
