import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const SimpleIcon = ({ className, icon }) => (
  <div className={['d-flex', className].join(' ')}>
    <i className={[icon, 'm-auto text-highlight'].join(' ')} />
  </div>
)

const StyledSimpleIcon = styled(SimpleIcon)`
  height: 7rem;
  i {
    font-size: 4.5rem;
    &:hover {
      font-size: 5rem;
    }
  }
`

export default StyledSimpleIcon

SimpleIcon.propTypes = {
  /**
   * Content to go in container
   */
  icon: PropTypes.string,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
}

SimpleIcon.defaultProps = {
  icon: '',
  className: '',
}
