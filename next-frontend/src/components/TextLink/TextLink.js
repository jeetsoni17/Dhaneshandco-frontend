import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Link from "next/link"; // Use Next.js Link component

const TextLink = ({ className, to, text, small }) => (
  <Link
    href={`/${to}`}
    passHref
    className={[className, "text-highlight"].join(" ")}
  >
    {text}
  </Link>
);

const StyledTextLink = styled(TextLink)`
  font-size: ${(props) => (props.small ? "1rem" : "1.25rem")};
  text-decoration: none;
  color: white !important; /* Ensures text remains white */
`;

export default StyledTextLink;

TextLink.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Target route
   */
  to: PropTypes.string,
  /**
   * Link text
   */
  text: PropTypes.string,
  /**
   * Make text small
   */
  small: PropTypes.bool,
};

TextLink.defaultProps = {};
