import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextLead = ({
  colorHeader,
  mainHeader,
  alignHeader,
  className,
  size,
}) => (
  <h3 className={[className, `text-${alignHeader}`].join(' ')}>
    <span className="text-highlight">{colorHeader}</span>
    {mainHeader}
  </h3>
)

const StyledTextLead = styled(TextLead)``

export default StyledTextLead

TextLead.propTypes = {
  /**
   * Header Content
   */
  colorHeader: PropTypes.string,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  mainHeader: PropTypes.string,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Emotion classname
   */
  alignHeader: PropTypes.oneOf('center', 'left', 'right'),
  /**
   * Emotion classname
   */
  size: PropTypes.oneOf('large', 'medium', 'small'),
}

TextLead.defaultProps = {
  colorHeader: '',
  mainHeader: 'Example Main Header Text',
  className: '',
  alignHeader: 'center',
  size: '',
}
