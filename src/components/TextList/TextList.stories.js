/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextList from './TextList'

export default {
  title: 'Essential-Coaching/TextList',
  component: TextList,
}

const Template = args => <TextList {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
