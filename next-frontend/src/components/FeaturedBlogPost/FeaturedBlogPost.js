import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import BlogPostImage from '../BlogPostImage';
import TextHeader from '../TextHeader';
import TextParagraph from '../TextParagraph';
import Button from '../Button/Button';

// FeaturedPost component to display a blog post with image, title, description, and PDF download button
const FeaturedPost = ({ blogInfo, pricelistTitle, image, src }) => {
  // Extracting data from blogInfo
  const { title, summary, link } = blogInfo;

  // Function to handle PDF download
  const handleDownload = async () => {
    try {
      const response = await fetch(link); // Fetch the PDF file from the provided link
      if (!response.ok) throw new Error('Failed to download the file.');

      const blob = await response.blob(); // Convert the response to a blob
      const url = window.URL.createObjectURL(blob);

      // Create and trigger the temporary download link
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.download = `${title || 'file'}.pdf`; // Default filename if title is unavailable
      tempLink.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="h-100 border-rounded shadow-sm d-flex flex-wrap px-3 pb-3">
      <div className="w-100">
        {/* Display the blog image */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <BlogPostImage image={image} src={src} />
        </div>

        {/* Display the product title below the image */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <TextHeader
            size="medium"
            mainHeader={pricelistTitle || title} // Title fallback to blog post title
            alignHeader="center"
          />
        </div>

        {/* Display the summary of the blog post */}
        <TextParagraph paragraphs={summary} small />

        {/* Button to trigger PDF download */}
        <Button onClick={handleDownload} target="_blank" rel="noopener noreferrer">
          Download PDF
        </Button>
      </div>
    </div>
  );
};

// PropTypes validation
FeaturedPost.propTypes = {
  blogInfo: PropTypes.object.isRequired, // Object containing blog post data
  pricelistTitle: PropTypes.string, // Title passed explicitly, fallback for blog title
  image: PropTypes.string, // Image URL for the blog post
  src: PropTypes.string, // Source URL for the image
};

// Default props for the component
FeaturedPost.defaultProps = {
  pricelistTitle: 'Untitled Product', // Default title if not provided
  image: '', // Default value for image URL
  src: '', // Default value for image source
};

export default FeaturedPost;
