import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import BlogPostImage from '../BlogPostImage';
import TextHeader from '../TextHeader';
import TextParagraph from '../TextParagraph';
import Button from '../Button/Button';

// FeaturedPost component to display a blog post with image, title, description, and PDF download button
const FeaturedPost = ({ blogInfo, pricelistTitle, image, link }) => {
  // Extracting data from blogInfo
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
      tempLink.download = `${blogInfo.file_path}`; 
      tempLink.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="h-100 border-rounded shadow-sm d-flex flex-wrap px-2 pb-3 mx-1">
      <div className="w-100">
        {/* Display the blog image */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <BlogPostImage image={image} src={image} />
        </div>

        {/* Display the product title below the image */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <TextHeader
            size="medium"
            mainHeader={pricelistTitle} // Title fallback to blog post title
            alignHeader="center"
          />
        </div>

        {/* Button to trigger PDF download */}
        <Button onClick={handleDownload} target="_blank" rel="noopener noreferrer">
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default FeaturedPost;
