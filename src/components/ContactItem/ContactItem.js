import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import TextParagraph from '../TextParagraph'
import TextHeader from '../TextHeader'

const ContactItem = ({ className, header, text, children }) => (
  <div className="col col-md-4 text-center">
    {children}
    <TextHeader size="v-small" mainHeader={header} />
    <TextParagraph paragraphs={text} small />
  </div>
)

const StyledContactItem = styled(ContactItem)``

export default StyledContactItem

ContactItem.propTypes = {
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

ContactItem.defaultProps = {
  header: 'Disrupt',
  text:
    'Take action and be accountable for building positive habits to achieve your goals.',
  className: '',
}
