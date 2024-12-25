import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TextAnchor = ({ className, children, href }) => (
  <a
    type="link"
    className={[
      className,
      'd-flex flex-column align-items-center justify-content-center',
    ].join(' ')}
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
  i {
    font-size: 2.5rem;
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
  href: PropTypes.string,
  /**
   * Emotion classname
   */
  children: PropTypes.node,
}

TextAnchor.defaultProps = {}
