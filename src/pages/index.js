import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ContentText from '../components/ContentText';
import ContentTextImage from '../components/ContentTextImage';
import ContentBlock from '../components/ContentBlock';
import BannerCarousel from '../components/Carousel';
import TriSection from '../components/TriSection';
import FeaturedBlogPost from '../components/FeaturedBlogPost';
import inputData from '../pagesInput/index';
import ProductInputData from '../pagesInput/ProductCard';
import MainButton from '../components/MainButton';
import TextHeader from '../components/TextHeader';
import TextParagraph from '../components/TextParagraph';
import ProductCard from '../components/ProductCard';
import SimpleIcon from '../components/SimpleIcon';
import CalendlyButton from '../components/CalendlyButton';
import Stocklist from '../components/Stocklist/Stocklist';
import StyledCalendlyButton from '../components/CalendlyWidget';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Fade from 'react-reveal/Fade'; // Import Fade animation
import { motion } from 'framer-motion';

// //images for stocklist
// import stockImage1 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// import stockImage2 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// import stockImage3 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// import stockImage4 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// import stockImage5 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// import stockImage6 from '../images/hero/hero-lt1.jpg';  // Replace with actual paths
// Import images for the carousel
import bannerImage1 from '../images/hero/banner1.jpg';
import bannerImage2 from '../images/hero/banner2.jpg'; // Update with actual image paths
import bannerImage3 from '../images/hero/banner3.jpg';
import bannerImage4 from '../images/hero/banner4.jpg';


const IndexPage = ({ data }) => {
  // Define Images
  const profileImage = data.profilePic.childImageSharp.fluid;
  const blogImage1 = data.blogImage1.childImageSharp.fluid;
  const blogImage2 = data.blogImage2.childImageSharp.fluid;
  const blogImage3 = data.blogImage3.childImageSharp.fluid;
  const blogImage4 = data.blogImage4.childImageSharp.fluid;
  const blogImage5 = data.blogImage5.childImageSharp.fluid;
  const blogImage6 = data.blogImage6.childImageSharp.fluid;
  const blogImage7 = data.blogImage7.childImageSharp.fluid;
  const blogImage8 = data.blogImage8.childImageSharp.fluid;

  const {
    aboutMeParagraphArray,
    
    blogSectionTitle,
  } = inputData;

  const blogImageArray = [blogImage1, blogImage2, blogImage3, blogImage4, blogImage5, blogImage6, blogImage7, blogImage8];
  const { productArray } = ProductInputData;

  // Define banners for the carousel
  const banners = [
    { image: bannerImage1 },
    { image: bannerImage2 },
    { image: bannerImage3 },
    { image: bannerImage4 },
  ];

  return (
    <Layout>
      <SEO title="Dhanesh and company photo" description="none" />

      {/* Responsive Carousel */}
      <BannerCarousel banners={banners} />

      {/* Authorized Stocklist Section */}
      <ContentBlock>
        <Stocklist />
      </ContentBlock>

      {/* About Us Section with Animation */}
      <ContentBlock color>
        <Fade bottom duration={1500}>
          <TextHeader mainHeader="About Us" />
          <ContentTextImage
            image={profileImage}
            paragraphs={aboutMeParagraphArray}
            xtraWide
          >
            <TextParagraph paragraphs={aboutMeParagraphArray} />
            <MainButton label="Read more" primary href="/about-me/" />
          </ContentTextImage>
        </Fade>
      </ContentBlock>

      {/* New Products Section with Animation */}
      <ContentBlock>
      <TextHeader size="large" mainHeader={blogSectionTitle} />
  <TriSection noCards={4} xtraWide>
    {productArray.slice(0, 8).map((product, index) => (
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.1 }}
      >
        <ProductCard
          blogInfo={product}
          image={blogImageArray[index]}
        />
      </motion.div>
    ))}
  </TriSection>
      </ContentBlock>
    </Layout>
  );
};

export default IndexPage;

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1600, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const profileImageFragment = graphql`
  fragment profileImage on File {
    childImageSharp {
      fluid(maxWidth: 400, quality: 100) {
        ...GatsbyImageSharpFluid
        ...GatsbyImageSharpFluidLimitPresentationSize
      }
    }
  }
`;

export const pageQuery = graphql`
  query {
    profilePic: file(relativePath: { eq: "index/trial1.png" }) {
      ...profileImage
    }
    testimonialImage1: file(relativePath: { eq: "testimonials/deepa-square-300.jpg" }) {
      ...fluidImage
    }
    testimonialImage2: file(relativePath: { eq: "testimonials/jess-square-300.jpg" }) {
      ...fluidImage
    }
    testimonialImage3: file(relativePath: { eq: "testimonials/lucy-square-300.jpg" }) {
      ...fluidImage
    }
    blogImage1: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage2: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage3: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage4: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage5: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage6: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage7: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
    blogImage8: file(relativePath: { eq: "blog/trial1.png" }) {
      ...profileImage
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object,
};

IndexPage.defaultProps = {
  data: {},
};
