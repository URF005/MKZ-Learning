import HomeLayout from "../layouts/HomeLayout";
import Particle from "../components/Particle";
import option1 from "../assets/Json/option1.json";

function HelpCenter() {
  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option1} />

      {/* Page Content */}
      <div className="min-h-screen flex flex-col items-center px-6 py-16 relative z-10">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Help Center
        </h1>
        <p className="text-base md:text-lg text-gray-200 max-w-2xl text-center mb-12 leading-relaxed">
          Welcome to the MKZ Learning Help Center! Find quick answers, detailed
          guides, and expert tips to make the most out of your online learning
          experience.
        </p>

        {/* Sections */}
        <div className="w-full max-w-5xl space-y-12">
          {/* Getting Started */}
          <section className="bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#FACC15] mb-4">
              🚀 Getting Started
            </h2>
            <ul className="list-disc pl-6 text-gray-200 space-y-3">
              <li>
                <strong>Create an Account:</strong> Sign up with your email or
                social login and verify your account to get started.
              </li>
              <li>
                <strong>Browse Courses:</strong> Explore our{" "}
                <a href="/courses" className="text-[#FACC15] hover:underline">
                  Courses
                </a>{" "}
                page to discover subjects tailored to your goals.
              </li>
              <li>
                <strong>Purchase a Course:</strong> Enroll securely using our
                supported payment methods.
              </li>
            </ul>
          </section>

          {/* For Students */}
          <section className="bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#FACC15] mb-4">
              🎓 For Students
            </h2>
            <ul className="list-disc pl-6 text-gray-200 space-y-3">
              <li>
                <strong>Accessing Courses:</strong> Enrolled courses appear in
                your dashboard with lifetime access.
              </li>
              <li>
                <strong>Certificates:</strong> Earn certificates upon completion
                of eligible courses.
              </li>
              <li>
                <strong>Troubleshooting:</strong> If videos don’t load, refresh
                the page, clear cache, or check your internet connection.
              </li>
            </ul>
          </section>

          {/* For Instructors */}
          <section className="bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#FACC15] mb-4">
              👩‍🏫 For Instructors
            </h2>
            <ul className="list-disc pl-6 text-gray-200 space-y-3">
              <li>
                <strong>Become an Instructor:</strong> Apply via your profile
                dashboard with required details.
              </li>
              <li>
                <strong>Upload Courses:</strong> Use our course builder to add
                videos, notes, and quizzes with custom pricing.
              </li>
              <li>
                <strong>Earnings:</strong> Track revenue in your dashboard with
                monthly payouts.
              </li>
            </ul>
          </section>

          {/* FAQs */}
          <section className="bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#FACC15] mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-gray-200">
              <div>
                <p className="font-medium">Q: How do I reset my password?</p>
                <p className="text-gray-300">
                  A: Go to the login page, click “Forgot Password,” and follow
                  the steps emailed to you.
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Q: Can I get a refund if I don’t like a course?
                </p>
                <p className="text-gray-300">
                  A: Yes, MKZ Learning offers a 7-day refund policy for eligible
                  courses.
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Q: Do I need special software to access courses?
                </p>
                <p className="text-gray-300">
                  A: No, you just need a modern browser and stable internet.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-2xl p-6 md:p-10 shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              📩 Need More Help?
            </h2>
            <p className="text-base md:text-lg mb-6">
              Can’t find your answer? Our support team is here 24/7 to help with
              technical, billing, or general issues.
            </p>
            <a
              href="/contact"
              className="px-6 py-3 bg-black text-yellow-400 font-semibold rounded-xl hover:bg-gray-900 transition duration-300"
            >
              Contact Support
            </a>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}

export default HelpCenter;
