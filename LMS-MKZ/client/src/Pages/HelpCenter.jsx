import HomeLayout from "../layouts/HomeLayout";
import Particle from "../components/Particle";
import option2 from "../assets/Json/option2.json";

function HelpCenter() {
  return (
    <HomeLayout>
      {/* Particle Background */}
      <Particle option={option2} />

      {/* Page Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-[#FACC15] mb-6">Help Center</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          Find answers to common questions and troubleshooting tips.
        </p>
      </div>
    </HomeLayout>
  );
}

export default HelpCenter;
