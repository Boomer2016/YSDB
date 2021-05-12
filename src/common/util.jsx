/* eslint react/destructuring-assignment: off */

import React from 'react'
import { toJS } from 'mobx'

export function asyncComponent (getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null
    state = { Component: AsyncComponent.Component }

    componentWillMount () {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render () {
      const { Component } = this.state

      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

// 获取URL参数
export function getUrlParam (name, type) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  const h = window.location.hash.substr(1).match(reg)
  if (type === 'hash') {
    if (h !== null) {
      return decodeURIComponent(h[2])
    }
  } else if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null
}

export function noop () { }

// 根据code获取模块信息
export const getModInfo = (pageInfo = [], code, key) => {
  const findItem = pageInfo.length ? pageInfo.find(item => item.code === code) : { buttonUrl: '/cooperation', subList: [] }
  // console.log(toJS(pageInfo), 'pageInfo', toJS(findItem))
  return findItem && findItem[key]
}

// 根据code获取模块信息
export const getImgSrc = imgId => {
  return imgId ? `/doc/Image/Download?id=${imgId}` : '/'
}

// 获取高德地图图片
// https://restapi.amap.com/v3/staticmap?location=114.026487,22.62078&zoom=13&size=&markers=mid,,A:114.026487,22.62078&key=b246b0abedb8d7d478a45362cff2c518
export const getMapSrc = (width, height) => {
  console.log(width, height)
  const key = 'b246b0abedb8d7d478a45362cff2c518'
  const location = '114.026487,22.62078'
  const zoom = 13
  const size = `${width}*${height}`
  const scale = 2
  const markers = 'mid,,A:114.026487,22.62078'
  return `https://restapi.amap.com/v3/staticmap?location=${location}&zoom=${zoom}&size=${size}&scale=${scale}&markers=${markers}&key=${key}`
}
