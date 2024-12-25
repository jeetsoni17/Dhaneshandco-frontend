import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const InfoItem = ({ className, header, text, children }) => (
  <div className="col-md-4 text-center">
    {children}
    <h3 className="">{header}</h3>
    <p className="">{text}</p>
  </div>
)

const StyledInfoItem = styled(InfoItem)``

export default StyledInfoItem

InfoItem.propTypes = {
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
  header: PropTypes.string,

  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  text: PropTypes.string,
}

InfoItem.defaultProps = {
  header: 'Disrupt',
  text:
    'Take action and be accountable for building positive habits to achieve your goals.',
  className: '',
}
