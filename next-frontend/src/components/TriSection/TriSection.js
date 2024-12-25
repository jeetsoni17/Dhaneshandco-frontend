import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TriSection = ({ children, className, noCards, xtraWide }) => {
  const width = xtraWide ? 12 : 10
  const cardWidth = Math.floor(width / noCards)

  return (
    <div className={['row justify-content-center', className].join(' ')}>
      {children.map(child => (
        <div className={`col-12 col-md-${cardWidth} mb-4`}>{child}</div>
      ))}
    </div>
  )
}

const StyledTriSection = styled(TriSection)``

export default StyledTriSection

TriSection.propTypes = {
  /**
   * Emotion classname
   */
  children: PropTypes.object,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Title of info section.
   */
  noCards: PropTypes.number,
  /**
   * Title of info section.
   */
  xtraWide: PropTypes.bool,
}

TriSection.defaultProps = {
  className: '',
  children: [
    {
      icon: 'icon-question',
      header: 'Disrupt',
      text:
        'Take action and be accountable for building positive habits to achieve your goals.',
      className: '',
    },
    {
      icon: 'icon-question',
      header: 'Disrupt',
      text:
        'Take action and be accountable for building positive habits to achieve your goals.',
      className: '',
    },
    {
      icon: 'icon-question',
      header: 'Disrupt',
      text:
        'Take action and be accountable for building positive habits to achieve your goals.',
      className: '',
    },
  ],
}
