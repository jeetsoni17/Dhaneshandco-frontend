import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

const Banner = ({ children, sources, heroImage, className, overlay }) => {
  const newImageData = sources

  const backgroundFluidImageStack = !overlay
    ? newImageData
    : [
        newImageData,
        `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))`,
      ].reverse()

  return (
    <BackgroundImage
      Tag="section"
      className={[
        className,
        'container-fluid d-flex justify-content-center',
      ].join(' ')}
      fluid={backgroundFluidImageStack}
      critical
      fadeIn={false}
    >
      {children}
    </BackgroundImage>
  )
}

// align-items-end align-items-sm-center

const HeroBanner = styled(Banner)`
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 767px) {
    min-height: 60vh;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    aspect-ratio: 12 / 9;
  }
  @media (min-width: 993px) {
    min-height: 60vh;
  }
`

export default HeroBanner

Banner.propTypes = {
  /**
   * Text to go within the background image
   */
  children: PropTypes.object,
  /**
   * Button contents
   */
  sources: PropTypes.array,
  /**
   * Button contents
   */
  heroImage: PropTypes.bool,
  /**
   * emotion styling classes
   */
  className: PropTypes.string,
  /**
   * Text to go within the background image
   */
  overlay: PropTypes.bool,
}

HeroBanner.defaultProps = {}