import { Input, Tree, Select } from 'antd'
import React, { Component } from "react"
import { action, observable, toJS } from "mobx"

import DocumentsStore from "./store-documents"
import { observer, inject } from "mobx-react"
import { UnorderedListOutlined, SearchOutlined } from '@ant-design/icons'
import MODULE_CODE from './config'
import { getModInfo } from '../common/util'

const store = new DocumentsStore()

@inject('CommonStore')
@observer
export default class Documents extends Component {
  @observable selectV = undefined
  @observable selectedKeys = []
  docRef = React.createRef()

  componentWillMount () {
    const { CommonStore } = this.props
    CommonStore.setPageModules([])
  }

  componentDidMount () {
    const { CommonStore, location: { pathname, search } } = this.props
    const activeItem = CommonStore.PAGES.find(item => item.url === pathname)
    CommonStore.getPageInfo(activeItem.id)
    store.getDocTree().then(res => {
      if (res && res[0]) {
        this.changeVersion(res[0].versionId)
        if (res[0].categoryList.length && res[0].categoryList[0].documentList && res[0].categoryList[0].documentList.length) {
          if (search) {
            const targetUrl = search.split('=') && search.split('=')[1]
            this.selectedKeys = [`/docfile/${targetUrl}.html`]
          } else {
            this.selectedKeys = [res[0].categoryList[0].documentList[0].url]
          }
        }
      }
    })
  }

  @action
  changeVersion = e => {
    this.selectV = e
  }

  @action
  treeSelect (selectkeys, e) {
    if (e.selected) {
      this.selectedKeys = [e.node.key]
    }
  }

  @action
  getTreeNode = () => {
    const { docTree } = store
    const activeVItem = docTree.find(item => item.versionId === this.selectV)
    return (activeVItem.categoryList || []).map(item => ({
      ...item,
      title: (
        <span className="FBH FBJB FBAC">
          {item.name}
          <UnorderedListOutlined />
        </span>
      ),
      key: `${activeVItem.versionId}-${item.categoryId}`,
      selectable: false,
      children: (item.documentList || []).map(k => ({
        ...k,
        title: k.title,
        key: `/${k.url}`,
      })),
    }))
  }

  @action
  iframeLoad = () => {
    const { current } = this.docRef
    if (current) {
      const { pathname } = current.contentWindow.location
      this.selectedKeys = [decodeURI(pathname)]
    }
  }

  render () {
    const { docTree } = store
    const { CommonStore: { PAGE_MODULES = [] } } = this.props
    const { FIRST } = MODULE_CODE
    const allDocs = []
    docTree.forEach(item => {
      (item.categoryList || []).forEach(k => {
        k.documentList.forEach(m => {
          allDocs.push({
            ...m,
            name: `${item.versionTxt}-${m.title}`,
            key: `${item.versionId}_${k.categoryId}_/${m.url}`,
          })
        })
      })
    })
    const treeData = this.selectV && docTree.length ? this.getTreeNode() : []
    return (
      <div className="page-documents">
        <div className="documents-header FBV FBAS FBJC">
          <h3 className="head-title">
            {getModInfo(PAGE_MODULES, FIRST, 'title')}
          </h3>
          <span className="head-desc mini-font">
            {getModInfo(PAGE_MODULES, FIRST, 'content')}
          </span>
          {/* <Input.Search
            placeholder="请输入关键字"
            enterButton="搜索文档"
            size="large"
            className="doc-serch"
            onSearch={v => {
              console.log(v, 111)
              searchDoc(v)
            }}
          /> */}
          <Select
            showSearch
            allowClear
            className="search-select"
            placeholder="请输入关键字"
            optionFilterProp="children"
            suffixIcon={<SearchOutlined />}
            onChange={e => {
              if (e) {
                const keys = e.split('_') || []
                const tmpLength = e.split('/docfile').length
                const htmlName = e.split('/docfile')[tmpLength - 1]
                // eslint-disable-next-line prefer-destructuring
                const targetVersion = keys[0]
                this.selectV = +targetVersion
                this.selectedKeys = [`/docfile${htmlName}`]
              }
            }}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {allDocs.map(item => (
              <Select.Option key={item.key}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="FBH doc-main">
          <div className="main-left FBV">
            <Select
              value={this.selectV}
              className="tree-select"
              onChange={e => this.changeVersion(e)}
            >
              {store.docTree.map(item => (
                <Select.Option value={item.versionId} key={item.versionId}>
                  {item.versionTxt}
                </Select.Option>
              ))}
            </Select>
            <div className="tree-main FB1">
              {treeData.length && this.selectV !== undefined ? (
                <Tree
                  treeData={toJS(treeData)}
                  blockNode
                  defaultExpandAll
                  selectedKeys={toJS(this.selectedKeys)}
                  onSelect={(selectedKeys, e) => {
                    this.treeSelect(selectedKeys, e)
                  }}
                />
              ) : (
                <span className="doc-empty mini-font">
                    暂无数据
                </span>
              )}
            </div>
          </div>
          <div className="FB1">
            <iframe
              src={this.selectedKeys && this.selectedKeys[0]}
              width="100%"
              height="100%"
              title="文档"
              ref={this.docRef}
              onLoad={() => this.iframeLoad()}
              style={{ border: 'none' }}
            >
            </iframe>
          </div>
        </div>
      </div>
    )
  }
}
