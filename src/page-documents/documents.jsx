import { Input, Tree, Select } from 'antd'
import React, { Component } from "react"
import { action, observable, toJS } from "mobx"

import DocumentsStore from "./store-documents"
import { observer } from "mobx-react"
import { UnorderedListOutlined } from '@ant-design/icons'

const store = new DocumentsStore()

@observer
export default class Documents extends Component {
  @observable selectV = undefined
  @observable selectedKeys = []
  docRef = React.createRef()

  componentDidMount () {
    store.getDocTree().then(res => {
      if (res && res[0]) {
        this.changeVersion(res[0].versionId)
        if (res[0].categoryList.length && res[0].categoryList[0].documentList && res[0].categoryList[0].documentList.length) {
          this.selectedKeys = [res[0].categoryList[0].documentList[0].url]
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
      this.selectedKeys = [pathname]
    }
  }

  render () {
    const { docTree, searchDoc } = store
    const treeData = this.selectV && docTree.length ? this.getTreeNode() : []
    return (
      <div className="page-documents">
        <div className="documents-header FBV FBAS FBJC">
          <h3 className="head-title">文档中心</h3>
          <span className="head-desc mini-font">
            在这里你可以获取最全的资料，包括其他文案补充，其他文案补充
          </span>
          <Input.Search
            placeholder="请输入关键字"
            enterButton="搜索文档"
            size="large"
            className="doc-serch"
            onSearch={v => {
              console.log(v, 111)
              searchDoc(v)
            }}
          />
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
