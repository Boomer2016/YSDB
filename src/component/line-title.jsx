import React from 'react'
import leftLine from '../image/left-line.png'
import rightLine from '../image/right-line.png'
import './line-title.styl'

const LineTitle = props => {
  const {title, titleClass} = props
  return (
    <div className="FBH line-title FBAC FBJC">
      <img src={leftLine} alt="" className="left-line" />
      <span className={titleClass}>{title}</span>
      <img src={rightLine} alt="" className="right-line" />
    </div>
  )
}

export default LineTitle
