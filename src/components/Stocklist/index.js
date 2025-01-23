import React from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import stockImage1 from '../../images/brands/esbee.jpg';
import stockImage2 from '../../images/brands/salzer.jpg';
import stockImage3 from '../../images/brands/l&t.jpg';
import stockImage4 from '../../images/brands/gic.jpg';
import stockImage5 from '../../images/brands/l&t.jpg';
import stockImage6 from '../../images/brands/esbee.jpg';
import TextHeader from '../TextHeader';

const Stocklist = () => {
  return (
    <div>
      <TextHeader mainHeader="Authorized Stocklist" />
      <div
        className="grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridRowGap: '60px',
          gridColumnGap: '80px',
          marginTop: '20px',
        }}
      >
        {/* Replace Fade component with motion.div */}
        <motion.div
          className="grid-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <img src={stockImage1.src} alt="Stock Image 1" style={{ width: '100%', height: 'auto' }} />
        </motion.div>
        
        <motion.div
          className="grid-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Added delay for stagger effect
        >
          
            <img src={stockImage2.src} alt="Stock Image 2" style={{ width: '100%', height: 'auto' }} />
        </motion.div>

        <motion.div
          className="grid-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }} // Added delay for stagger effect
        >
            <img src={stockImage3.src} alt="Stock Image 3" style={{ width: '100%', height: 'auto' }} />
        </motion.div>

        {/* You can follow the same pattern for the rest of the images if needed */}
        {/* 
        <motion.div
          className="grid-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="https://link4.com" target="_blank" rel="noopener noreferrer">
            <img src={stockImage4} alt="Stock Image 4" style={{ width: '100%', height: 'auto' }} />
          </a>
        </motion.div>
        */}
        {/* Repeat for other images */}
      </div>
    </div>
  );
};

export default Stocklist;
