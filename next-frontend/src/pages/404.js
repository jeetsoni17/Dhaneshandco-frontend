import React from "react";
import { Link } from "gatsby";

const NotFoundPage = () => (
  <div>
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

export default NotFoundPage;
