/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import HeroBanner from './HeroBanner'

export default {
  title: 'Essential-Coaching/HeroBanner',
  component: HeroBanner,
}

const Template = args => <HeroBanner {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'get Enquiry',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Read more...',
}

export const Large = Template.bind({})
Large.args = {
  bs: 'btn-lg',
  label: 'Large Button',
}

export const Small = Template.bind({})
Small.args = {
  bs: 'btn-sm',
  label: 'Small Button',
}
