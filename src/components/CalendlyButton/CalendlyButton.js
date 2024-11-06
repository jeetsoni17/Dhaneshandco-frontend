import { openPopupWidget } from 'react-calendly';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'; // Import PropTypes
import inputData from '../../pagesInput/calendly';

const { url } = inputData; // Assuming this imports the URL correctly.
const path = url;

const CalendlyButton = ({ prefill, pageSettings, utm, className }) => {
  const onClick = () =>
    openPopupWidget({
      url: path,
      prefill,
      pageSettings,
      utm,
    });

  // Remove the button rendering
  return null; // Silently remove the button
};

// Keep the styled component as it is
const StyledCalendlyButton = styled(CalendlyButton)`
  font-size: ${props => (props.small ? '1rem' : '1.25rem')};
`;

export default StyledCalendlyButton;

// Define PropTypes for type checking
CalendlyButton.propTypes = {
  prefill: PropTypes.object, // Define types as needed
  pageSettings: PropTypes.object,
  utm: PropTypes.object,
  className: PropTypes.string,
};

CalendlyButton.defaultProps = {
  prefill: {},
  pageSettings: {},
  utm: {},
  className: '',
};
