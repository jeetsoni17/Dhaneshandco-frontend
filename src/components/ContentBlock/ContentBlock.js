import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentBlock = ({ children, className, color }) => {
  const colorBG = color ? 'bg-light' : ''

  return (
    <section className={['container-fluid', colorBG, className].join(' ')}>
      <div className="container h-100 py-4">{children}</div>
    </section>
  )
}

const StyledContentBlock = styled(ContentBlock)``

export default StyledContentBlock

ContentBlock.propTypes = {
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
}

ContentBlock.defaultProps = {
  children: '',
  className: '',
  color: '',
}
