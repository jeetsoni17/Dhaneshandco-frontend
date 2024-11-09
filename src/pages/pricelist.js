import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

import Layout from '../components/layout';
import ContentBlock from '../components/ContentBlock';
import FeaturedBlogPost from '../components/FeaturedBlogPost';
import BlogPostContainer from '../components/BlogPostContainer';
import TextHeader from '../components/TextHeader';
import inputData from '../pagesInput/pricelist';
import SEO from '../components/seo';

// Destructuring the blog array from the inputData object.
const { blogArray } = inputData;

const BlogHomePage = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [blogPosts, setBlogPosts] = useState(blogArray); // State to store blog posts

  // Extracting images fetched via GraphQL query
  const blogImage1 = data.blogImage1.childImageSharp.fluid;
  const blogImage2 = data.blogImage2.childImageSharp.fluid;
  const blogImage3 = data.blogImage3.childImageSharp.fluid;
  const blogImage4 = data.blogImage4.childImageSharp.fluid;
  const blogImage5 = data.blogImage5.childImageSharp.fluid; // New blog image 5
  const blogImage6 = data.blogImage6.childImageSharp.fluid; // New blog image 6

  // Array to hold all blog images
  const blogImageArray = [blogImage1, blogImage2, blogImage3, blogImage4, blogImage5, blogImage6];

  // Function to sort blog posts by date, most recent first
  const sortPostsMostRecent = (array) =>
    array.sort((a, b) => {
      const c = new Date(a.post_date); // Convert post_date to Date object
      const d = new Date(b.post_date); // Convert post_date to Date object
      return d - c; // Sort by date in descending order (most recent first)
    });

  // Side effect hook to fetch blog posts from an external API (currently commented out)
  useEffect(() => {
    /*
    const allBlogPostsURL = `https://josephfletcher.co.uk/blog-backend/api/blogposts`
    fetch(allBlogPostsURL, {})
      .then(res => res.json())
      .then(response => {
        setBlogPosts(sortPostsMostRecent(response)); // Set sorted blog posts
        setIsLoading(false); // Set loading status to false
      })
      .catch(error => console.log(error));
    */
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <Layout>
      {/* SEO component for meta tags */}
      <SEO title="Price List" description="Price List" />

      {/* Header component for the blog page */}
      <TextHeader mainHeader="Price List" size="Large" />

      {/* Check if the data is still loading */}
      {!isLoading ? (
        <ContentBlock>
          <BlogPostContainer xtraWide cards={3}>
            {/* Loop over blogPosts array and display each blog with animations */}
            {blogPosts.map((blog, index) => (
              <motion.div 
                key={blog._id} // Unique key for each blog post
                initial={{ opacity: 0, y: 20 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Final animation state
                transition={{ duration: 0.5, delay: index * 0.1 }} // Animation transition settings
              >
                <FeaturedBlogPost
                  blogInfo={blog} // Blog information
                  image={blogImageArray[index]} // Corresponding blog image
                />
              </motion.div>
            ))}
          </BlogPostContainer>
        </ContentBlock>
      ) : (
        <ContentBlock>
          {/* Loading state - can be styled for loaders or spinners */}
          <BlogPostContainer xtraWide cards={3}>
            {blogPosts.map((blog, index) => (
              <FeaturedBlogPost
                key={blog._id}
                blogInfo={blog}
                image={blogImageArray[index]}
              />
            ))}
          </BlogPostContainer>
        </ContentBlock>
      )}
    </Layout>
  );
};

export default BlogHomePage;

// GraphQL fragment for reusable blog image queries
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

// PageQuery to fetch images for blogs
export const pageQuery = graphql`
  query {
    projectHero: file(relativePath: { eq: "hero/trial1.png" }) {
      ...fluidImage
    }
    blogImage2: file(relativePath: { eq: "blog/trial1.png" }) {
      ...blogImageMain
    }
    blogImage3: file(relativePath: { eq: "blog/trial1.png" }) {
      ...blogImageMain
    }
    blogImage4: file(relativePath: { eq: "blog/trial1.png" }) {
      ...blogImageMain
    }
    blogImage1: file(relativePath: { eq: "blog/trial1.png" }) {
      ...blogImageMain
    }
    blogImage5: file(relativePath: { eq: "blog/trial1.png" }) {  
      ...blogImageMain
    }
    blogImage6: file(relativePath: { eq: "blog/trial1.png" }) {  
      ...blogImageMain
    }
  }
`;

// PropTypes for data validation
BlogHomePage.propTypes = { data: PropTypes.object };
BlogHomePage.defaultProps = { data: {} };
  