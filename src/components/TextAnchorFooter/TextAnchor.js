import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextAnchor = ({ className, children, href }) => (
  <a
    type="link"
    className={[className].join(' ')}
    target="_blank"
    rel="noreferrer"
    href={href}
  >
    {children}
  </a>
)

const StyledTextAnchor = styled(TextAnchor)`
  font-size: ${props => (props.small ? '1rem' : '1.25rem')};
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #207BFF;
  }
`

export default StyledTextAnchor

TextAnchor.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Emotion classname
   */
  children: PropTypes.string,
  /**
   * Emotion classname
   */
  href: PropTypes.string,
}

TextAnchor.defaultProps = {}
