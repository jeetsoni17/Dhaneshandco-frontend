import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentIconListText = ({ className, children }) => (
  <div className="col-9 col-lg-6  d-flex flex-column align-items-start">
    {children}
  </div>
)

const StyledContentIconListText = styled(ContentIconListText)``

export default StyledContentIconListText

ContentIconListText.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
}

ContentIconListText.defaultProps = {
  className: '',
}
