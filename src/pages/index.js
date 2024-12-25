import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
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
import Stocklist from '../components/Stocklist';
import { motion } from 'framer-motion'; // Importing framer-motion
import Head from 'next/head'; 
import bannerImage1 from '../images/hero/banner1.jpg';
import bannerImage2 from '../images/hero/banner2.jpg'; 
import bannerImage3 from '../images/hero/banner3.jpg'; 
import trial1 from '../images/about_us/trial1.png';

const IndexPage = ({ data }) => {
  // Define Images
  const profileImage = data.profilePic; // Direct use in Next.js

  const { aboutMeParagraphArray, blogSectionTitle } = inputData;
  const { productArray } = ProductInputData;

  // Define banners for the carousel
  const banners = [
    bannerImage1,
    bannerImage2,
    bannerImage3
  ];


  return (
    <Layout>
      <Head>
        <title>Dhanesh and company photo</title>
        <meta name="description" content="none" />
      </Head>

      {/* Responsive Carousel */}
      <BannerCarousel banners={banners} />

      {/* Authorized Stocklist Section */}
      <ContentBlock>
        <Stocklist />
      </ContentBlock>

      {/* About Us Section with Animation */}
      <ContentBlock color>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <TextHeader mainHeader="About Us" />
          <ContentTextImage
            image={trial1.src}
            paragraphs={aboutMeParagraphArray}
            xtraWide
          >
            <TextParagraph paragraphs={aboutMeParagraphArray} />
            <MainButton label="Read more" primary href="/about-us/" />
          </ContentTextImage>
        </motion.div>
      </ContentBlock>

      {/* Featured Products Section */}
      {/* <ContentBlock>
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
                image={product.image}  // Assuming 'product.image' exists
              />
            </motion.div>
          ))}
        </TriSection>
      </ContentBlock> */}
    </Layout>
  );
};

export async function getStaticProps() {
  // Example: You can fetch data here using a CMS or local files
  const data = {
    profilePic: trial1, // Replace with your actual image path
  };

  return {
    props: { data },
  };
}

IndexPage.propTypes = {
  data: PropTypes.object,
};

IndexPage.defaultProps = {
  data: {},
};

export default IndexPage;
