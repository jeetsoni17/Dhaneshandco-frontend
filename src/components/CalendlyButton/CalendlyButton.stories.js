/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import CalendlyButton from './CalendlyButton'

export default {
  title: 'Enquiry',
  component: CalendlyButton,
}

const Template = args => <CalendlyButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Enquiry',
}
