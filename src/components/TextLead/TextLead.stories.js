/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextLead from './TextLead'

export default {
  title: 'Essential-Coaching/TextLead',
  component: TextLead,
}

const Template = args => <TextLead {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
