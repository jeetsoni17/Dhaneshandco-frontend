import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextQuote = ({ className, paragraphs, bs }) => (
  <blockquote
    className={[
      className,
      'd-flex align-items-center justify-content-center',
      bs,
    ].join(' ')}
  >
    <p>{paragraphs}</p>
  </blockquote>
)

const StyledTextQuote = styled(TextQuote)`
  font-size: 1.25rem;
  padding-left: 50px;
  padding-right: 50px;
  position: relative;
  overflow: hidden;
  min-height: 120px;
  text-align: center;

  &:before {
    font-family: Georgia, serif;
    content: '“';
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 5em;
    color: #207BFF;
    opacity: 0.5;
    font-weight: normal;
  }
  &:after {
    font-family: Georgia, serif;
    content: '”';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 5em;
    color: rgb(247, 136, 47);
    opacity: 0.5;
    font-weight: normal;
  }

  p {
    margin: 0px;
    padding: 0px 5px 0px 5px;
  }
`

export default StyledTextQuote

TextQuote.propTypes = {
  /**
   * Header Content
   */
  className: PropTypes.string,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  paragraphs: PropTypes.array,
  /**
   * Set background color of container.  Use either props.color or leave blank.
   */
  bs: PropTypes.string,
}

TextQuote.defaultProps = {}
