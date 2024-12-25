import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Banner = ({ children, heroImage, className }) => {
  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),
      url(${heroImage})
    `,
  };

  return (
    <section
      className={[className, "container-fluid d-flex justify-content-center"].join(" ")}
      style={backgroundStyle}
    >
      {children}
    </section>
  );
};

const HeroBackground = styled(Banner)`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  padding: 0;
`;

export default HeroBackground;

Banner.propTypes = {
  /**
   * Text to go within the background image
   */
  children: PropTypes.node,
  /**
   * URL of the hero image
   */
  heroImage: PropTypes.string,
  /**
   * Emotion styling classes
   */
  className: PropTypes.string,
};

HeroBackground.defaultProps = {
  children: null,
  heroImage: "",
  className: "",
};
