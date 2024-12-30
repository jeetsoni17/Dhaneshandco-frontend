import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import TextHeader from '../components/TextHeader';
import { useRouter } from 'next/router'; 
import { CONFIG } from '../../config';

import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Box,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Head from 'next/head';

const Products = ({ categories, products, subcategories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCategorySelect = (category_id) => {
    setSelectedCategory(category_id);
    setFilteredProducts(products.filter((product) => product.category_id === category_id));
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory_id) => {
    setSelectedSubcategory(subcategory_id);
    setFilteredProducts(
      products.filter(
        (product) => product.subcategory_id === subcategory_id && product.category_id === selectedCategory
      )
    );
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      const response = await fetch(`http://100.115.154.61:5000/api/products?search=${searchTerm}`);
      if (!response.ok) throw new Error('Error fetching search results');

      const searchResults = await response.json();
      setFilteredProducts(searchResults);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown Category';
  };

  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub.subcategory_id === subcategoryId);
    return subcategory ? subcategory.subcategory_name : 'Unknown Subcategory';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Layout>

      <Box maxWidth="1200px" mx="auto" py={3}>
        <TextHeader mainHeader="Available Products"/>

        <Box display="flex" gap={3} pt={3}>
          {/* Sidebar */}
          <Sidebar>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                endAdornment: <SearchIcon style={{ cursor: 'pointer' }} onClick={handleSearch} />,
              }}
            />

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">
                  Categories
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories.map((category) => (
                  <Button
                    key={category.category_id}
                    onClick={() => handleCategorySelect(category.category_id)}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                    }}
                  >
                    {category.category_name}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>

            {selectedCategory && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Subcategories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {subcategories
                    .filter((sub) => sub.category_id === selectedCategory)
                    .map((subcategory) => (
                      <Button
                        key={subcategory.subcategory_id}
                        onClick={() => handleSubcategorySelect(subcategory.subcategory_id)}
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                        }}
                      >
                        {subcategory.subcategory_name}
                      </Button>
                    ))}
                </AccordionDetails>
              </Accordion>
            )}
          </Sidebar>

          {/* Product Section */}
          <ProductSection>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
              gap={3}
            >
              {filteredProducts.map((product) => (
                <Card
                onClick={() => router.push(`/products/${product.product_id}`)}
                sx={{
                  borderRadius: '15px', // Rounded edges
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Smooth hover effects
                  '&:hover': {
                    transform: 'scale(1.05)', // Slightly enlarge on hover
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180" // Adjusted for a more prominent image
                  image={`${CONFIG.BASE_API_URL}/public/images/product/${product.product_image}`} // Ensure correct image path for production
                  alt="Product"
                  sx={{
                    borderTopLeftRadius: '20px', // Rounded corners for the image
                    borderTopRightRadius: '20px',
                    width: '46%', // Set the width to be smaller than the card
                    height: 'auto', // Maintain aspect ratio
                    margin: '10px auto', // Center the image within the card
                  }}
                />
                <CardContent
                  sx={{
                    padding: '20px', // Adjust padding for better spacing
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                    {getCategoryName(product.category_id)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                    {getSubcategoryName(product.subcategory_id)}
                  </Typography>
                </CardContent>
              </Card>
              
              ))}  
            </Box>
          </ProductSection>
        </Box>
      </Box>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const categoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=categories`
    );
    const productsResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=products`
    );
    const subcategoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=subcategories`
    );

    if (!categoriesResponse.ok || !productsResponse.ok || !subcategoriesResponse.ok) {
      throw new Error('Error fetching data');
    }

    const categories = await categoriesResponse.json();
    const products = await productsResponse.json();
    const subcategories = await subcategoriesResponse.json();

    return {
      props: {
        categories,
        products,
        subcategories,
      },
    };
  } catch (error) {
    return {
      props: {
        categories: [],
        products: [],
        subcategories: [],
        error: error.message,
      },
    };
  }
}

const Sidebar = styled(Box)`
  flex: 1;
  padding-right: 1rem;
  border-right: 1px solid #ddd;
`;

const ProductSection = styled(Box)`
  flex: 3;
`;

export default Products;
