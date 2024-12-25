import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

const Banner = ({ children, heroImage, className }) => {
  const newImageData = heroImage
  const backgroundFluidImageStack = [
    newImageData,
    `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))`,
  ].reverse()

  return (
    <BackgroundImage
      Tag="section"
      className={[
        className,
        'container-fluid d-flex justify-content-center',
      ].join(' ')}
      fluid={backgroundFluidImageStack}
      loading="eager"
      fadeIn={false}
    >
      {children}
    </BackgroundImage>
  )
}

const HeroBackground = styled(Banner)`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  padding: 0 0 0 0;
`

export default HeroBackground

Banner.propTypes = {
  /**
   * Text to go within the background image
   */
  children: PropTypes.object,
  /**
   * Button contents
   */
  heroImage: PropTypes.object,
  /**
   * emotion styling classes
   */
  className: PropTypes.string,
}

HeroBackground.defaultProps = {
  children: '',
  headerText: 'HEADER PLACEHOLDER',
  heroImage: {},
  className: '',
}
