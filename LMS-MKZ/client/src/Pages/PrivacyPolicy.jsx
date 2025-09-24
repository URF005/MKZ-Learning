import HomeLayout from "../Layouts/HomeLayout";
import Particle from "../components/Particle";
import option1 from "../assets/Json/option1.json";

function PrivacyPolicy() {
  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option1} />

      {/* Page Content */}
      <div className="min-h-screen flex flex-col items-center px-4 md:px-8 py-16 relative z-10 font-mulish">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Privacy Policy
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12 leading-relaxed">
          At MZK Learning, your trust is important to us. This Privacy Policy
          outlines how we collect, use, and protect your data when you use our
          platform.
        </p>

        {/* Timeline Style Sections */}
        <div className="relative w-full max-w-4xl border-l-2 border-[#E4B122]/60 pl-6 space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              📥 Information We Collect
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We collect personal details (name, email, payment info) and usage
              data (login activity, course progress) to improve your learning
              journey.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              ⚙️ How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 text-gray-200 space-y-2">
              <li>To provide and manage course access.</li>
              <li>To process secure payments.</li>
              <li>To send essential updates and notifications.</li>
              <li>To personalize and improve our services.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              🍪 Cookies & Tracking
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We use cookies to remember your preferences, keep you logged in,
              and analyze performance. You can disable cookies in your browser
              settings, though some features may not work properly.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              🔒 Data Security
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Your data is protected using modern encryption and security
              practices. While no system is 100% secure, we actively monitor and
              update our safeguards.
            </p>
          </div>

          {/* Section 5 - Warning */}
          <div className="bg-gradient-to-r from-red-500/90 to-red-700/90 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              ⚠️ Important Warning
            </h2>
            <p className="text-white leading-relaxed">
              All course materials, including{" "}
              <span className="font-semibold">videos, notes, and resources</span>{" "}
              provided by MZK Learning, are protected under copyright.{" "}
              <span className="font-bold">
                Sharing, downloading, or distributing our videos without
                permission is strictly prohibited
              </span>{" "}
              and may result in account termination and legal action.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              📝 Your Rights
            </h2>
            <p className="text-gray-200 leading-relaxed">
              You may request access, correction, or deletion of your personal
              data. Contact our support team if you wish to exercise your
              privacy rights.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E4B122] mb-2">
              🔄 Policy Updates
            </h2>
            <p className="text-gray-200 leading-relaxed">
              This Privacy Policy may be updated occasionally. Any significant
              changes will be communicated via email or platform notification.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Questions about your privacy? We’re here to help.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-[#E4B122] to-[#d6a81e] text-black font-semibold rounded-xl shadow hover:from-[#d6a81e] hover:to-[#c9971a] transition duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

export default PrivacyPolicy;
