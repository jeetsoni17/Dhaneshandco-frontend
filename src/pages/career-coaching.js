import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { graphql, navigate } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import HeroBanner from '../components/HeroBanner'
import ContentBlock from '../components/ContentBlock'
import ContentText from '../components/ContentText'
import ContentTextImage from '../components/ContentTextImage'
import TextHeader from '../components/TextHeader'
import TextParagraph from '../components/TextParagraph'
import SimpleIcon from '../components/SimpleIcon'
import ContentSpacer from '../components/ContentSpacer'
import TextList from '../components/TextList'
import TextCardGroup from '../components/TextCardGroup'
import MainButton from '../components/MainButton'
import TextQuote from '../components/TextQuote'
import CalendlyButton from '../components/CalendlyButton'

import inputData from '../pagesInput/career-coaching'
import ContentIconList from '../components/ContentIconList'

const HowICanHelpPage = ({ data }) => {
  const blogImage = data.blogImage1.childImageSharp.fluid

  const {
    leadMainHeader,
    leadQuote,
    leadQuoteName,
    leadQuoteJob,
    leadParagraphs,
    iconListIntro,
    icon1,
    iconListItemTitle1,
    iconListItemText1,
    icon2,
    iconListItemTitle2,
    iconListItemText2,
    icon3,
    iconListItemTitle3,
    iconListItemText3,
    iconListOutro,
    includedListHeader,
    includedListIntro,
    includedListItems,
    typeOfCoachHeader,
    cardArray,
    blogPostHeader,
    blogPostBody,
  } = inputData

  const iconListArray = [
    {
      image: icon1,
      title: iconListItemTitle1,
      paragraphs: [iconListItemText1],
    },
    {
      image: icon1,
      title: iconListItemTitle2,
      paragraphs: [iconListItemText2],
    },
    {
      image: icon3,
      title: iconListItemTitle3,
      paragraphs: [iconListItemText3],
    },
  ]

  // Images (mobile and full size) for hero banner

  const sources = [
    {
      ...data.mobileImage.childImageSharp.fluid,
      media: `(max-width: 540px)`,
    },
    {
      ...data.desktopImage.childImageSharp.fluid,
      media: `(min-width: 541px)`,
    },
  ]

  return (
    <Layout>
      <SEO
        title="testing"
        description="What is career coaching and how can it help you?"
      />
      <HeroBanner
        sources={sources}
        css={css`
          background-position: center bottom;
        `}
      >
        <div className="container align-self-start align-self-sm-center pt-3 pt-sm-0 px-2">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6">
              <TextQuote paragraphs={leadQuote} bs="fst-italic" />
              <TextParagraph
                paragraphs={`- ${leadQuoteName}, ${leadQuoteJob}`}
                bs="text-end pt-5"
                small
              />
            </div>
          </div>
        </div>
      </HeroBanner>
      {/* <!-- xxxxxxxxxxxxxxxxxxx -->
    <!-- Initial text -->
    <!-- xxxxxxxxxxxxxxxxxxx --> */}
      <ContentBlock>
        <ContentText xtraWide>
          <TextHeader mainHeader={leadMainHeader} />
          <TextParagraph paragraphs={leadParagraphs} />
          <CalendlyButton />
          <TextParagraph paragraphs="" />
          <TextParagraph paragraphs={iconListIntro} />
        </ContentText>
        <ContentSpacer bs="pb-3 pb-lg-5" />
        {iconListArray.map(item => (
          <ContentIconList
            xtraWide
            childrenImage={<SimpleIcon icon={item.image} />}
            childrenText={
              <>
                <TextHeader size="medium" mainHeader={item.title} />
                <TextParagraph paragraphs={item.paragraphs} bs="mb-0" small />
              </>
            }
          />
        ))}
        <ContentSpacer bs="pb-3 pb-lg-5" />
        <ContentText xtraWide>
          <TextParagraph paragraphs={iconListOutro} />
        </ContentText>
      </ContentBlock>

      {/* <!-- xxxxxxxxxxxxxxxxxxx -->
    <!-- What you'll get -->
    <!-- xxxxxxxxxxxxxxxxxxx --> */}
      <ContentBlock color>
        <ContentText xtraWide>
          <TextHeader mainHeader={includedListHeader} />
          <TextParagraph paragraphs={includedListIntro} />
          <TextList listArray={includedListItems} />
        </ContentText>
      </ContentBlock>
      {/* <!-- xxxxxxxxxxxxxxxxxxx -->
    <!-- What kind of coach am i? -->
    <!-- xxxxxxxxxxxxxxxxxxx --> */}
      <ContentBlock>
        <TextHeader mainHeader={typeOfCoachHeader} />
        <TextCardGroup cards={cardArray} />
      </ContentBlock>
      {/* <!-- xxxxxxxxxxxxxxxxxxx -->
    <!-- What kind of coach do you need? -->
    <!-- xxxxxxxxxxxxxxxxxxx --> */}
      <ContentBlock color>
        <TextHeader mainHeader={blogPostHeader} />
        <ContentTextImage image={blogImage} xtraWide>
          <TextParagraph paragraphs={blogPostBody} />
          <MainButton
            bs="mx-auto d-block"
            label="Read more"
            primary
            onClick={() => navigate('/about-me/')}
            href="/what-kind-of-coach-do-i-need/"
          />
        </ContentTextImage>
      </ContentBlock>
    </Layout>
  )
}

export default HowICanHelpPage
/*
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1600, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
*/

export const blogImageFragment = graphql`
  fragment blogImage on File {
    childImageSharp {
      fluid(maxWidth: 400, quality: 100) {
        ...GatsbyImageSharpFluid
        ...GatsbyImageSharpFluidLimitPresentationSize
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    mobileImage: file(relativePath: { eq: "hero/hero-shoots-mob-80.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 540, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    desktopImage: file(relativePath: { eq: "hero/hero-shoots.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    profilePic: file(relativePath: { eq: "index/nikki-profile-comp.jpg" }) {
      ...fluidImage
    }
    blogImage1: file(relativePath: { eq: "blog/blog1.png" }) {
      ...blogImage
    }
  }
`

HowICanHelpPage.propTypes = {
  data: PropTypes.object,
}

HowICanHelpPage.defaultProps = {
  data: {},
}
