/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import OverlayBackground from './OverlayBackground'

export default {
  title: 'Essential-Coaching/OverlayBackground',
  component: OverlayBackground,
}

const Template = args => <OverlayBackground {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
}
