import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const MainButton = ({ primary, className, label, href, bs, small }) => {
  const router = useRouter(); // Next.js router for navigation
  const mode = primary
    ? "btn btn-outline-highlight mainbutton mx-auto d-block"
    : "btn btn-outline-gray mx-auto d-block";

  return (
    <button
      type="button"
      className={[mode, className, bs].join(" ")}
      onClick={() => {
        router.push(href); // Navigate using Next.js's router
      }}
    >
      {label}
    </button>
  );
};

const StyledMainButton = styled(MainButton)`
  font-size: ${(props) => (props.small ? "1rem" : "1.25rem")};
`;

export default StyledMainButton;

MainButton.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * href target
   */
  href: PropTypes.string.isRequired,
  /**
   * additional bootstrap classes
   */
  bs: PropTypes.string,
  /**
   * Is the button small?
   */
  small: PropTypes.bool,
  /**
   * additional CSS classes
   */
  className: PropTypes.string,
};

MainButton.defaultProps = {
  primary: false,
  bs: "",
  small: false,
  className: "",
};
