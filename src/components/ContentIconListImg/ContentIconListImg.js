import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ContentIconListImg = ({ className, image }) => (
  <div className="col-3 col-lg-2 d-flex justify-content-center align-items-center">
    <Img className="w-75 rounded-circle bg-white" fluid={image} />
  </div>
)

const StyledContentIconListImg = styled(ContentIconListImg)``

export default StyledContentIconListImg

ContentIconListImg.propTypes = {
  /**
   * Header Content
   */
  image: PropTypes.object,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
}

ContentIconListImg.defaultProps = {
  image: {},
  className: '',
}
