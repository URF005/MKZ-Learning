import HomeLayout from "../layouts/HomeLayout";
import Particle from "../components/Particle";
import option1 from "../assets/Json/option1.json";

function TermsOfService() {
  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option1} />

      {/* Page Content */}
      <div className="min-h-screen flex flex-col items-center px-4 md:px-8 py-16 relative z-10">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Terms of Service
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl text-center mb-12 leading-relaxed">
          These Terms of Service (“Terms”) govern your use of MKZ Learning.
          Please review them carefully as they outline your rights and
          responsibilities when accessing our platform.
        </p>

        {/* Terms Container */}
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6 md:p-10 text-gray-200 leading-relaxed space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using MKZ Learning, you acknowledge that you have read,
              understood, and agree to be bound by these Terms. If you do not
              agree, you may not use our services.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Section 2 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              2. User Accounts
            </h2>
            <p>
              To access certain features, you must create an account. You agree
              to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide accurate and up-to-date information.</li>
              <li>Maintain the confidentiality of your credentials.</li>
              <li>Take responsibility for all activities under your account.</li>
            </ul>
          </div>

          <hr className="border-gray-700" />

          {/* Section 3 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              3. Course Enrollment & Access
            </h2>
            <p>
              Enrollment grants you a limited, non-transferable license to view
              the course content for personal educational purposes. You may not
              share, sell, or distribute course material without explicit
              permission.
            </p>
          </div>

          <hr className="border-gray-700" />

          {/* Section 4 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              4. Payments & Refunds
            </h2>
            <p>
              All transactions are processed securely. MKZ Learning provides a{" "}
              <span className="font-semibold text-[#FACC15]">
                7-day refund policy
              </span>{" "}
              for eligible courses. After this period, refunds are only granted
              as required by law.
            </p>
          </div>

          <hr className="border-gray-700" />

          {/* Section 5 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              5. Instructor Responsibilities
            </h2>
            <p>
              Instructors must submit original content and comply with
              intellectual property laws. Violations may result in suspension or
              removal from the platform.
            </p>
          </div>

          <hr className="border-gray-700" />

          {/* Section 6 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              6. Prohibited Use
            </h2>
            <p>
              You agree not to misuse MKZ Learning for illegal, fraudulent, or
              harmful purposes. Any such activity may lead to immediate account
              termination.
            </p>
          </div>

          <hr className="border-gray-700" />

          {/* Section 7 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              MKZ Learning is provided “as is” without warranties of any kind.
              We are not liable for indirect, incidental, or consequential
              damages related to your use of our services.
            </p>
          </div>

          <hr className="border-gray-700" />

          {/* Section 8 */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#FACC15] mb-2">
              8. Updates to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of MKZ
              Learning after changes constitutes acceptance of the new Terms.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            For questions about these Terms, please contact our support team.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-xl shadow hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

export default TermsOfService;
