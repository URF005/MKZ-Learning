import { useState, useEffect } from "react";
import CarouselDiv from "../components/CarouselDiv";
import { celeb } from "../constants/celebData.js";

function Carousel() {
    const [slidenumber, setSlideNumber] = useState(1);
    const [fade, setFade] = useState(true);

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
        <div className="relative font-mulish">
            <div
                className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                    }`}
            >
                <CarouselDiv key={slidenumber} {...celeb[slidenumber - 1]} />
            </div>
        </div>
    );
}

export default Carousel;
