import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/react'

import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TextHeader from '../components/TextHeader'
import TextParagraph from '../components/TextParagraph'
import ContentBlock from '../components/ContentBlock'
import ContentText from '../components/ContentText'
import ContentTextImage from '../components/ContentTextImage'
import TextQuote from '../components/TextQuote'
import inputData from '../pagesInput/about-me'
import ContentIconList from '../components/ContentIconList'

const AboutMePage = ({ data }) => {
  const image1 = data.natural.childImageSharp.fluid
  

  const {
    leadColorHeader,
    leadMainHeader,
    leadParagraphs,
    storyTitle1,
    storyParagraphs1,
  } = inputData

  const storyArray = [
    {
      image: image1,
      title: storyTitle1,
      paragraphs: storyParagraphs1,
    },
    
  ]


  // Images (mobile and full size) for hero banner

  const sources = [
    {
      ...data.mobileImage.childImageSharp.fluid,
      media: `(max-width: 540px)`,
    },
    
  ]

  return (
    <Layout>
      <SEO
        title="About us"
      />
      {/* ******** */}
      {/* Hero Banner Image */}
      {/* ******** */}
      
      {/* ******** */}
      {/* Lead Blurb */}
      {/* ******** */}
      <ContentBlock> 
  <ContentText> 
    <TextHeader 
      colorHeader={leadColorHeader} 
      mainHeader={leadMainHeader} 
    /> 
    <TextParagraph 
      paragraphs={leadParagraphs}  
      style={{ margin: '0px', paddingBottom: '0px' }} 
    /> 
  </ContentText> 
</ContentBlock>

{/* WHAT LIGHTS ME UP */}
<ContentBlock> 
  {storyArray.map((item, index) => ( 
    <ContentTextImage  
      key={index}
      image={item.image} 
      imageSide={index % 2 ? 'left' : 'right'} 
      className="py-0" 
    > 
      <TextHeader 
        colorHeader={item.title} 
        size="small" 
        alignHeader="left" 
      />   
      <TextParagraph 
        paragraphs={item.paragraphs} 
        medium 
      /> 
    </ContentTextImage> 
  ))} 
</ContentBlock>

    </Layout>
  )
}

export default AboutMePage

// Select Images using pagequery below.

export const pageQuery = graphql`
  query {
    mobileImage: file(relativePath: { eq: "hero/trial1.png" }) {
      childImageSharp {
        fluid(maxWidth: 540, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  
    # actual display image
    natural: file(relativePath: { eq: "aboutme/trial1.png" }) {
      ...AboutMeImage
    }
  }
`

AboutMePage.propTypes = {
  data: PropTypes.object,
}

AboutMePage.defaultProps = {
  data: {},
}
