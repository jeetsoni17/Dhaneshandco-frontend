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

// Styled Component with responsive updates
const StyledContentTextImage = styled(ContentTextImage)`
  .image-wrapper {
    /* Updated: Made dimensions responsive */
    width: 100%; /* Let the width be relative to the container */
    max-width: 500px; /* Set a max width for the circle */
    aspect-ratio: 1 / 1; /* Ensure it maintains a perfect circle */
    border-radius: 50%; /* Make it circular */
    overflow: hidden; /* Clip anything outside the circle */
    display: flex; /* Center the image inside */
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    margin: 0 auto; /* Center the wrapper in the column */
  }

  .circular-image {
    /* Updated: Ensure the image scales properly */
    width: 100%; /* Fill the wrapper's width */
    height: 100%; /* Fill the wrapper's height */
    object-fit: cover; /* Scale the image to cover the area */
    border-radius: 50%; /* Ensure the image is also circular */
  }

  /* Added: Media Queries for responsiveness */
  @media (max-width: 768px) {
    .image-wrapper {
      max-width: 300px; /* Adjust the size for smaller screens */
    }
  }

  @media (max-width: 576px) {
    .image-wrapper {
      max-width: 200px; /* Further adjust for extra small screens */
    }
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
