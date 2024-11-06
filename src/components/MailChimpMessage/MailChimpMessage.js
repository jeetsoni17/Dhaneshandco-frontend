import { React } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import TextParagraph from '../TextParagraph'
import inputData from '../MailChimpSignUp/MailChimpData'

const MailChimpMessage = ({ children, className, email, result, message}) => {

  const { successMessage, alreadySignedUpMessage } = inputData

if (result === 'success') {
      console.log('sucess result = ' + result)
      return (
      <div>
      <TextParagraph className={className} paragraphs={message} small />
      <TextParagraph className={[className , 'text-highlight'].join(' ')} paragraphs={successMessage} small />
      </div>
      )
} else {
  console.log('other result = ' + result)
     return (
      <div>
      <TextParagraph className={className} paragraphs={message} small />
      <TextParagraph className={[className , 'text-highlight'].join(' ')} paragraphs={`${email} ${alreadySignedUpMessage}`} small />
     </div>
     )
}
}

const StyledMailChimpMessage = styled(MailChimpMessage)`
  text-align: center;
  padding: 10px 0 10px 0;
`

export default StyledMailChimpMessage

MailChimpMessage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

MailChimpMessage.defaultProps = {
  children: '',
  className: '',
}