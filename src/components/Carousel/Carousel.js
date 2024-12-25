import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CarouselContainer = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const CarouselInner = styled(Box)({
  display: "flex",
  transition: "transform 1s ease",
  width: "100%",
});

const CarouselItem = styled(Box)({
  minWidth: "100%",
  height: "auto",
  display: "flex",

  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    maxHeight: "85vh",
  },
});

const IndicatorContainer = styled(Box)({
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "5px",
});

const Indicator = styled(Box)(({ active }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
}));

const ControlButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "white",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const PrevButton = styled(ControlButton)({
  left: "10px",
});

const NextButton = styled(ControlButton)({
  right: "10px",
});

const BannerCarousel = ({ banners, autoSlideInterval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselInnerRef = useRef(null);
  const isVisible = useRef(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTransitionEnd = () => {
    setIsTransitioning(false); // Reset transition flag
    if (currentIndex === banners.length + 1) {
      setCurrentIndex(1);
      carouselInnerRef.current.style.transition = "none";
      carouselInnerRef.current.style.transform = `translateX(-100%)`;
    } else if (currentIndex === 0) {
      setCurrentIndex(banners.length);
      carouselInnerRef.current.style.transition = "none";
      carouselInnerRef.current.style.transform = `translateX(-${
        banners.length * 100
      }%)`;
    }
  };

  useEffect(() => {
    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transition = "transform 1s ease";
      carouselInnerRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisible.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      if (isVisible.current) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, autoSlideInterval);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoSlideInterval]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true); // Set transition flag
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, banners.length + 1)
      );
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true); // Set transition flag
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Handle touch events for mobile swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide(); // Swipe left to go to the next slide
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevSlide(); // Swipe right to go to the previous slide
    }
  };

  // Duplicate items to create the infinite loop effect
  const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

  return (
    <CarouselContainer>
      <CarouselInner
        ref={carouselInnerRef}
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedBanners.map((banner, index) => (
          <CarouselItem key={index}>
            <img src={banner.src} alt={`Banner ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselInner>

      <PrevButton onClick={prevSlide} disabled={isTransitioning}>
        <ChevronLeftIcon />
      </PrevButton>
      <NextButton onClick={nextSlide} disabled={isTransitioning}>
        <ChevronRightIcon />
      </NextButton>

      <IndicatorContainer>
        {extendedBanners.slice(1, -1).map((_, index) => (
          <Indicator
            key={index}
            active={currentIndex === index + 1}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index + 1);
              }
            }}
          />
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  );
};

BannerCarousel.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  autoSlideInterval: PropTypes.number,
};

export default BannerCarousel;
