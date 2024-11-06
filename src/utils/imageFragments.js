import { graphql } from 'gatsby'

export const AboutMeImage = graphql`
  fragment AboutMeImage on File {
    childImageSharp {
      fluid(maxWidth: 400) {
        ...GatsbyImageSharpFluid
        ...GatsbyImageSharpFluidLimitPresentationSize
      }
    }
  }
`
export const ILoveImage = graphql`
  fragment ILoveImage on File {
    childImageSharp {
      fluid(maxWidth: 300) {
        ...GatsbyImageSharpFluid
        ...GatsbyImageSharpFluidLimitPresentationSize
      }
    }
  }
`

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1600, quality:100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
