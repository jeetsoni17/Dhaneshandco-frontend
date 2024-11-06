import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextCardBody = ({ className, cardBody }) => (
  <div className={['card-body', className].join(' ')}>{cardBody}</div>
)

const StyledTextCardBody = styled(TextCardBody)`
  list-style-type: circle;
  padding: 0.75rem;
`

export default StyledTextCardBody

TextCardBody.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  cardBody: PropTypes.object,
}

TextCardBody.defaultProps = {
  className: '',
}
