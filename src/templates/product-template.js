import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Head from 'next/head';
import { Card, CardContent, Typography, Box, CircularProgress, Button, Grid } from '@mui/material';
import Image from 'next/image'; // Import next/image for optimized images

const ProductTemplate = ({ product, relatedProducts, error }) => {
  const gridRef = useRef(null);

  const handleScroll = (direction) => {
    if (gridRef.current) {
      const scrollAmount = gridRef.current.clientWidth / 2; // Scroll half the width of the grid
      gridRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <Layout>
      <Head>
        <title>{product.product_name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <ProductWrapper>
        <ProductInfoContainer>
          <ProductImageCard>
            <ProductImageContainer>
              <Image
                src={`http://localhost:5000/images/${product.product_image}`}
                alt={product.product_name}
                width={500} // Use the correct width and height
                height={300}
                layout="intrinsic"
                objectFit="cover"
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
                    <Image
                      src={`http://localhost:5000/images/${relatedProduct.product_image}`}
                      alt={relatedProduct.product_name}
                      width={300} // Define width and height
                      height={200}
                      layout="intrinsic"
                      objectFit="cover"
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

export async function getServerSideProps(context) {
  const { product_id } = context.params;
  let product = null;
  let relatedProducts = [];
  let error = null;

  try {
    // Fetch product data
    const productResponse = await fetch(`http://localhost:5000/api/products/${product_id}`);
    if (productResponse.ok) {
      product = await productResponse.json();

      if (product.subcategory_id) {
        // Fetch related products based on subcategory_id
        const relatedResponse = await fetch(
          `http://localhost:5000/api/products?subcategory_id=${product.subcategory_id}`
        );
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          const filteredProducts = relatedData.filter(item => item.product_id !== product_id);
          const randomRelatedProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
          relatedProducts = randomRelatedProducts;
        }
      }
    } else {
      error = 'Product not found';
    }
  } catch (err) {
    error = err.message;
  }

  return {
    props: {
      product,
      relatedProducts,
      error,
    },
  };
}

ProductTemplate.propTypes = {
  product: PropTypes.object,
  relatedProducts: PropTypes.array,
  error: PropTypes.string,
};

export default ProductTemplate;

// Styled components (keep them the same as in your original code)
const ProductWrapper = styled(Box)`
  margin-bottom: 2rem;
`;

const ProductInfoContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProductImageCard = styled(Card)`
  width: 500px;
  position: relative;
`;

const ProductImageContainer = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  &:hover img {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

const ProductDescriptionCard = styled(Card)`
  flex: 1;
  max-width: 600px;
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
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SpecificationsCard = styled(Card)`
  flex: 1;
  padding: 1rem;
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
  align-items: center;
  overflow: hidden;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  overflow-x: auto;
  gap: 2px;
  scroll-behavior: smooth;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RelatedProductCard = styled(Card)`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  flex: 0 0 auto;
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  overflow: hidden;
  img {
    max-width: 100%;
    height: auto;
  }
`;
