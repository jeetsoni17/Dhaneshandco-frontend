import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { DateTime } from 'luxon'

const BlogPostImage = ({ className, tagList, post_date }) => (
  <div className="w-100 d-flex flex-row justify-content-between">
    <i className="">{tagList}</i>
    <i className="">
      {DateTime.fromISO(post_date).toLocaleString(DateTime.DATE_MED)}
    </i>
  </div>
)

BlogPostImage.propTypes = {
  className: PropTypes.object,
  image: PropTypes.object,
}

const StyledBlogPostImage = styled(BlogPostImage)``

export default StyledBlogPostImage

BlogPostImage.defaultProps = {}
