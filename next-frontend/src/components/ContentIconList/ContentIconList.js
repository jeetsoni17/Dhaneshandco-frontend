import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentIconList = ({
  className,
  children,
  childrenImage,
  childrenText,
  xtraWide,
}) => {
  const imageColumns = xtraWide ? '' : 'col-lg-2'
  const textColumns = xtraWide ? '' : 'col-lg-6'

  return (
    <div className="row justify-content-center align-items-center mb-3">
      <div
        className={[
          'col-3 d-flex justify-content-center align-items-center',
          imageColumns,
        ].join(' ')}
      >
        {childrenImage}
      </div>
      <div
        className={[
          'col-9 d-flex flex-column align-items-start',
          textColumns,
        ].join(' ')}
      >
        {childrenText}
      </div>
    </div>
  )
}

const StyledContentIconList = styled(ContentIconList)``

export default StyledContentIconList

ContentIconList.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
  /**
   * Additional elements to add
   */
  childrenImage: PropTypes.object,
  /**
   * Additional elements to add
   */
  childrenText: PropTypes.object,
  /**
   * Additional elements to add
   */
  xtraWide: PropTypes.bool,
}

ContentIconList.defaultProps = {
  className: '',
}
