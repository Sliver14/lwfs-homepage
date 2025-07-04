import React from "react";
import { useSwipeable } from "react-swipeable";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomNextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 right-4 h-10 w-10 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 shadow-md hover:bg-gray-900 z-10"
        >
           &#10095;
        </button>
    );
}

function CustomPrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 left-4 h-10 w-10 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 shadow-md hover:bg-gray-900 z-10"
        >
           &#10094;
        </button>
    );
}

function LogoSlider() {
    const sliderRef = React.useRef(null);

    // Swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => sliderRef.current.slickNext(),
        onSwipedRight: () => sliderRef.current.slickPrev(),
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: true,
    });

    // Slider settings
    const settings = {
        infinite: true,
        speed: 1000, // Slow movement (2 seconds)
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 3, // Number of logos visible at a time
        slidesToScroll: 1,
        swipe: true, // Allow swiping
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    // Logos
    const logos = [
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
        { src: "../images/logo.png", link: "https://lwfoundationschool.org/homes/" },
    ];

    return (
        <div className="relative w-screen" {...swipeHandlers}>
            <Slider ref={sliderRef} {...settings} className="overflow-hidden">
                {logos.map((logo, index) => (
                    <div key={index} className="p-4 w-screen">
                        <a href={logo.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={logo.src}
                                alt={`logo ${index + 1}`}
                                className="w-screen h-20 object-contain"
                            />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default LogoSlider;
