import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const HeroText = ({ headerText, className }) => (
  <div className="container-fluid">
    <div className={[className, 'container h-100'].join(' ')}>
      <div className={['row h-100'].join(' ')}>
        <div className="h-100 col-12 col-md-4 d-flex align-items-end align-items-md-center">
          <h1
            className={[
              className,
              'display-3 text-uppercase text-start m-0',
            ].join(' ')}
          >
            {headerText}
          </h1>
        </div>
      </div>
    </div>
  </div>
)

const StyledHeroText = styled(HeroText)`
  h1 {
    color: white;
  }
  @media (max-width: 767px) {
     {
      /* To deal with bootstrap padding and gatsby-background-image (adding extra padding in on hero on mobile) use conditional to remove it */
    }
    padding-left: 0;
    padding-right: 0;
    h1 {
      color: #6c757d;
      opacity: 0.95;
    }
  }
`

export default StyledHeroText

HeroText.propTypes = {
  /**
   * Button contents
   */
  headerText: PropTypes.string,
  /**
   * emotion styling classes
   */
  className: PropTypes.string,
}

HeroText.defaultProps = {}
