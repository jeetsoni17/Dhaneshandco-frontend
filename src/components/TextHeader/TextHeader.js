import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextHeader = ({
  colorHeader,
  mainHeader,
  alignHeader,
  className,
  size,
}) => {
  let headerSize = ''
  switch (size) {
    case 'large':
      headerSize = 2
      break
    case 'medium':
      headerSize = 3
      break
    case 'small':
      headerSize = 4
      break
    case 'v-small':
      headerSize = 5
      break
    default:
      headerSize = 2
  }

  const CustomTag = `h${headerSize}`

  return (
    <CustomTag
      className={[className, `text-${alignHeader || 'center'}`].join(' ')}
    >
      <span className="text-highlight">{colorHeader}</span>
      {mainHeader}
    </CustomTag>
  )
}

const StyledTextHeader = styled(TextHeader)``

export default StyledTextHeader

TextHeader.propTypes = {
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
   * Alignment of the header text
   */
  alignHeader: PropTypes.oneOf(['center', 'left', 'right', '']),
  /**
   * Set the size of the header. Use 'large', 'medium', 'small', or 'v-small'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small', 'v-small']), // Fixed here
}

TextHeader.defaultProps = {
  className: '',
  alignHeader: 'center',
}
