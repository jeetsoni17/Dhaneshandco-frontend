import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from '../components/layout';
import ContentBlockContactPage from '../components/ContentBlockContactPage';
import TextHeader from '../components/TextHeader';
import TextParagraph from '../components/TextParagraph';
import ContentText from '../components/ContentText';
import TriSection from '../components/TriSection';
import SimpleIcon from '../components/SimpleIcon';
import TextAnchor from '../components/TextAnchor';
import SEO from '../components/seo';
import inputData from '../pagesInput/contact';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../components/Footer'; // Import the Footer component

const ContactPage = ({ data, className }) => {
  const { openParagraph, contactOptionsArray } = inputData;

  return (
    <Layout className={className} contact>
      <SEO
        title="Contact Details"
        description="Contact Dhanesh and company to get enquiry and product details. Email: dhanesh@essentialcoaching.co.uk"
      />

      <ContentBlockContactPage className="d-flex align-items-center py-5">
        <ContentText>
          <TextHeader mainHeader="Let's Connect..." />
          <TextParagraph paragraphs={openParagraph} />
        </ContentText>

        <TriSection noCards={3}>
          {contactOptionsArray.map((item, index) => (
            <TextAnchor href={item.href} key={index}>
              <SimpleIcon icon={item.icon} />
              <TextParagraph
                paragraphs={item.text}
                bs="text-center text-break text-highlight"
                small
              />
            </TextAnchor>
          ))}
        </TriSection>

        <ContentText>
          <TextHeader mainHeader="Frequently Asked Questions" />
          <FAQAccordion faqs={inputData.faqText} />
        </ContentText>
      </ContentBlockContactPage>

      <Footer /> {/* Add Footer here */}
    </Layout>
  );
};

const FAQAccordion = ({ faqs }) => {
  return (
    <div>
      {faqs.map((faq, index) => (
        <Accordion 
          key={index} 
          style={{ marginBottom: '1rem', backgroundColor: 'transparent', boxShadow: 'none' }} // Set background and remove shadow
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography variant="body1"> {/* Removed fontWeight to keep it normal */}
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: 'transparent' }}> {/* Ensure details background is also transparent */}
            <Typography variant="body2" color="textSecondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const StyledContactPage = styled(ContactPage)`
  a {
    text-decoration: inherit;
    color: black;
  }

  a:visited {
    text-decoration: inherit;
    color: inherit;
  }

  .content {
    padding: 20px;
    border-radius: 8px;
    /* Removed background color and shadow for seamless integration */
  }
`;

export default StyledContactPage;

ContactPage.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};
