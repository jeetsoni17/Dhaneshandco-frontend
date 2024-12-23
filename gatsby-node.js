const path = require('path');
const fetch = require('node-fetch'); // Used for fetching product data

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  try {
    // Fetch products data from your API
    const res = await fetch('http://dhaneshnco.in/api/products'); // Ensure this is the correct API endpoint

    // Check if the response is ok
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    // Parse the products JSON
    const products = await res.json();
    
    // Check if products are returned and log them for verification
    if (products && products.length > 0) {
      console.log('Products fetched:', products); // Logs the fetched product data
    } else {
      console.error('No products found or data is empty.');
    }

    // Create a page for each product
    products.forEach(product => {
      createPage({
        path: `/products/${product.product_id}/`, // Use product_id in the URL path
        component: path.resolve(`src/templates/product-template.js`), // Ensure the correct path to the template
        context: {
          product_id: product.product_id, // Passing the product_id to the context for dynamic routing
        },
      });
    });

  } catch (error) {
    // Error handling: logs any issues with fetching or page creation
    console.error('Error creating product pages:', error);
  }
};




// const path = require('path');
// const fetch = require('node-fetch');

// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions;

//   try {
//     // Fetch products data from your API
//     const res = await fetch('http://dhaneshnco.in/api/products'); // Adjust this URL as necessary

//     // Check if the response is ok
//     if (!res.ok) {
//       throw new Error(`Failed to fetch products: ${res.statusText}`);
//     }

//     const products = await res.json();
//     console.log(products); // Log the fetched products to check structure

//     // Create a page for each product
//     products.forEach(product => {
//       createPage({
//         path: `/products/${product.product_id}/`, // Ensure the path is correctly formed
//         component: path.resolve(`src/templates/product-template.js`),
//         context: {
//           product_id: product.product_id,
//         },
//       });
//     });
//   } catch (error) {
//     console.error('Error creating product pages:', error);
//   }
// };
