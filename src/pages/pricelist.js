import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Layout from '../components/layout';
import ContentBlock from '../components/ContentBlock';
import FeaturedBlogPost from '../components/FeaturedBlogPost';
import BlogPostContainer from '../components/BlogPostContainer';
import TextHeader from '../components/TextHeader';
import SEO from '../components/seo';

const PriceList = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [priceListData, setPriceListData] = useState([]);
  const [error, setError] = useState(false); // Track errors

  // Fetching the images from GraphQL query
  const blogImage1 = data.blogImage1?.childImageSharp?.fluid || null;
  const blogImage2 = data.blogImage2?.childImageSharp?.fluid || null;
  const blogImage3 = data.blogImage3?.childImageSharp?.fluid || null;
  const blogImage4 = data.blogImage4?.childImageSharp?.fluid || null;
  const blogImage5 = data.blogImage5?.childImageSharp?.fluid || null;
  const blogImage6 = data.blogImage6?.childImageSharp?.fluid || null;

  const blogImageArray = [blogImage1, blogImage2, blogImage3, blogImage4, blogImage5, blogImage6];

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const API_URL = 'http://dhaneshnco.in/api/pricelist';
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch price list data. Status: ${response.status}`);
        const data = await response.json();

        // Add logic to map local images for matching filenames
        const enrichedData = data.map((item, index) => ({
          ...item,
          image: blogImageArray[index % blogImageArray.length], // Cycle through local images
        }));

        setPriceListData(enrichedData);
      } catch (error) {
        console.error('Error fetching price list:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceList();
  }, [blogImageArray]);

  return (
    <Layout>
      <SEO title="Price List" description="Browse and download our latest price lists" />

      <TextHeader mainHeader="Price List" size="Large" />

      {!isLoading ? (
        error ? (
          <ContentBlock>
            <p style={{ color: 'red' }}>Failed to load the price list. Please try again later.</p>
          </ContentBlock>
        ) : priceListData.length > 0 ? (
          <ContentBlock>
            <BlogPostContainer xtraWide cards={3}>
              {priceListData.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeaturedBlogPost
                    pricelistTitle={item.file_name} // Use the file name as title
                    blogInfo={item}
                    image={item.image || blogImage1} // Fallback to first image if none
                    link={`http://100.115.154.61:5000/download.php?id=${item.id}`} // Construct dynamic download link
                  />
                </motion.div>
              ))}
            </BlogPostContainer>
          </ContentBlock>
        ) : (
          <ContentBlock>
            <p>No price list data available at the moment.</p>
          </ContentBlock>
        )
      ) : (
        <ContentBlock>
          <div className="loader">Loading...</div>
        </ContentBlock>
      )}
    </Layout>
  );
};

export default PriceList;

export const blogImageMainFragment = graphql`
  fragment blogImageMain on File {
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
    blogImage1: file(relativePath: { eq: "blog/trial1.png" }) {
      ...blogImageMain
    }
    blogImage2: file(relativePath: { eq: "blog/trial2.png" }) {
      ...blogImageMain
    }
    blogImage3: file(relativePath: { eq: "blog/trial3.png" }) {
      ...blogImageMain
    }
    blogImage4: file(relativePath: { eq: "blog/trial4.png" }) {
      ...blogImageMain
    }
    blogImage5: file(relativePath: { eq: "blog/trial5.png" }) {
      ...blogImageMain
    }
    blogImage6: file(relativePath: { eq: "blog/trial6.png" }) {
      ...blogImageMain
    }
  }
`;

PriceList.propTypes = {
  data: PropTypes.object.isRequired,
};

PriceList.defaultProps = {
  data: {},
};
