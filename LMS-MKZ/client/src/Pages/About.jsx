import aboutMainImage from "../assets/Images/aboutMainImage.png"
import option2 from "../assets/Json/option2.json"
import Carousel from "../components/Carousel"
import Particle from "../components/Particle"
import HomeLayout from "../Layouts/HomeLayout"

function About() {
    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className="flex flex-col lg:p-16 p-8 font-mulish">
                <section className="flex lg:flex-row flex-col items-center justify-between w-full">
                    <div className="flex flex-col gap-16 lg:w-[70%] w-full">
                        {/* Title */}
                        <h1
                            className="lg:text-5xl text-3xl font-bold text-center lg:text-left"
                            style={{ color: "#E4B122" }}
                        >
                            Affordable and quality education
                        </h1>

                        {/* Subtitle */}
                        <p className="lg:text-2xl text-xl text-slate-500 font-semibold text-center lg:text-left">
                            Our goal is to provide the affordable and quality education to the
                            world. We are providing the platform for the aspiring teachers and
                            students to share their skills, creativity and knowledge to each
                            other to empower and contribute in the growth and wellness of
                            mankind.
                        </p>
                    </div>

                    {/* Right side image */}
                    <div className="lg:w-[30%] drop-shadow-2xl">
                        <img src={aboutMainImage} alt="image" className="bg-transparent" />
                    </div>
                </section>

                {/* Carousel Section */}
                <section className="pt-4 w-full lg:w-[80%] lg:mx-auto">
                    <Carousel />
                </section>
            </div>
        </HomeLayout>
    )
}

export default About
