import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import TextHeader from '../components/TextHeader';
import emailjs from '@emailjs/browser';
import Button from '../components/Button/Button';
import Head from 'next/head'; // Import Next.js Head component

const ContactPage = ({ className }) => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    emailjs.init('ZZ6ICXjrCVsBkL7FE');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_6kyxjo4', 'template_sbso5nh', form.current, 'ZZ6ICXjrCVsBkL7FE')
      .then(() => {
        setSuccessMessage('Your enquiry has been sent successfully!');
        setErrorMessage('');
        e.target.reset();
      })
      .catch(() => {
        setErrorMessage('Failed to send your enquiry. Please try again later.');
        setSuccessMessage('');
      });
  };

  return (
    <Layout className={className}>
      <Head>
        <title>Enquiry</title>
        <meta name="description" content="Submit your enquiry for electrical goods at Dhanesh & Co." />
      </Head>
      <FormWrapper className="py-4">
        <TextHeader mainHeader="Submit Your Enquiry" className="pb-4"/>
        {successMessage && <Message success>{successMessage}</Message>}
        {errorMessage && <Message error>{errorMessage}</Message>}

        <form ref={form} onSubmit={handleSubmit}>
          <ColumnsWrapper>
            {/* Company Name */}
            <FormField>
              <label htmlFor="companyName">Company Name</label>
              <Input type="text" id="companyName" name="company_name" required tabIndex="1" />
            </FormField>

            {/* Your Name */}
            <FormField>
              <label htmlFor="name">Your Name</label>
              <Input type="text" id="name" name="user_name" required tabIndex="2" />
            </FormField>

            {/* Email */}
            <FormField>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" name="user_email" required tabIndex="3" />
            </FormField>

            {/* Phone Number */}
            <FormField>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input type="number" id="phoneNumber" name="phone_number" required tabIndex="4" />
            </FormField>

            {/* Address */}
            <FormField>
              <label htmlFor="address">Address</label>
              <Textarea id="address" name="address" rows="2" required tabIndex="5" />
            </FormField>

            {/* Enquiry */}
            <FormField>
              <label htmlFor="enquiry">Enquiry</label>
              <Textarea id="enquiry" name="message" rows="2" required tabIndex="6" />
            </FormField>
          </ColumnsWrapper>

          <ButtonWrapper>
            <Button type="submit" tabIndex="7">Submit</Button>
          </ButtonWrapper>
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
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Switches to vertical stack on smaller screens */
  }
`;

const FormField = styled.div`
  flex: 1 1 calc(50% - 1rem); /* Default: two-column layout */
  min-width: 280px;

  @media (max-width: 768px) {
    flex: 1 1 100%; /* Full width for each field on smaller screens */
  }

  label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-bottom-color: #007bff;
    }
  }

  textarea {
    resize: vertical;
  }
`;

const Input = styled.input``;

const Textarea = styled.textarea``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
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
