import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Card, CardMedia, CardContent, Typography, Box, CircularProgress, Button, Grid } from '@mui/material';

const ProductTemplate = ({ pageContext }) => {
  const { product_id } = pageContext;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef(null); // Create a ref for the grid

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product_id}`);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setProduct(data);

        if (data.subcategory_id) {
          const relatedResponse = await fetch(
            `http://localhost:5000/api/products?subcategory_id=${data.subcategory_id}`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const filteredProducts = relatedData.filter(item => item.product_id !== product_id);
            const randomRelatedProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
            setRelatedProducts(randomRelatedProducts);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [product_id]);

  const handleScroll = (direction) => {
    if (gridRef.current) {
      const scrollAmount = gridRef.current.clientWidth / 2; // Scroll half the width of the grid
      gridRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <Layout>
      <SEO title={product.product_name} description={product.description} />
      <ProductWrapper>
        <ProductInfoContainer>
          <ProductImageCard>
            <ProductImageContainer>
              <CardMedia
                component="img"
                height="300"
                image={`http://localhost:5000/images/${product.product_image}`}
                alt={product.product_name}
                sx={{ borderRadius: 2, objectFit: 'cover', transition: 'transform 0.3s ease' }}
              />
              <ImageOverlay />
            </ProductImageContainer>
          </ProductImageCard>
          <ProductDescriptionCard>
            <CardContent>
              <Typography variant="h4" component="h1" sx={{ mb: 1 }}>{product.product_name}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>Product Code:</strong> {product.product_code}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}><strong>Description:</strong> {product.description}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>Ampere:</strong> {product.ampere}</Typography>
            </CardContent>
          </ProductDescriptionCard>
        </ProductInfoContainer>
      </ProductWrapper>

      <SpecificationsWrapper>
        <SpecificationsContainer>
          <SpecificationsCard>
            <SpecificationsTitleCard>Technical Specifications</SpecificationsTitleCard>
            <SpecificationsList>
              {product.technical_specification ? (
                <li>{product.technical_specification}</li>
              ) : (
                <li>No technical specifications available.</li>
              )}
            </SpecificationsList>
          </SpecificationsCard>
          <SpecificationsCard>
            <SpecificationsTitleCard>Other Specifications</SpecificationsTitleCard>
            <SpecificationsList>
              {product.other_specifications ? (
                <li>{product.other_specifications}</li>
              ) : (
                <li>No other specifications available.</li>
              )}
            </SpecificationsList>
          </SpecificationsCard>
        </SpecificationsContainer>
      </SpecificationsWrapper>

      <RelatedProductsWrapper>
        <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center' }}>Related Products</Typography>
        <SliderContainer>
          <Button onClick={() => handleScroll(-1)}>{"<"}</Button>
          <ProductGrid container spacing={2} ref={gridRef}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={relatedProduct.product_id}>
                  <RelatedProductCard onClick={() => window.location.href = `/products/${relatedProduct.product_id}`}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:5000/images/${relatedProduct.product_image}`}
                      alt={relatedProduct.product_name}
                      sx={{ borderRadius: 1, mb: 1, objectFit: 'cover' }}
                    />
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>{relatedProduct.product_name}</Typography>
                  </RelatedProductCard>
                </Grid>
              ))
            ) : (
              <Typography variant="body2">No related products available.</Typography>
            )}
          </ProductGrid>
          <Button onClick={() => handleScroll(1)}>{">"}</Button>
        </SliderContainer>
      </RelatedProductsWrapper>
    </Layout>
  );
};

// Styled components
const ProductWrapper = styled(Box)`
  margin-bottom: 2rem;
`;

const ProductInfoContainer = styled(Box)`
  display: flex;
  justify-content: center; // Center align
  gap: 1rem; // Space between image and description cards
  flex-wrap: wrap; // Allow wrapping on smaller screens
`;

const ProductImageCard = styled(Card)`
  width: 500px; // Fixed width for the image card
  position: relative; // Needed for the overlay
`;

const ProductImageContainer = styled(Box)`
  position: relative; 
  overflow: hidden; 
  border-radius: 8px; 
  &:hover img {
    transform: scale(1.1); // Zoom effect on hover
  }
`;

const ImageOverlay = styled(Box)`
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background-color: rgba(255, 255, 255, 0.2); // Optional overlay effect
`;

const ProductDescriptionCard = styled(Card)`
  flex: 1; // Take up remaining space
  max-width: 600px; // Maximum width for the description card
  padding: 1rem;
`;

const SpecificationsWrapper = styled(Box)`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const SpecificationsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Space between columns
  @media (min-width: 768px) {
    flex-direction: row; // Change to row on larger screens
  }
`;

const SpecificationsCard = styled(Card)`
  flex: 1; // Equal space distribution
  padding: 1rem; // Padding for the column
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SpecificationsTitleCard = styled(Typography)`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

const SpecificationsList = styled.ul`
  list-style-type: none; 
  padding: 0; 
  margin-top: 0.5rem;
`;

const RelatedProductsWrapper = styled(Box)`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const SliderContainer = styled(Box)`
  display: flex;
  align-items: center; // Align items vertically
  overflow: hidden; // Prevent scrollbars from appearing
`;

const ProductGrid = styled(Grid)`
  display: flex; // Use flex display
  overflow-x: auto; // Allow horizontal scrolling
  gap: 2px; // Use a consistent gap between products
  scroll-behavior: smooth; // Smooth scrolling
  flex-wrap: nowrap; // Prevent wrapping to a new line
  align-items: center; // Center align items vertically
  padding: 5px; // Add padding to the grid
  /* Hide scrollbar in modern browsers */
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar in WebKit browsers
  }
`;

const RelatedProductCard = styled(Card)`
  padding: 1rem; // Adjust padding for related product card
  text-align: center; // Center align text
  cursor: pointer; // Change cursor on hover
  transition: transform 0.2s; // Add transition for hover effect
  flex: 0 0 auto; // Allow flex item to size based on content
  width: 100%; // Full width for card
  max-width: 500px; // Set a max width to control size
  max-height: 400px; // Set a max height to control size
  /* Prevent overflow */
  overflow: hidden;
  img {
    max-width: 100%; // Ensure image fits within the card
    height: auto; // Maintain aspect ratio
  }
`;


ProductTemplate.propTypes = {
  pageContext: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductTemplate;
