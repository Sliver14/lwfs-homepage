import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

function ImageSlider({ slides, autoScroll, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount or navigation
  }, [autoScroll, interval, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  if (!slides || slides.length === 0) {
    return <div className="text-center text-gray-500">No slides available</div>;
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      {...swipeHandlers}
    >
      {/* Slide */}
      <a
        href={slides[currentIndex]?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
          <div
            className="absolute w-full h-full bg-cover object-cover bg-no-repeat transition-all duration-1000 "
            style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
          ></div>
      

      {/* Title */}
      {/* <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white py-2 px-4 rounded-md">
        <h2 className="text-sm font-semibold">{slides[currentIndex]?.title}</h2>
      </div> */}
      </a>

      {/* <div className='px-2 gap-5'>
          <h1 className='text-lw_red text-3xl font-black self-center'>Upcoming Events</h1>
          <h1 className='text-wrap' >{slides[currentIndex]?.title}</h1>
        </div> */}
      

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 h-10 w-10 text-white text-xl p-2 bg-gray-500  rounded-full opacity-70 hover:bg-gray-900 transition-opacity duration-300"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 h-10 w-10 text-white text-xl p-2 bg-gray-500  rounded-full opacity-70 hover:bg-gray-900 transition-opacity duration-300"
        onClick={nextSlide}
      >
        &#10095;
      </button>

    </div>
  );
}

export default ImageSlider;


  