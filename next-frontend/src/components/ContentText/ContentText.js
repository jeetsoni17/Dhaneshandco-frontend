import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentText = ({ className, xtraWide, children }) => {
  const colums = xtraWide ? 12 : 10

  return (
    <div className={[className, 'row justify-content-center'].join(' ')}>
      <div
        className={`col-xl-${colums} d-flex flex-column justify-content-around`}
      >
        {children}
      </div>
    </div>
  )
}

const StyledContentText = styled(ContentText)``

export default StyledContentText

ContentText.propTypes = {
  /**
   * Header Content
   */
  xtraWide: PropTypes.bool,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
}

ContentText.defaultProps = {
  xtraWide: false,
  children: '',
  className: '',
}
