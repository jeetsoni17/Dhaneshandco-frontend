import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextList = ({ className, listArray }) => (
  <ul className={className}>
    {listArray.map(listItem => (
      <li>{listItem}</li>
    ))}
  </ul>
)

const StyledTextList = styled(TextList)`
  font-size: ${props => (props.small ? '1rem' : '1.25rem')};
`

export default StyledTextList

TextList.propTypes = {
  /**
   * Header Content
   */
  className: PropTypes.string,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  listArray: PropTypes.array,
}

TextList.defaultProps = {
  className: '',
}
