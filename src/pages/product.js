import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import TextHeader from '../components/TextHeader';
import { useRouter } from 'next/router'; // For routing
import { TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardMedia, CardContent, CircularProgress, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Products = ({ categories, products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCategorySelect = (category_id) => {
    setSelectedCategory(category_id);
    setFilteredProducts(products.filter((product) => product.category_id === category_id));
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

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <PageWrapper>
        <Sidebar>
          <SearchBar>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </SearchBar>
          <DropdownContainer>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories.map((category) => (
                  <Button
                    key={category.category_id}
                    onClick={() => handleCategorySelect(category.category_id)}
                    fullWidth
                    variant="text"
                  >
                    {category.category_name}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </DropdownContainer>
        </Sidebar>
        <ProductSection>
          <TextHeader mainHeader="Available Products" />
          <ProductList>
            {filteredProducts.map((product) => (
              <div key={product.product_id}>
                <Card onClick={() => router.push(`/products/${product.product_id}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://slategray-louse-109965.hostingersite.com/public/images/product/${product.product_image}`} // Ensure correct image path for production
                    alt="Product"
                  />
                  <CardContent>
                    <Typography variant="h6">{product.product_name}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.product_description}</Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </ProductList>
        </ProductSection>
      </PageWrapper>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const categoriesResponse = await fetch('https://slategray-louse-109965.hostingersite.com/routes/index.php?endpoint=categories');
    const productsResponse = await fetch('https://slategray-louse-109965.hostingersite.com/routes/index.php?endpoint=products');

    if (!categoriesResponse.ok || !productsResponse.ok) {
      throw new Error('Error fetching data');
    }

    const categories = await categoriesResponse.json();
    const products = await productsResponse.json();

    return {
      props: {
        categories,
        products,
      },
    };
  } catch (error) {
    return {
      props: {
        categories: [],
        products: [],
        error: error.message,
      },
    };
  }
}

const PageWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;
const Sidebar = styled.div`
  width: 25%;
  padding-right: 2rem;
  border-right: 1px solid #ccc;
`;
const SearchBar = styled.div`
  margin-bottom: 1rem;
`;
const DropdownContainer = styled.div`
  margin-bottom: 2rem;
`;
const ProductSection = styled.div`
  width: 75%;
  padding-left: 2rem;
`;
const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

Products.propTypes = {
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

export default Products;
