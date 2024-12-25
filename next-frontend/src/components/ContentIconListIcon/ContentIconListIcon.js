import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import SimpleIcon from '../SimpleIcon'

const ContentIconListImg = ({ className, icon }) => (
  <div className="col-3 col-lg-2 d-flex justify-content-center align-items-center">
    <SimpleIcon icon={icon} />
  </div>
)

const StyledContentIconListImg = styled(ContentIconListImg)``

export default StyledContentIconListImg

ContentIconListImg.propTypes = {
  /**
   * Header Content
   */
  icon: PropTypes.string,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
}

ContentIconListImg.defaultProps = {
  icon: 'icon-question',
  className: '',
}
