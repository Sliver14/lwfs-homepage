import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";


function VideoSlider({ slides, autoScroll = true, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true); // State to control mute

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

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

  // const swipeHandlers = useSwipeable({
  //   onSwipedLeft: nextSlide,
  //   onSwipedRight: prevSlide,
  // });

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted); // Toggle muted state
  };

  if (!slides || slides.length === 0) {
    return <div className="text-center text-gray-500">No videos available</div>;
  }

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden"
      // {...swipeHandlers}
    >
      {/* Video Slide */}
      <video
        className="w-full h-full object-cover transition-all duration-500"
        autoPlay
        muted
        loop
        controls
        controlsList="nodownload"
        src={slides[currentIndex]?.url}
      ></video>

      {/* <iframe src={slides[currentIndex]?.url}
      className="w-full h-full object-contain" 
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-popups"
        controlsList="nodownload"
        allowFullScreen
        title={slides[currentIndex]?.title}>

      </iframe> */}

  

      {/* Styled Video Embed (iframe method) */}
      {/* <iframe
        className="w-full h-full object-cover"
        src={slides[currentIndex]?.url}
        frameBorder="0"
        allow="autoplay; fullscreen"
        title={slides[currentIndex]?.title}
      ></iframe> */}

      {/* Navigation Buttons */}
      {/* <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-800 text-3xl p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
        onClick={prevSlide}
      >
        &#10094;
      </button> */}
      {/* <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-800 text-3xl p-2  opacity-70 hover:opacity-100 transition-opacity duration-300"
        onClick={nextSlide}
      >
        &#10095;
      </button> */}

      {/* Mute/Unmute Button */}
      {/* <button
        className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
        onClick={toggleMute}
      >
        {muted ? "Unmute" : "Mute"}
      </button> */}

      {/* Slider Indicator */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gray-800 scale-125"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div> */}
    </div>
  );
}

export default VideoSlider;
