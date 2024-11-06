/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextQuote from './TextQuote'

export default {
  title: 'Essential-Coaching/TextQuote',
  component: TextQuote,
}

const Template = args => <TextQuote {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
