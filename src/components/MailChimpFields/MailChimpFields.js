import { React } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import MailChimpHiddenFields from '../MailChimpHiddenFields'

const MailChimpForm = ({ className, email, message, handleInputChange }) => (
  <div className={className}>
    <label id="mailchimp_op_message" htmlFor="mce-EMAIL">
      {message}
    </label>
    <input
      type="email"
      name="EMAIL"
      className="email"
      id="mce-EMAIL"
      placeholder="Enter email address"
      value={email}
      onChange={handleInputChange}
      required
    />
    {/* <!--This input is to prevent bot attacks--> */}
    <MailChimpHiddenFields />
    <div className="clear">
      <input
        type="submit"
        value="Subscribe"
        name="subscribe"
        id="mc-embedded-subscribe"
        className="button"
      />
    </div>
  </div>
)

const StyledMailChimpForm = styled(MailChimpForm)`
  display: inline-block;

  input.email {
    font-size: 15px;
    border: 1px solid #abb0b2;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #343434;
    background-color: #fff;
    height: 32px;
    display: inline-block;
    margin: 0 10px 0 0;
    width: 350px;
    vertical-align: top;
  }

  label {
    display: block;
    padding-bottom: 10px;
  }

  .clear {
    display: inline-block;
  }

  .button {
    font-size: 13px;
    border: none;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;

    color: #fff;
    background-color: #aaa;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    padding: 0 18px;
    display: inline-block;
    margin: 0;
    transition: all 0.23s ease-in-out 0s;
  }

  .button:hover {
    background-color: #777;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    input.email {
      width: 100%;
      margin: 0.5rem 0;
      text-align: center;
    }

    .clear {
      display: block;
      width: 100%;
    }

    .button {
      width: 50%;
      margin: 0.5rem 0;
    }
  }
`

export default StyledMailChimpForm

MailChimpForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  message: PropTypes.string,
  handleInputChange: PropTypes.func,
}

MailChimpForm.defaultProps = {
  className: '',
}
