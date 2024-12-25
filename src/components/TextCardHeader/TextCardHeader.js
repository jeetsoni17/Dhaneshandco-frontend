import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextCardHeader = ({ className, cardHeader }) => (
  <div className={['card-header text-center rounded', className].join(' ')}>
    {cardHeader}
  </div>
)

const StyledTextCardHeader = styled(TextCardHeader)`
  font-size: 1.25rem;
  background: rgba(247, 136, 47, 1);
  color: white;
  border: 0px;
  padding: 0.75rem 1.25rem;
`

export default StyledTextCardHeader

TextCardHeader.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  cardHeader: PropTypes.string,
}

TextCardHeader.defaultProps = {
  className: '',
}
