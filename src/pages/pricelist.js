import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ContentBlock from '../components/ContentBlock';
import FeaturedBlogPost from '../components/FeaturedBlogPost';
import BlogPostContainer from '../components/BlogPostContainer';
import TextHeader from '../components/TextHeader';
import Head from 'next/head'; 

const PriceList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [priceListData, setPriceListData] = useState([]);
  const [error, setError] = useState(false); // Track errors

  // Placeholder images array (replace with actual local images if necessary)
  const blogImageArray = [
    '/images/blog/trial1.png',
    '/images/blog/trial2.png',
    '/images/blog/trial3.png',
    '/images/blog/trial4.png',
    '/images/blog/trial5.png',
    '/images/blog/trial6.png',
  ];

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
  }, []);

  return (
    <Layout>
      <Head>
        <title>Price List</title>
        <meta name="description" content="Browse and download our latest price lists" />
      </Head>

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
                    image={item.image || blogImageArray[0]} // Fallback to first image if none
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

// Static or Server-side data fetching
export async function getStaticProps() {
  // You can add a fallback or fetch the data here if needed
  // Example static data fetch:
  // const res = await fetch('http://dhaneshnco.in/api/pricelist');
  // const priceListData = await res.json();

  return {
    props: {}, // Pass any required props if needed for static generation
  };
}

PriceList.propTypes = {
  data: PropTypes.object,
};

PriceList.defaultProps = {
  data: {},
};

export default PriceList;
