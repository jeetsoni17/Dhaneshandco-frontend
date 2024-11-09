import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import TextCardHeader from '../TextCardHeader'
import TextCardBody from '../TextCardBody'

const TextCard = ({ className, cardHeader, children }) => (
  <div className="card border-0 mt-2">
    <TextCardHeader cardHeader={cardHeader} />
    <TextCardBody cardBody={children} />
  </div>
)

const StyledTextCard = styled(TextCard)``

export default StyledTextCard

TextCard.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  cardHeader: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
}

TextCard.defaultProps = {
  className: '',
}
