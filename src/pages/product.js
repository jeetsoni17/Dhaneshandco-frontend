import React, { useState, useEffect, useCallback, use } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import TextHeader from "../components/TextHeader";
import { useRouter } from "next/router";
import { CONFIG } from "../../config";
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

function Products() {
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(21);

  const [Products, setProducts] = useState(null);
  const [Categories, setCategories] = useState(null);
  const [SubCategories, setSubCategories] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, [router]);

  const fetchProducts = async () => {
    const productResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=products`
    );

    if (!productResponse.ok) {
      console.log('Product not found');
    }

    const response = await productResponse.json();
    setProducts(response);
    setFilteredProducts(response);
  }

  const fetchCategory = async () => {
    const categoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=categories`
    );
    const subcategoriesResponse = await fetch(
      `${CONFIG.BASE_API_URL}/routes/index.php?endpoint=subcategories`
    );

    if (!categoriesResponse.ok || !subcategoriesResponse.ok) {
      throw new Error('Error fetching data');
    }

    const category = await categoriesResponse.json();
    const sub_category = await subcategoriesResponse.json();

    setCategories(category);
    setSubCategories(sub_category);
  }

  const getCategoryName = (categoryId) => {
    const category = Categories.find((cat) => cat.category_id == categoryId);
    return category ? category.category_name : "";
  };

  const getSubcategoryName = (subcategoryId) => {
    const subcategory = SubCategories.find(
      (sub) => sub.subcategory_id == subcategoryId
    );
    return subcategory ? subcategory.subcategory_name : "";
  };

  const handleCategorySelect = (category_id) => {
    setSelectedCategory(category_id);
    setFilteredProducts(
      Products.filter((product) => product.category_id == category_id)
    );
    setSelectedSubcategory(null);
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (subcategory_id) => {
    const updatedProducts = Products.filter(
      (product) => product.subcategory_id === subcategory_id
    );
    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  };

  const currentProducts = filteredProducts?.slice(
    0,
    currentPage * productsPerPage
  );

  return (
    <Layout>
      <Box maxWidth="1200px" mx="auto" py={3}>
        <TextHeader mainHeader="Available Products" />
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={3}
          pt={3}
        >
          {SubCategories &&  (<Sidebar>
            
            <Accordion>
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
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {category.category_name}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>

            {(selectedCategory &&  (SubCategories.filter((sub) => sub.category_id == selectedCategory)).length > 0) ? (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Subcategories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {SubCategories.filter((sub) => sub.category_id == selectedCategory).map((subcategory) => (
                    <Button
                      key={subcategory.subcategory_id}
                      onClick={() =>
                        handleSubcategorySelect(subcategory.subcategory_id)
                      }
                      fullWidth
                      sx={{ justifyContent: "flex-start", textTransform: "none", textAlign: "left"}}
                    >
                      {subcategory.subcategory_name}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
                
            ) : (<></>)}
          </Sidebar>
        )}

          {filteredProducts?.length > 0 ? (
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
                    <div style={{ height: "70%", alignContent: "center" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={`${CONFIG.BASE_API_URL}/public/images/product/${product.product_image}`}
                        alt="Product"
                        loading="lazy"
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
                      
                      { Categories && <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        {getCategoryName(product.category_id)}
                      </Typography> }

                      {SubCategories && <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        {getSubcategoryName(product.subcategory_id)}
                      </Typography>}

                    </CardContent>
                  </Card>
                ))}
              </Box>

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
          ) : (
            <ProductSection>No Available Products :(</ProductSection>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

const Sidebar = styled(Box)`
  flex: 1;
  padding-right: 1rem;
  border-right: 1px solid #ddd;

  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 20px;
  }
`;

const ProductSection = styled(Box)`
  flex: 3;
`;

export default Products;
