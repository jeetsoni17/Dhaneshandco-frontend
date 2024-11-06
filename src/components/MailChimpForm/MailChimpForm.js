import { React } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import MailChimpFields from '../MailChimpFields'

const MailChimpForm = ({ children, className, email, message, handleInputChange, handleSubmit }) => {

  return (
    
      <form
          className={['validate', className].join(' ')} method="post" name="mc-embedded-subscribe-form" target="_blank"
          novalidate onSubmit={handleSubmit}>
            <MailChimpFields email={email} message={message} handleInputChange={handleInputChange} />
        </form>
  )
}

const StyledMailChimpForm = styled(MailChimpForm)`
  text-align: center;
  padding: 10px 0 10px 0;
`

export default StyledMailChimpForm

MailChimpForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

MailChimpForm.defaultProps = {
  children: '',
  className: '',
}