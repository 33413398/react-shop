import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './css.less'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: <span style={{ fontWeight: 700 }}>分类名</span>,
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: <span style={{ fontWeight: 700 }}>操作</span>,
    key: 'age',
    align: 'center',
    width: '20%',
    render: reload => {
      return <Button type={'link'}>修改分类</Button>
    },
  },
]
export default class CategoryComponent extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <div className={'categoryHeader'}>
          <Button style={{ float: 'right' }} type={'primary'} icon={<PlusCircleOutlined />}>
            添加
          </Button>
          <div style={{ clear: 'both' }} />
        </div>
        <div className={'categoryBottom'}>
          <Table bordered dataSource={dataSource} columns={columns} />
        </div>
      </div>
    )
  }
}
