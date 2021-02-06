import React, { Component } from 'react'
import { Modal, Input, Form, message } from 'antd'
import { reqAddCategory, reqPutCategory } from '../../../../api'
const { Item } = Form

export default class ModalComponent extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      flag: false,
      type: '',
      id: 0,
    }
  }
  componentWillMount() {
    let { flag, id, name, type, dataSource } = this.props
    this.setState({
      flag,
      id,
      name,
      type,
      dataSource,
    })
  }
  componentDidMount() {
    let { name } = this.state
    this.formRef.current.setFieldsValue({ name })
  }
  closeClear = () => {
    let { closeModal } = this.props
    this.formRef.current.resetFields() //清空表单
    closeModal()
  }

  render() {
    let { flag, type } = this.state
    return (
      <Modal title={type} visible={flag} onOk={this.handleOk} onCancel={() => this.closeClear()} cancelText="取消" okText="确定">
        <Form ref={this.formRef}>
          <Item name="name" label="分类名" hasFeedback rules={[{ required: true, message: '分类名不可以为空!' }]}>
            <Input allowClear placeholder="请输入分类名！" onChange={this.addonChange} />
          </Item>
        </Form>
      </Modal>
    )
  }
  addonChange = e => {
    this.setState({
      name: e.target.value,
    })
  }

  handleOk = async () => {
    let { closeModal, dataSourceFun } = this.props
    let { type, dataSource, name, id } = this.state
    if (type === '新增') {
      if (!name) return message.info('分类名称不可以为空！')
      let result = await reqAddCategory(name)
      let { status, data, msg } = result
      if (status !== 0) {
        return message.error(msg, 1)
      } else {
        message.success('添加分类成功！', 1)
        let newDataSource = [...dataSource]
        newDataSource.unshift(data)
        dataSourceFun(newDataSource)
        this.formRef.current.setFieldsValue({ name: undefined }) //给表单设置值
        this.formRef.current.resetFields() //清空表单
      }
      closeModal()
    }
    if (type === '修改') {
      if (!name) return message.info('分类名称不可以为空！')
      let result = await reqPutCategory(id, name)
      let { status, msg } = result
      if (status !== 0) {
        return message.error(msg, 1)
      } else {
        message.success('修改分类成功！', 1)
        let newDataSource = [...dataSource]
        newDataSource.unshift({ _id: id, name: name })
        dataSourceFun(newDataSource)
        this.formRef.current.setFieldsValue({ name: undefined }) //给表单设置值
        this.formRef.current.resetFields() //清空表单
      }
      closeModal()
    }
  }
}
