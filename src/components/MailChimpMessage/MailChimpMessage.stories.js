/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import MailChimpSignUp from './MailChimpSignUp'

export default {
  title: 'Essential-Coaching/MailChimpSignUp',
  component: MailChimpSignUp,
}

const Template = args => <MailChimpSignUp {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}