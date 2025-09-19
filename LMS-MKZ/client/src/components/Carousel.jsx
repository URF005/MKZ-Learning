import { useState, useEffect } from "react";
import CarouselDiv from "../components/CarouselDiv";
import { celeb } from "../constants/celebData.js";

function Carousel() {
    const [slidenumber, setSlideNumber] = useState(1);
    const [fade, setFade] = useState(true);

    const handlePrevClick = () => {
        setFade(false);
        setTimeout(() => {
            setSlideNumber((currSlide) =>
                currSlide === 1 ? celeb.length : currSlide - 1
            );
            setFade(true);
        }, 300); // match fade duration
    };

    const handleNextClick = () => {
        setFade(false);
        setTimeout(() => {
            setSlideNumber((currSlide) =>
                currSlide === celeb.length ? 1 : currSlide + 1
            );
            setFade(true);
        }, 300);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextClick();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={handlePrevClick}
                className="btn btn-circle absolute z-30 flex justify-center items-center lg:left-5 left-1 top-1/2"
            >
                ❮
            </button>

            <div
                className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                    }`}
            >
                <CarouselDiv key={slidenumber} {...celeb[slidenumber - 1]} />
            </div>

            <button
                onClick={handleNextClick}
                className="btn btn-circle absolute z-30 flex justify-center items-center lg:right-5 right-1 top-1/2"
            >
                ❯
            </button>
        </div>
    );
}

export default Carousel;
