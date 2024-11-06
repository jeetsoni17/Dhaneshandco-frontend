import React from 'react'

import Layout from '../components/layout'
import ContentBlock from '../components/ContentBlock'
import TextHeader from '../components/TextHeader'
import inputData from '../pagesInput/the-essential-career-blog'
import TextParagraph from '../components/TextParagraph'
import BlogPostFooter from '../components/BlogPostFooter'
import ContentSpacer from '../components/ContentSpacer'
import TextLink from '../components/TextLink'
import SEO from '../components/seo'

const { blogArray } = inputData
const blogPostNo = 0
const blog = blogArray[blogPostNo]

const BlogFirstPage = () => {
  const tagList = blog.tags.map(tag => tag.name).join(' / ')
  return (
    <Layout>
      <SEO
        title="What is Career Coaching?"
        description="What is the point of coaching and how is it different to mentoring or therapy?"
      />
      <ContentBlock>
        <TextHeader mainHeader={blog.title} size="Large" />
        <div className="w-100 d-flex justify-content-center mb-3 mx-auto">
          <div
            style={{ width: '100%', maxWidth: '540px', aspectRatio: '16/9' }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5cEwQFv45kk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <BlogPostFooter tagList={tagList} post_date={blog.post_date} />
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
