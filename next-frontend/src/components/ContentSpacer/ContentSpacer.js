import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentSpacer = ({ children, className, color, bs }) => {
  const colorBG = color ? 'bg-light' : ''

  return <div className={[className, colorBG, bs].join(' ')} />
}

const StyledContentSpacer = styled(ContentSpacer)``

export default StyledContentSpacer

ContentSpacer.propTypes = {
  /**
   * Content to go in container
   */
  children: PropTypes.object,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  color: PropTypes.object,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  bs: PropTypes.string,
}

ContentSpacer.defaultProps = {
  children: '',
  className: '',
  color: '',
}
