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
const blogPostNo = 3
const blog = blogArray[blogPostNo]

const BlogFirstPage = () => {
  return (
    <Layout>
      <SEO
        title="Why do I need a careers coach?"
        description="Coaching can seem a bit of a dark art and it's hard to know whether or not a careers coach is right for you. At the very least it's a space to experiment, practice and learn about yourself with someone who will hold you accountable to action and give you immediate feedback."
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
