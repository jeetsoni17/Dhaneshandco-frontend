import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import TextAnchor from '../TextAnchor'
import TextHeader from '../TextHeader'

const Footer = ({ className }) => (
  <footer className={className}>
    <div className="container-fluid bg-secondary border-top footer">
  {/* Contact Section */}
  
{/* Footer with Company Info and Quick Links */}
<div className="row justify-content-around py-3 bg-grey text-dark pt-4 " style={{ backgroundColor: '#F5F7FA' }}>
  <div className="col-md-6 px-4">
    <h5>Dhanesh & Co in Andheri East, Mumbai</h5>
    <p style={{ fontSize: '14px' }}>
    Dhanesh and Co takes pride in being a premier authorized dealer and stockist for Larsen & Toubro Ltd., delivering excellence and reliability.
     We actively collaborate with projects right from their conceptualization stage, enabling us to design and provide energy-efficient solutions tailored to the specific needs of each project. 
     Our commitment is to support and enhance the sustainability and performance of every venture we undertake, making us a trusted partner in achieving innovative energy goals.<br />
     Dhanesh & Co is your trusted partner in Andheri East, Mumbai, for innovative and energy-efficient solutions tailored to your project's needs.
    </p>
  </div>

  <div className="col-md-3 d-flex flex-column align-items-center">
    <h5>Quick Links</h5>
    <ul className="list-unstyled text-center" style={{ fontSize: '14px' }}>
      <li className="mb-2"><a href="" className="text-dark">Home</a></li>
      <li className="mb-2"><a href="#" className="text-dark">About Us</a></li>
      <li className="mb-2"><a href="#" className="text-dark">Pricelist</a></li>
      <li className="mb-2"><a href="#" className="text-dark">Contact</a></li>
      <li className="mb-2"><a href="#" className="text-dark">Enquiry</a></li>
    </ul>
  </div>
</div>


<div className="row pt-0 justify-content-center" style={{ backgroundColor: '#F5F7FA' }}>
  <div className="col-12 text-center">
    <TextHeader mainHeader="Contact me" size="small" />
  </div>
</div>
{/* Address and Contact Details */}
<div className="row justify-content-center align-items-center py-3" style={{ backgroundColor: '#F5F7FA' }}>
  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
    <address className="mb-4 p-2" style={{ fontSize: '12px' }}>
      <strong style={{ fontSize: '14px' }}>Office Address:</strong><br />
      Unit No-2, Damji Shamji Industrial Complex,<br />
      Off Mahakali Caves Road, Behind Sanghi Oxygen,<br />
      Andheri East, Mumbai 400093
    </address>
  </div>
  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
    <TextAnchor href="mailto:dhanesh@gmail.com?subject=Dhanesh and Company Enquiry">
      <i className={['icon-envelope', 'me-2'].join(' ')} /> dhanesh_co@gmail.com
    </TextAnchor>
  </div>
  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
    <TextAnchor href="tel:022 - 99999999">
      <i className={['icon-phone', 'me-2'].join(' ')} />022 - 26873598
    </TextAnchor>
  </div>
</div>



  

  {/* Copyright Section */}
  <div className="row justify-content-center align-items-center" style={{ backgroundColor: '#207BFF' }}>
  <div className="text-dark text-center py-3">
    © Dhanesh and Company
  </div>
</div>

</div>
  </footer>
)

const StyledFooter = styled(Footer)`
  font-size: 1.25rem;
  h4 {
    font-family: 'Lato';
  }
  a {
    color: #6c757d;
  }
  link {
    color: #6c757d;
  }
`

export default StyledFooter

Footer.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
}

Footer.defaultProps = {
  className: '',
}
