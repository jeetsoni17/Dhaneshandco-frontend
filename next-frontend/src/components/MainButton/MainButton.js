import React from 'react'
import PropTypes from 'prop-types'
import './MainButton.scss'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'

const MainButton = ({ primary, className, label, href, bs, small }) => {
  const mode = primary
    ? 'btn btn-outline-highlight mainbutton mx-auto d-block'
    : 'btn btn-outline-gray mx-auto d-block'

  return (
    <button
      type="button"
      className={[mode, className, bs].join(' ')}
      onClick={() => {
        navigate(href)
      }}
    >
      {label}
    </button>
  )
}

const StyledMainButton = styled(MainButton)`
  font-size: ${props => (props.small ? '1rem' : '1.25rem')};
`

export default StyledMainButton

MainButton.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * href target
   */
  href: PropTypes.string,
  /**
   * additional bootstrap classes
   */
  bs: PropTypes.string,
  /**
   * additional bootstrap classes
   */
  small: PropTypes.bool,
  /**
   * additional bootstrap classes
   */
  className: PropTypes.string,
}

MainButton.defaultProps = {
  primary: false,
  bs: '',
}
