import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = ({ option }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative w-full h-full">
      {/* Particle Background */}
      <Particles id="tsparticles" init={particlesInit} options={option} />
    </div>
  );
};

export default Particle;
