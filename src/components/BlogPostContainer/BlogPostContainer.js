import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const BlogPostContainer = ({ className, xtraWide, cards, children }) => {
  const width = xtraWide ? 12 : 10
  const cardWidthMed = Math.floor(width / (cards - 1))
  const cardWidthLarge = Math.floor(width / cards)

  return (
    <div className={[className, 'row d-flex flex-wrap'].join(' ')}>
      {children.map(child => (
        <div
          className={`col-12 col-md-${cardWidthMed} col-lg-${cardWidthLarge} mb-4`}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

const StyledBlogPostContainer = styled(BlogPostContainer)``

export default StyledBlogPostContainer

BlogPostContainer.propTypes = {
  /**
   * Header Content
   */
  xtraWide: PropTypes.bool,
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
}

BlogPostContainer.defaultProps = {
  xtraWide: false,
  children: '',
  className: '',
}
