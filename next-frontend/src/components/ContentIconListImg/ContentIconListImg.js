import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentIconListImg = ({ className, image }) => (
  <div className="col-3 col-lg-2 d-flex justify-content-center align-items-center">
    <img className="w-75 rounded-circle bg-white" src={image}></img>
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
