import React, { Component } from 'react'
import { Button, message, Table } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './css.less'
import { reqCategory } from '../../api'
import Modal from './components/Modal/view'
export default class CategoryComponent extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pageNumber: 1,
      pageSize: 5,
      isModalVisible: false,
      modalType: '',
      categoryId: 0,
    }
  }
  componentWillMount() {
    this.getListData()
  }
  componentWillUpdate(nextProps, nexpState) {
    let { isModalVisible } = this.state
    if (isModalVisible !== nexpState.isModalVisible) {
      this.getListData()
    }
  }
  getListData = async () => {
    let result = await reqCategory()
    if (result) {
      let { status, data, msg } = result
      if (status !== 0) message.error(msg, 1)
      this.setState({
        dataSource: data,
      })
    }
  }
  render() {
    let { dataSource, pageNumber, pageSize } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div className={'categoryHeader'}>
          <Button style={{ float: 'right' }} type={'primary'} icon={<PlusCircleOutlined />} onClick={() => this.oppModal('新增')}>
            添加
          </Button>
          <div style={{ clear: 'both' }} />
        </div>
        <div className={'categoryBottom'}>
          <Table
            bordered
            rowKey="_id"
            dataSource={dataSource}
            columns={[
              {
                title: <span style={{ fontWeight: 700 }}>分类名</span>,
                dataIndex: 'name',
                align: 'left',
                key: '_id',
              },
              {
                title: <span style={{ fontWeight: 700 }}>操作</span>,
                key: '_id',
                align: 'center',
                width: '20%',
                render: reload => {
                  return (
                    <Button type={'link'} onClick={() => this.oppModal('修改', reload)}>
                      修改分类
                    </Button>
                  )
                },
              },
            ]}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              showQuickJumper: true,
              onChange: this.onPageChange,
            }}
          />
        </div>
        {this.showModal(this.state.isModalVisible, dataSource)}
      </div>
    )
  }
  onPageChange = (pageNumber, pageSize) => {
    this.setState({
      pageNumber,
      pageSize,
    })
  }

  oppModal = (type, data) => {
    if (data) {
      let { _id, name } = data
      this.setState({
        isModalVisible: true,
        categoryId: _id,
        categoryName: name,
        modalType: type,
      })
    } else {
      this.setState({
        isModalVisible: true,
        modalType: type,
        categoryName: undefined,
      })
    }
  }
  closeModal = () => {
    this.setState({
      isModalVisible: false,
    })
  }
  showModal = (flag, data) => {
    let { categoryId, categoryName, modalType } = this.state
    if (flag) {
      return (
        <Modal flag={flag} dataSource={data} dataSourceFun={value => this.setState({ dataSource: value })} closeModal={() => this.closeModal()} id={categoryId} name={categoryName} type={modalType} />
      )
    }
  }
}
