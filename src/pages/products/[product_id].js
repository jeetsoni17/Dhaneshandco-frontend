import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { CircularProgress, Typography, Grid, Button, Container, Box } from '@mui/material';
import Head from 'next/head';
import ShareIcon from '@mui/icons-material/Share';
import { CONFIG } from '../../../config';

const ProductPage = ({ product, error }) => {
  const router = useRouter();

  // Show error message if there's an error
  if (error) return <div>Error: {error}</div>;

  // Show a loading spinner if the product is not loaded yet
  if (!product) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{product.product_name}</title>
        <meta name="description" content={product.product_name} />
      </Head>

      <Container sx={{ mt: 4, maxWidth: '1200px' }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Product Image */}
          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                border: '2px solid #f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden',
                textAlign: 'center',
                padding: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={`${CONFIG.BASE_API_URL}/public/images/product/${product.product_image}`}
                alt={product.product_name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </Box>
          </Grid>

          {/* Product Name and Categories */}
          <Grid item xs={12} sm={7}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
                {product.product_name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontStyle: 'italic', marginBottom: 2, fontSize: '1rem' }}
              >
                {`${product.category_name}, ${product.subcategory_name}, ${product.sub_subcategory_name}`}
              </Typography>
            </Box>
          </Grid>

          {/* Product Description */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: 3,
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
                marginTop: 3,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                About This Product
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1rem' }}>
                {product.product_description}
              </Typography>
            </Box>
          </Grid>

          {/* Share Button */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
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
                padding: '10px 30px',
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '50px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Share This Product
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { product_id } = params;

  try {
    // Fetch product details from the API
    const response = await fetch(`${CONFIG.BASE_API_URL}/routes/index.php?endpoint=products&id=${product_id}`);

    if (!response.ok) throw new Error('Product not found');

    // Get the product details from the response
    const product = await response.json();

    // Return the product details as props
    return { props: { product } };
  } catch (error) {
    // Return the error message if something goes wrong
    return { props: { error: error.message } };
  }
}

export default ProductPage;
