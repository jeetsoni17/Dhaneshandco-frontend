/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import TextLink from './TextLink'

export default {
  title: 'Essential-Coaching/TextLink',
  component: TextLink,
}

const Template = args => <TextLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
