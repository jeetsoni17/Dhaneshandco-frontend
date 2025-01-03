import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import {
  CircularProgress,
  Typography,
  Grid,
  Button,
  Container,
  Box,
  Divider,
  Paper,
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { CONFIG } from '../../../config';

const ProductPage = ({ product, categories, subcategories, relatedProducts, error }) => {
  const router = useRouter();

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown Category';
  };
  
  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub.subcategory_id === subcategoryId);
    return subcategory ? subcategory.subcategory_name : 'Unknown Subcategory';
  };

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mb: 4, pt: 3}}>
        {/* Main Product Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%', // Ensures the box takes up the full height of the column
                }}
              >
                <img
                  src={`${CONFIG.BASE_API_URL}/public/images/product/${product.product_image}`}
                  alt={product.product_name}
                  style={{
                    width: '70%',
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain', // Ensures the image scales properly without distortion
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* <ZoomInIcon /> */}
                </IconButton>
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {product.product_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
                  {`${getCategoryName(product.category_id)} > ${getSubcategoryName(product.subcategory_id)}`}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  About This Product
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    paddingLeft: '20px',
                    lineHeight: 1.6,
                    marginBottom: 3,
                  }}
                >
                  {product.product_description
                    ?.split(';')
                    .filter((point) => point.trim() !== '')
                    .map((point, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>
                        {point.trim()}
                      </li>
                    ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShareIcon />}
                  onClick={() => {
                    navigator.share
                      ? navigator.share({
                          title: product.product_name,
                          url: window.location.href,
                        })
                      : alert('Sharing not supported on this device.');
                  }}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '50px',
                    px: 4,
                  }}
                >
                  Share This Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Related Products Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.product_id}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    borderRadius: '12px',
                    overflow: 'hidden',
                    minHeight: '230px',
                    height: 'fit-content',
                    justifyItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    transition: '0.3s',
                    ':hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <img
                    src={`${CONFIG.BASE_API_URL}/public/images/product/${relatedProduct.product_image}`}
                    alt={relatedProduct.product_name}
                    style={{
                      width: '60%',
                      display: 'block',
                      height: 'auto',
                      margin: 'auto auto'
                    }}
                  />
                  <Box sx={{ p: 2, pt: 1, textAlign: "center", }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {relatedProduct.product_name}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { product_id } = params;

  try {
    // Fetch the product details
    const productResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=products&id=${product_id}`
    );

    if (!productResponse.ok) throw new Error('Product not found');
    const product = await productResponse.json();

    // Fetch categories and subcategories
    const categoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=categories`
    );
    const subcategoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=subcategories`
    );

    if (!categoriesResponse.ok || !subcategoriesResponse.ok) {
      throw new Error('Error fetching data');
    }

    const categories = await categoriesResponse.json();
    const subcategories = await subcategoriesResponse.json();

    // Fetch random related products based on subcategory_id
    const relatedProductsResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=products&subcategory_id=${product.subcategory_id}`
    );
    let relatedProducts = await relatedProductsResponse.json();

    // Select only 4 random products
    relatedProducts = relatedProducts.sort(() => Math.random() - 0.5).slice(0, 4);

    return {
      props: {
        product,
        categories,
        subcategories,
        relatedProducts,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
        categories: [],
        subcategories: [],
        relatedProducts: [],
        error: error.message,
      },
    };
  }
}

export default ProductPage;
