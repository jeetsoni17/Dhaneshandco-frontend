import { React, useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import addToMailchimp from 'gatsby-plugin-mailchimp'

import ContentBlock from '../ContentBlock'
import ContentText from '../ContentText'
import TextHeader from '../TextHeader'
import MailChimpForm from '../MailChimpForm'
import MailChimpMessage from '../MailChimpMessage'

import inputData from './MailChimpData'

const MailChimpSignUp = ({ children, className }) => {
  const [email, setEmail] = useState()
  const [result, setResult] = useState()

  const {
    inputTitle,
    inputMessage,
    successMessage,
    alreadySignedUpMessage,
  } = inputData

  const handleInputChange = event => {
    const { target } = event
    const { value } = target
    setEmail(value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await addToMailchimp(email)
    setResult(response.result)
  }

  const renderForm = () => {
    if (!result) {
      return (
        <MailChimpForm
          email={email}
          message={inputMessage}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )
    }
    return (
      <MailChimpMessage email={email} message={inputMessage} result={result} />
    )
  }

  return (
    <div>
      <TextHeader mainHeader={inputTitle} size="v-small" />
      <ContentText>{renderForm()}</ContentText>
    </div>
  )
}

const StyledMailChimp = styled(MailChimpSignUp)``

export default StyledMailChimp

MailChimpSignUp.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

MailChimpSignUp.defaultProps = {
  children: '',
  className: '',
}
