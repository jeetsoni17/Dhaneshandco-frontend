import React, { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import TextHeader from "../components/TextHeader";
import { useRouter } from "next/router";
import { CONFIG } from "../../config";
import { useGlobalContext } from "../context/GlobalContext";

import {
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";

function Products({products, categories, subcategories}) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // Limit products per page

  const router = useRouter();

  const {
    Products,
    setProducts,
    Categories,
    setCategories,
    SubCategories,
    setSubCategories,
  } = useGlobalContext();

  useEffect(() => {
    setProducts(products);
    setFilteredProducts(products);
    setCategories(categories);
    setSubCategories(subcategories);
  });

  // Memoizing category and subcategory names to avoid recalculating on every render
  const getCategoryName = useCallback(
    (categoryId) => {
      const category = Categories.find((cat) => cat.category_id === categoryId);
      return category ? category.category_name : "Unknown Category";
    },
    [Categories]
  );

  const getSubcategoryName = useCallback(
    (subcategoryId) => {
      const subcategory = SubCategories.find(
        (sub) => sub.subcategory_id === subcategoryId
      );
      return subcategory ? subcategory.subcategory_name : "Unknown Subcategory";
    },
    [SubCategories]
  );

  const handleCategorySelect = useCallback(
    (category_id) => {
      setSelectedCategory(category_id);
      setFilteredProducts(
        Products.filter((product) => product.category_id === category_id)
      );
      setSelectedSubcategory(null);
      setCurrentPage(1); // Reset to page 1
    },
    [Products]
  );

  const handleSubcategorySelect = useCallback(
    (subcategory_id) => {
      setSelectedSubcategory(subcategory_id);
      setFilteredProducts(
        Products.filter(
          (product) =>
            product.subcategory_id === subcategory_id &&
            product.category_id === selectedCategory
        )
      );
      setCurrentPage(1); // Reset to page 1
    },
    [Products, selectedCategory]
  );

  // Pagination logic
  const currentProducts = filteredProducts.slice(
    0,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Layout>
      {Products && (
        <Box maxWidth="1200px" mx="auto" py={3}>
          <TextHeader mainHeader="Available Products" />

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={3}
            pt={3}
          >
            {/* Sidebar */}
            <Sidebar>
              <Accordion expanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Categories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Categories.map((category) => (
                    <Button
                      key={category.category_id}
                      onClick={() => handleCategorySelect(category.category_id)}
                      fullWidth
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
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
                    {SubCategories.filter(
                      (sub) => sub.category_id === selectedCategory
                    ).map((subcategory) => (
                      <Button
                        key={subcategory.subcategory_id}
                        onClick={() =>
                          handleSubcategorySelect(subcategory.subcategory_id)
                        }
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
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
                gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={3}
              >
                {currentProducts.map((product) => (
                  <Card
                    key={product.product_id}
                    onClick={() =>
                      router.push(`./products/${product.product_id}`)
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <div style={{height: "70%", alignContent: "center"}}> 
                    <CardMedia
                      component="img"
                      height="180"
                      image={`${CONFIG.BASE_API_URL}/public/images/product/${product.product_image}`}
                      alt="Product"
                      loading="lazy" // Lazy load images
                      sx={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        width: "46%",
                        height: "auto",
                        margin: "10px auto",

                      }}
                    />
                    </div>
                    <CardContent
                      sx={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          marginBottom: "4px",
                        }}
                      >
                        {product.product_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        {getCategoryName(product.category_id)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        {getSubcategoryName(product.subcategory_id)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Load More Button */}
              {currentProducts.length < filteredProducts.length && (
                <Box display="flex" justifyContent="center" pt={2}>
                  <Button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    variant="contained"
                  >
                    Load More
                  </Button>
                </Box>
              )}
            </ProductSection>
          </Box>
        </Box>
      )}
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

  @media (max-width: 768px) {
    order: -1; /* Move to the top */
    margin-bottom: 20px;
  }
`;

const ProductSection = styled(Box)`
  flex: 3;
`;

export default Products;
