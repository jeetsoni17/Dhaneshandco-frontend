/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextParagraph from './TextParagraph'

export default {
  title: 'Essential-Coaching/TextParagraph',
  component: TextParagraph,
}

const Template = args => <TextParagraph {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Get Inquiry',
}
