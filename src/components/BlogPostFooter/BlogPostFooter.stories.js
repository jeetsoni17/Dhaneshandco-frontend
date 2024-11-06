/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import BlogPostFooter from './BlogPostFooter'

export default {
  title: 'Essential-Coaching/BlogPostFooter',
  component: BlogPostFooter,
}

const Template = args => <BlogPostFooter {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Book a free discovery call',
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
