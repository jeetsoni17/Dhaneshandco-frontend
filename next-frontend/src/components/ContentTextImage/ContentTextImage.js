import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContentTextImage = ({
  className,
  image,
  children,
  imageSide,
  xtraWide,
}) => {
  const columns = xtraWide ? 12 : 10;
  

  const textOrder =
    imageSide === 'left'
      ? `col-lg-${columns / 2} order-2 order-lg-2`
      : `col-lg-${columns / 2} order-2 order-lg-1`
  const imgOrder =
    imageSide === 'left'
      ? `col-lg-${columns / 2} order-1 order-lg-1`
      : `col-lg-${columns / 2} order-1 order-lg-2`

      console.log(image);
  return (
    <div className={[className, 'row justify-content-center'].join(' ')}>
      <div
        className={[
          'col-12 d-flex flex-column justify-content-center',
          textOrder,
        ].join(' ')}
      >
        {children}
      </div>
      <div
        className={[
          `col-10 d-lg-flex align-items-center mb-3 mb-lg-0 `,
          imgOrder,
        ].join(' ')}
      >
        <img className="rounded-circle w-100 mx-auto" src={image} alt="" ></img>
      </div>
    </div>
  )
}

const StyledContentTextImage = styled(ContentTextImage)``

export default StyledContentTextImage

ContentTextImage.propTypes = {
  /**
   * Header Content
   */
  image: PropTypes.object,
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
  imageSide: PropTypes.oneOf('left', 'right', ''),
  /**
   * Additional elements to add
   */
  xtraWide: PropTypes.bool,
}

ContentTextImage.defaultProps = {
  image: {},
  className: '',
}
