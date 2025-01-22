import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Link from "next/link"; // Use Next.js Link component
import Image from "next/image"; // Use Next.js Image component for optimized images
import logo from "../../images/logo/trans-logo.png"; // Path to the image file

const NavBar = ({ className }) => (
  <header className={className}>
    <nav className="navbar navbar-expand-md fixed-top navbar-light bg-white">
      <div className="container-fluid">
        <Link
          href="/"
          passHref
          className="navbar-brand d-flex align-items-center"
        >
          <Image
            src={logo}
            alt="Logo"
            height={30}
            className="me-2"
          />{" "}
          Dhanesh & Co
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mx-auto">
            {" "}
            {/* Center the nav items */}
            <li className="nav-item">
              <Link href="/" passHref className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about-us" passHref className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/pricelist" passHref className="nav-link">
                Price List
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/product" passHref className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact-us" passHref className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <Link href="/enquiry" passHref className="nav-link enquiry">
            Enquiry
          </Link>{" "}
          {/* Enquiry button positioned outside the ul for right corner */}
        </div>
      </div>
    </nav>
  </header>
);

const StyledNavBar = styled(NavBar)`
  .navbar {
    transition: background-color 0.3s ease;
    &.navbar-light {
      background-color: rgba(255, 255, 255, 0.95);
    }
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  .nav-link {
    font-weight: 500;
    color: #333;
    padding: 15px 25px; /* Increased padding for more space */
    transition: color 0.3s ease, transform 0.3s ease;
    margin: 0 15px; /* Add space between links */

    &:hover {
      color: #207bff !important; /* Change to your desired hover color */
      transform: translateY(-3px); /* Slight lift effect on hover */
    }
  }

  .enquiry {
    background: #207bff; /* Background color for the button */
    color: white; /* Text color */
    padding: 10px 20px; /* Padding for button */
    border-radius: 35px; /* Rounded corners */
    transition: background-color 0.3s ease;
    margin-left: centre; /* Push the button to the right corner */
    text-decoration: none; /* Remove underline from the link */

    &:hover {
      background: #4ea5ff; /* Darker shade on hover */
      color: white; /* Ensure text color remains white on hover */
    }
  }

  ul {
    margin: 0; /* Reset margins */
    display: flex; /* Use flexbox for centering */
  }

  @media (max-width: 768px) {
    li {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 780px) {
    li {
      font-size: 1.15rem;
    }
  }

  @media (min-width: 780px) {
    li {
      font-size: 1.25rem;
    }
  }
`;

export default StyledNavBar;
