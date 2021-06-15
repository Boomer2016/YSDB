/* eslint-disable import/prefer-default-export */
import React, { useEffect, useCallback, useState } from 'react'

const defaultCardItems = [
  (
    <div key="key1">
      <h2>First Item</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  ),
  (
    <div key="key2">
      <h2>Second Item</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  ),
  (
    <div key="key3">
      <h2>Third Item</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  ),
]


const setCardStatus = (indexes, cardIndex) => {
  // console.log(indexes, cardIndex);
  if (indexes.currentIndex === cardIndex) {
    return 'active'
  } if (indexes.nextIndex === cardIndex) {
    return 'next'
  } if (indexes.previousIndex === cardIndex) {
    return 'prev'
  }
  return 'inactive'
}

const StackedCarousel = ({ style, onCardChange, containerClassName, cardClassName, leftButton, rightButton, autoRotate = true, rotationInterval = 2000, children }) => {
  const cardItems = children || defaultCardItems
  const [indexes, setIndexes] = useState({
    previousIndex: cardItems.length - 1,
    currentIndex: 0,
    nextIndex: 1,
  })

  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      })
    } else {
      setIndexes(prevState => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2,
      }))
    }
  }, [indexes.currentIndex])

  const handleLeftButton = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex <= 0) {
      setIndexes({
        previousIndex: cardItems.length - 2,
        currentIndex: cardItems.length - 1,
        nextIndex: 0,
      })
    } else {
      setIndexes(prevState => ({
        nextIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex - 1,
        previousIndex:
          prevState.currentIndex - 1 <= 0
            ? cardItems.length - 1
            : prevState.currentIndex - 2,
      }))
    }
  }, [indexes.currentIndex])


  useEffect(() => {
    if (onCardChange) onCardChange(indexes)
    const transitionInterval = setInterval(() => {
      if (autoRotate) handleCardTransition()
    }, rotationInterval)
    return () => clearInterval(transitionInterval)
  }, [handleCardTransition, indexes, autoRotate])

  return (
    <div className="container">
      {
        leftButton
          ? <span onClick={handleLeftButton}>{leftButton}</span>
          : <span className="leftButton" onClick={handleLeftButton}>&lsaquo;</span>
      }
      <ul style={{ ...style }} className={`cardCarousel ${containerClassName || 'carouselDefault'}`}>
        {cardItems.map((card, index) => (
          <li
            key={card.key}
            className={`${cardClassName || ''} card ${setCardStatus(indexes, index)}`}
          >
            {card}
          </li>
        ))}
      </ul>
      {
        rightButton
          ? <span onClick={handleCardTransition}>{rightButton}</span>
          : <span className="rightButton" onClick={handleCardTransition}>&rsaquo;</span>
      }
    </div>
  )
}

export default StackedCarousel
