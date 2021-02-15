import React, { Component } from 'react'
import { Button, Modal, Form, Input, message, Select } from 'antd'
import { reqAddUser, reqModifyUser } from '../../../api'
const { Option } = Select
export default class AddModifyComponent extends Component {
  addUserfromRef = React.createRef()
  state = {
    titleType: '',
  }

  componentDidMount() {
    let { modifyUserData, titleType } = this.props
    if (titleType === '修改用户') this.initFrom(modifyUserData)
  }
  componentWillUnmount() {
    this.addUserfromRef.current.resetFields()
  }

  initFrom = item => {
    let { id } = this.props
    if (item && id) {
      let newArr = { ...item }
      let { username, phone, email, role_id } = newArr
      this.addUserfromRef.current.setFieldsValue({ username, phone, email, role_id })
    }
  }
  render() {
    let { handleAddCancel, addFlag, titleType, rolesList } = this.props
    return (
      <Modal title={titleType} visible={addFlag} okText={'添加'} cancelText={'取消'} footer={false} onCancel={() => handleAddCancel()}>
        <Form ref={this.addUserfromRef} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} name="userfrom" onFinish={this.onAddFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不可以为空!' }]}>
            <Input placeholder={'请输入用户名!'} allowClear />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不可以为空!' }]}>
            <Input placeholder={'请输入密码!'} allowClear />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '手机号不可以为空!' }]}>
            <Input placeholder={'请输入手机号!'} allowClear />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '邮箱不可以为空!' }]}>
            <Input placeholder={'请输入邮箱!'} allowClear />
          </Form.Item>
          <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请先选择角色!' }]}>
            <Select placeholder={'请选择角色!'} allowClear>
              {rolesList &&
                rolesList.map((item, index) => {
                  return (
                    <Option key={index} value={item._id}>
                      {item.name}
                    </Option>
                  )
                })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: '2%' }}>
            <Button type="primary" htmlType="submit" style={{ float: 'right', marginLeft: '5px' }}>
              {titleType === '创建用户' ? '添加' : '修改'}
            </Button>
            <Button onClick={() => handleAddCancel()} style={{ float: 'right' }}>
              关闭
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
  onAddFinish = async values => {
    let { handleAddCancel, getUserList, id, titleType } = this.props
    let result
    if (titleType === '创建用户') {
      result = await reqAddUser(values)
    } else if (titleType === '修改用户') {
      result = await reqModifyUser({ ...values, _id: id })
    } else return

    let { status, msg } = result
    if (status === 0) {
      titleType === '创建用户' ? message.success('添加用户成功！', 1) : message.success('更新用户成功！', 1)
      handleAddCancel()
      getUserList()
    } else message.error(msg, 1)
  }
}
