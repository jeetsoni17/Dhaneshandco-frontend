/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextHeader from './TextHeader'

export default {
  title: 'Essential-Coaching/TextHeader',
  component: TextHeader,
}

const Template = args => <TextHeader {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
