import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const TextLink = ({ className, to, text, small }) => (
  <Link className={[className, 'text-highlight'].join(' ')} to={`/${to}/`}>
    {text}
  </Link>
)

const StyledTextLink = styled(TextLink)`
  font-size: ${props => (props.small ? '1rem' : '1.25rem')};
  text-decoration: none;
  color: white !important; /* Ensures text remains white */
`

export default StyledTextLink

TextLink.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Emotion classname
   */
  to: PropTypes.string,
  /**
   * Emotion classname
   */
  text: PropTypes.string,
  /**
   * Emotion classname
   */
  small: PropTypes.bool,
}

TextLink.defaultProps = {}
  