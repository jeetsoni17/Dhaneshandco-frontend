import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContentTextImage = ({
  className,
  image,
  children,
  imageSide,
  xtraWide,
}) => {
  const columns = xtraWide ? 12 : 10;

  const textOrder =
    imageSide === 'left'
      ? `col-lg-${columns / 2} order-2 order-lg-2`
      : `col-lg-${columns / 2} order-2 order-lg-1`;
  const imgOrder =
    imageSide === 'left'
      ? `col-lg-${columns / 2} order-1 order-lg-1`
      : `col-lg-${columns / 2} order-1 order-lg-2`;

  return (
    <div className={[className, 'row justify-content-center'].join(' ')}>
      <div
        className={[
          'col-12 d-flex flex-column justify-content-center',
          textOrder,
        ].join(' ')}
      >
        {children}
      </div>
      <div
        className={[
          `col-9 d-lg-flex align-items-center mb-3 mb-lg-0`,
          imgOrder,
        ].join(' ')}
      >
        {/* Circular Image */}
        <div className="image-wrapper">
          <img
            className="circular-image"
            src={image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

// Add circular image styling here
const StyledContentTextImage = styled(ContentTextImage)`
  .image-wrapper {
    width: 500px; /* Set the width of the circle */
    height: 450px; /* Set the height of the circle */
    border-radius: 50%; /* Make it circular */
    overflow: hidden; /* Ensure anything outside the circle is clipped */
    display: flex; /* Center the image inside */
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    margin: 0 auto; /* Center the wrapper in the column */
  }

  .circular-image {
    width: 100%; /* Fill the wrapper's width */
    height: 100%; /* Fill the wrapper's height */
    object-fit: cover; /* Scale the image to cover the area */
    border-radius: 50%; /* Ensure the image is also circular */
    transform: scale(0.9)
    }
`;

export default StyledContentTextImage;

ContentTextImage.propTypes = {
  /**
   * Header Content
   */
  image: PropTypes.string, // Changed to 'string' since images are URLs/paths
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.node, // Changed from 'object' to 'node' for React children
  /**
   * Image alignment
   */
  imageSide: PropTypes.oneOf(['left', 'right', '']),
  /**
   * Wide layout toggle
   */
  xtraWide: PropTypes.bool,
};

ContentTextImage.defaultProps = {
  image: '',
  className: '',
  children: null,
  imageSide: '',
  xtraWide: false,
};
