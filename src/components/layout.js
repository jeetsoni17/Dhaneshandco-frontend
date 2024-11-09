/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'


// Add Fonts

import '@fontsource/lato/400.css'
import '@fontsource/merriweather/300.css'
import 'simple-line-icons/css/simple-line-icons.css'

const Layout = ({ children, contact, className }) => {
  if (!contact) {
    return (
      <>
        <Global
          styles={css`
            main {
              /* color: #6c757d; */
            }
          `}
        />
        <NavBar />
        <main className={className}>{children}</main>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Global
        styles={css`
          @media (max-width: 768px) {
            main {
              margin-top: 70px;
            }
          }
        `}
      />
      <NavBar />
      <main>{children}</main>
    </>
  )
}

const StyledLayout = styled(Layout)`
  margin-top: 80px;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  contact: PropTypes.bool,
  className: PropTypes.string,
}

export default StyledLayout
