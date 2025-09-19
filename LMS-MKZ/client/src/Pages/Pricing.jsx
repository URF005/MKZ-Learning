import HomeLayout from "../layouts/HomeLayout"
import Particle from "../components/Particle"
import option2 from "../assets/Json/option2.json"
import {
  FiCheck,
  FiX,
  FiStar,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiDownload,
} from "react-icons/fi"

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      description: "Perfect for getting started with online learning",
      features: [
        { text: "Access to 5 free courses", included: true },
        { text: "Basic video quality (720p)", included: true },
        { text: "Community forum access", included: true },
        { text: "Mobile app access", included: true },
        { text: "Certificate of completion", included: false },
        { text: "Offline downloads", included: false },
        { text: "1-on-1 instructor support", included: false },
        { text: "Advanced analytics", included: false },
      ],
      buttonText: "", // ❌ Removed Get Started Free
      popular: false,
      color: "border-gray-200",
    },
    {
      name: "Pro",
      price: "29",
      period: "per month",
      description: "Ideal for serious learners and professionals",
      features: [
        { text: "Access to 500+ courses", included: true },
        { text: "HD video quality (1080p)", included: true },
        { text: "Downloadable resources", included: true },
        { text: "Certificate of completion", included: true },
        { text: "Offline downloads", included: true },
        { text: "Priority email support", included: true },
        { text: "Progress tracking", included: true },
        { text: "1-on-1 instructor support", included: false },
      ],
      buttonText: "", // ❌ Removed Start Pro Plan
      popular: true,
      color: "border-[#FACC15]",
    },
    {
      name: "Enterprise",
      price: "99",
      period: "per month",
      description: "Perfect for teams and organizations",
      features: [
        { text: "Unlimited course access", included: true },
        { text: "4K video quality", included: true },
        { text: "Custom learning paths", included: true },
        { text: "Team management tools", included: true },
        { text: "Advanced analytics", included: true },
        { text: "1-on-1 instructor support", included: true },
        { text: "Priority phone support", included: true },
        { text: "Custom integrations", included: true },
      ],
      buttonText: "", // ❌ Removed Contact Sales
      popular: false,
      color: "border-gray-200",
    },
  ]

  const features = [
    {
      icon: <FiBookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "1000+ Courses",
      description:
        "Access to comprehensive library of courses across multiple domains",
    },
    {
      icon: <FiUsers className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified educators",
    },
    {
      icon: <FiAward className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Certificates",
      description: "Earn recognized certificates upon course completion",
    },
    {
      icon: <FiDownload className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Offline Learning",
      description: "Download courses and learn anywhere, anytime",
    },
  ]

  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option2} />

      {/* Page Content */}
      <div className="min-h-screen relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#FACC15] mb-6 text-center">
            Choose Your Learning Path
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl sm:max-w-3xl text-center mb-12">
            Unlock your potential with MKZ Learning. Choose the perfect plan for
            your educational journey and start transforming your career today.
          </p>
        </div>

        {/* Features Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-full shadow-lg mb-4 group-hover:bg-[#FACC15] transition-all duration-300">
                    <div className="text-[#FACC15] group-hover:text-black transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 ${plan.color} border-2 ${
                    plan.popular ? "transform scale-105 shadow-2xl" : ""
                  } hover:shadow-2xl hover:bg-white/20 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#FACC15] text-black px-4 sm:px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                        <FiStar className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl sm:text-5xl font-bold text-[#FACC15]">
                        ${plan.price}
                      </span>
                      <span className="text-gray-300 ml-2 text-sm sm:text-base">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            feature.included
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                          {feature.included ? (
                            <FiCheck className="w-3 h-3" />
                          ) : (
                            <FiX className="w-3 h-3" />
                          )}
                        </div>
                        <span
                          className={`ml-3 text-sm sm:text-base ${
                            feature.included ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* ❌ Removed all plan action buttons */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#FACC15] mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  question: "Can I switch plans anytime?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  question: "Do you offer student discounts?",
                  answer:
                    "Yes, we offer 50% discount for students with valid student ID. Contact our support team for more details.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
                },
                {
                  question: "Is there a money-back guarantee?",
                  answer:
                    "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Pricing
