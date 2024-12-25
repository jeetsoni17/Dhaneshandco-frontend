import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Overlay = ({ children, className }) => (
  <div className={[className, ''].join(' ')}>{children}</div>
)

const OverlayBackground = styled(Overlay)`
  display: -webkit-flex; /*  safari */
  display: flex;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.6)
  );
  min-height: 100%;
  width: 100%;
`

export default OverlayBackground

Overlay.propTypes = {
  /**
   * Text to go within the background image
   */
  children: PropTypes.object,
  /**
   * emotion styling classes
   */
  className: PropTypes.string,
}

Overlay.defaultProps = {
  children: '',
  className: '',
}
