import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ContentBlock from '../components/ContentBlock';
import FeaturedBlogPost from '../components/FeaturedBlogPost';
import BlogPostContainer from '../components/BlogPostContainer';
import TextHeader from '../components/TextHeader';
import ContentText from '../components/ContentText';
import Head from 'next/head'; 

const PriceList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [priceListData, setPriceListData] = useState([]);
  const [error, setError] = useState(false); // Track errors

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const API_URL = 'https://slategray-louse-109965.hostingersite.com/routes/index.php?endpoint=pricelist';
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch price list data. Status: ${response.status}`);
        const data = await response.json();
        setPriceListData(data);

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


      <ContentBlock className="d-flex align-items-center py-0">
      <ContentText className="py-0">
          <TextHeader mainHeader="Price List"/>
      </ContentText>

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
                    image={`https://slategray-louse-109965.hostingersite.com/public/images/pdfs/${item.image_path}` || blogImageArray[0]} // Fallback to first image if none
                    link={`https://slategray-louse-109965.hostingersite.com/download.php?id=${item.id}`} // Construct dynamic download link
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
      </ContentBlock>
    </Layout>
  );
};

export default PriceList;