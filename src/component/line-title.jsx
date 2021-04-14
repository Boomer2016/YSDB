import React from 'react'
import leftLine from '../image/left-line.png'
import rightLine from '../image/right-line.png'
import './line-title.styl'

const LineTitle = props => {
  const { title, titleClass, show = "both", className = ''} = props
  return (
    <div className={`FBH line-title FBAC ${className || 'FBJC'}`}>
      {(show === "both" || show === "left") && <img src={leftLine} alt="" className="left-line" />}
      <span className={titleClass}>{title}</span>
      {(show === "both" || show === "right") && <img src={rightLine} alt="" className="right-line" />}
    </div>
  )
}

export default LineTitle
