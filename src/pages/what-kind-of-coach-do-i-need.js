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
const blogPostNo = 2
const blog = blogArray[blogPostNo]

const BlogFirstPage = () => {
  return (
    <Layout>
      <SEO
        title="What kind of careers coach do I need"
        description="One of the most important things to find out when you’re searching for a coach is whether or not you think you’ll work well with them. A good coach will be clear with you on their style and ways of working so that you can decide whether or not you’ll be a good fit."
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
