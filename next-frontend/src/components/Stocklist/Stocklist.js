import React from 'react';
import Fade from 'react-reveal/Fade';
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
        <Fade bottom>
          <div className="grid-item">
            <a href="https://link1.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage1} alt="Stock Image 1" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade>
        <Fade bottom>
          <div className="grid-item">
            <a href="https://link2.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage2} alt="Stock Image 2" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade>
        <Fade bottom>
          <div className="grid-item">
            <a href="https://link3.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage3} alt="Stock Image 3" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade>
        {/* <Fade bottom>
          <div className="grid-item">
            <a href="https://link4.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage4} alt="Stock Image 4" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade> */}
        {/* <Fade bottom>
          <div className="grid-item">
            <a href="https://link5.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage5} alt="Stock Image 5" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade> */}
        {/* <Fade bottom>
          <div className="grid-item">
            <a href="https://link6.com" target="_blank" rel="noopener noreferrer">
              <img src={stockImage6} alt="Stock Image 6" style={{ width: '100%', height: 'auto' }} />
            </a>
          </div>
        </Fade> */}
      </div>
    </div>
  );
};

export default Stocklist;
