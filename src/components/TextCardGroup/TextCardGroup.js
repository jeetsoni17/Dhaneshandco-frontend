import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import TextCard from '../TextCard'
import TextList from '../TextList'

const TextCardGroup = ({ className, cards, children }) => (
  <div className="row flex-wrap justify-content-center">
    {cards.map((card, index) =>
      index === 2 ? (
        <div className="w-100" />
      ) : (
        <div className="col-sm-6">
          <TextCard cardHeader={card.title}>
            <TextList listArray={card.items} small />
          </TextCard>
        </div>
      )
    )}
  </div>
)

const StyledTextCardGroup = styled(TextCardGroup)``

export default StyledTextCardGroup

TextCardGroup.propTypes = {
  /**
   * Emotion classname
   */
  className: PropTypes.string,
  /**
   * Additional elements to add
   */
  cards: PropTypes.array,
  /**
   * Additional elements to add
   */
  children: PropTypes.object,
}

TextCardGroup.defaultProps = {
  className: '',
}
