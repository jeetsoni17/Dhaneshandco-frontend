import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import TextHeader from '../components/TextHeader';
import SEO from '../components/seo';
import { Link } from 'gatsby';
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
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ShoppingPage = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        const productsResponse = await fetch('http://localhost:5000/api/products');
        
        if (!categoriesResponse.ok || !productsResponse.ok) {
          throw new Error('Error fetching data');
        }

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCategorySelect = (category_id) => {
    setSelectedCategory(category_id);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products?search=${searchTerm}`);
      if (!response.ok) throw new Error('Error fetching search results');

      const searchResults = await response.json();
      setProducts(searchResults);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory ? product.category_id === selectedCategory : true
  );

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout className={className}>
      <SEO title="Electrical Products" description="Browse and purchase electrical products like switches, sockets, and more." />
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
              <Link key={product.product_id} to={`/products/${product.product_id}`}>
                <ProductCard>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000/images/${product.product_image}`}
                      alt="Product"
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    </CardContent>
                  </Card>
                </ProductCard>
              </Link>
            ))}
          </ProductList>
        </ProductSection>
      </PageWrapper>
    </Layout>
  );
};

// Styled components
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
const ProductCard = styled.div`
  text-align: center;
`;

export default ShoppingPage;

ShoppingPage.propTypes = {
  className: PropTypes.string,
};
