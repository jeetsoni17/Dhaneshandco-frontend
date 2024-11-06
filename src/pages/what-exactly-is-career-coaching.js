import React from 'react'

import Layout from '../components/layout'
import ContentBlock from '../components/ContentBlock'
import TextHeader from '../components/TextHeader'
import inputData from '../pagesInput/the-essential-career-blog'
import BlogPostImage from '../components/BlogPostImage'
import TextParagraph from '../components/TextParagraph'
import BlogPostFooter from '../components/BlogPostFooter'
import ContentSpacer from '../components/ContentSpacer'
import TextLink from '../components/TextLink'
import SEO from '../components/seo'

const { blogArray } = inputData
const blogPostNo = 1
const blog = blogArray[blogPostNo]

const BlogFirstPage = () => {
  //const tagList = blog.tags.map(tag => tag.name).join(' / ')
  return (
    <Layout>
      <SEO
        title="What is Career Coaching?"
        description="What is the point of coaching and how is it different to mentoring or therapy?"
      />
      <ContentBlock>
        <TextHeader mainHeader={blog.title} size="Large" />
        <BlogPostImage src={`blog/${blog.image_filename}.png`} />
        <ContentSpacer bs="pb-3 pb-lg-5" />
        <TextParagraph>
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        </TextParagraph>
        <ContentSpacer bs="pb-3 pb-lg-5" />
        <TextLink to="the-essential-career-blog" text="Back to blog home" />
      </ContentBlock>
    </Layout>
  )
}

export default BlogFirstPage

BlogFirstPage.defaultProps = { data: {} }
