import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from '../components/Layout';
import ContentBlockContactPage from '../components/ContentBlockContactPage';
import TextHeader from '../components/TextHeader';
import TextParagraph from '../components/TextParagraph';
import ContentText from '../components/ContentText';
import TriSection from '../components/TriSection';
import SimpleIcon from '../components/SimpleIcon';
import TextAnchor from '../components/TextAnchor';
import inputData from '../pagesInput/contact';  // Assuming this file still exists
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../components/Footer';
import Head from 'next/head';

const ContactPage = ({ className }) => {
  const { openParagraph, contactOptionsArray, faqText } = inputData;

  return (
    <Layout className={className} contact>
      <Head>
        <title>Contact Details</title>
        <meta name="description" content="Contact Dhanesh and company to get enquiry and product details." />
      </Head>

      <ContentBlockContactPage className="d-flex align-items-center py-0">
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
          <FAQAccordion faqs={faqText} />
        </ContentText>
      </ContentBlockContactPage>

      <Footer />
    </Layout>
  );
};

const FAQAccordion = ({ faqs }) => {
  return (
    <div>
      {faqs.map((faq, index) => (
        <Accordion 
          key={index} 
          style={{ marginBottom: '1rem', backgroundColor: 'transparent', boxShadow: 'none' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography variant="body1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: 'transparent' }}>
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
  }
`;

export default StyledContactPage;

ContactPage.propTypes = {
  className: PropTypes.string,
};

// Static props if needed in the future
// export async function getStaticProps() {
//   // Fetch data or provide static data if necessary
//   return {
//     props: {},
//   };
// }
