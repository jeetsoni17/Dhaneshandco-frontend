const path = require('path');
const fetch = require('node-fetch');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  try {
    // Fetch products data from your API
    const res = await fetch('http://localhost:5000/api/products'); // Adjust this URL as necessary

    // Check if the response is ok
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const products = await res.json();
    console.log(products); // Log the fetched products to check structure

    // Create a page for each product
    products.forEach(product => {
      createPage({
        path: `/products/${product.product_id}/`, // Ensure the path is correctly formed
        component: path.resolve(`src/templates/product-template.js`),
        context: {
          product_id: product.product_id,
        },
      });
    });
  } catch (error) {
    console.error('Error creating product pages:', error);
  }
};
