import { React } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const MailChimpHiddenFields = ({ children, className }) => {

  return (
    
              <div className={className} aria-hidden="true"><input type="text"
                name="b_3065fd3ec7c12f77f82258743_541829f297" tabindex="-1" value="" />
              </div>
  
  )
}

const StyledMailChimpHiddenFields = styled(MailChimpHiddenFields)`
  position: absolute; 
  left: -5000px
`

export default StyledMailChimpHiddenFields

MailChimpHiddenFields.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

MailChimpHiddenFields.defaultProps = {
  children: '',
  className: '',
}