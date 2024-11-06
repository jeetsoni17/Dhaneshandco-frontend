/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextAnchor from './TextAnchor'

export default {
  title: 'Essential-Coaching/TextAnchor',
  component: TextAnchor,
}

const Template = args => <TextAnchor {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Get Inquiry',
}
