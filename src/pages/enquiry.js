import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import TextHeader from '../components/TextHeader';
import SEO from '../components/seo';
import emailjs from '@emailjs/browser';
import Button from '../components/Button/Button';

const ContactPage = ({ className }) => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    emailjs.init('ZZ6ICXjrCVsBkL7FE');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_6kyxjo4', 'template_sbso5nh', form.current, 'ZZ6ICXjrCVsBkL7FE')
      .then((response) => {
        setSuccessMessage('Your enquiry has been sent successfully!');
        setErrorMessage('');
        e.target.reset();
      })
      .catch((err) => {
        setErrorMessage('Failed to send your enquiry. Please try again later.');
        setSuccessMessage('');
      });
  };

  return (
    <Layout className={className}>
      <SEO title="Enquiry" description="Submit your enquiry for electrical goods at Dhanesh & Co." />
      <FormWrapper>
        <TextHeader mainHeader="Submit Your Enquiry" />
        {successMessage && <Message success>{successMessage}</Message>}
        {errorMessage && <Message error>{errorMessage}</Message>}
        
        <form ref={form} onSubmit={handleSubmit}>
          <ColumnsWrapper>
            <Column>
              <FormField>
                <label htmlFor="companyName">Company Name</label>
                <Input type="text" id="companyName" name="company_name" required />
              </FormField>
              
              <FormField>
                <label htmlFor="email">Email</label>
                <Input type="email" id="email" name="user_email" required />
              </FormField>
              
              <FormField>
                <label htmlFor="address">Address</label>
                <Textarea id="address" name="address" rows="2" required />
              </FormField>
            </Column>
            
            <Column>
              <FormField>
                <label htmlFor="name">Your Name</label>
                <Input type="text" id="name" name="user_name" required />
              </FormField>

              <FormField>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input type="number" id="phoneNumber" name="phone_number" required />
              </FormField>
              
              <FormField>
                <label htmlFor="enquiry">Enquiry</label>
                <Textarea id="enquiry" name="message" rows="2" required />
              </FormField>
            </Column>
          </ColumnsWrapper>

          {/* Use the Button component here */}
          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </Layout>
  );
};

// Styled Components
const FormWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
  background: none;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-bottom-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
  background: none;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-bottom-color: #007bff;
  }

  resize: vertical;
`;

const Message = styled.div`
  text-align: center;
  color: ${(props) => (props.success ? 'green' : 'red')};
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default ContactPage;

ContactPage.propTypes = {
  className: PropTypes.string,
};
