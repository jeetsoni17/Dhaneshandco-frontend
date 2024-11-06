/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import HeroBackground from './HeroBackground'

export default {
  title: 'Essential-Coaching/HeroBackground',
  component: HeroBackground,
}

const Template = args => <HeroBackground {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
