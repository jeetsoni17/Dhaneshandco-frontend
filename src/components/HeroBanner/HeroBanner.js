import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Banner = ({ children, sources, className, overlay }) => {
  const backgroundImageStyle = {
    backgroundImage: overlay
      ? `
        linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5)), 
        url(${sources[0]})
      `
      : `url(${sources[0]})`,
  };

  return (
    <section
      className={[className, "container-fluid d-flex justify-content-center"].join(" ")}
      style={{
        ...backgroundImageStyle,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </section>
  );
};

const HeroBanner = styled(Banner)`
  @media (max-width: 767px) {
    min-height: 60vh;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    aspect-ratio: 12 / 9;
  }
  @media (min-width: 993px) {
    min-height: 60vh;
  }
`;

export default HeroBanner;

Banner.propTypes = {
  /**
   * Text to go within the background image
   */
  children: PropTypes.node,
  /**
   * Array of background image URLs
   */
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Emotion styling classes
   */
  className: PropTypes.string,
  /**
   * Boolean to enable or disable the overlay
   */
  overlay: PropTypes.bool,
};

HeroBanner.defaultProps = {
  children: null,
  className: "",
  overlay: false,
};
