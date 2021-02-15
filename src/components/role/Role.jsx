import React, { Component } from 'react'
import { Button, Card, Table, Modal, Form, Input, message, Tree } from 'antd'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { reqRoleList, reqAddRole, reqPowerRole } from '../../api'
import MenuList from '../../config/menu-config'
const { TreeNode } = Tree

@connect(state => ({ userInfo: state.userInfo }), {})
class RoleComponent extends Component {
  addfrom = React.createRef()
  state = {
    RoleList: [],
    isAddModalVisible: false,
    isPowerModalVisible: false,
    _id: '',
    checkedKeys: [],
  }
  componentDidMount() {
    this.getRoleList()
  }

  getRoleList = async () => {
    let result = await reqRoleList()
    let { status, data } = result
    if (status === 0) this.setState({ RoleList: data })
  }
  render() {
    let { RoleList, isAddModalVisible, isPowerModalVisible, checkedKeys, name } = this.state
    return (
      <Card
        // loading={this.state.cardLoading}
        title={
          <Button type={'primary'} onClick={this.showAddModal}>
            添加角色
          </Button>
        }
      >
        <Table
          dataSource={RoleList}
          rowKey={'_id'}
          bordered
          columns={[
            {
              title: '角色名称',
              dataIndex: 'name',
              key: 'name',
              width: '20%',
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              key: 'create_time',
              width: '30%',
              render: time => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss'),
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              key: 'auth_time',
              width: '30%',
              render: time => (time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''),
            },
            {
              title: '授权人',
              dataIndex: 'auth_name',
              key: 'auth_name',
            },
            {
              title: '操作',
              key: '_id',
              render: item => {
                return (
                  <Button type={'link'} onClick={() => this.showPower(item._id, item.name, item.menus)}>
                    设置权限
                  </Button>
                )
              },
            },
          ]}
        />
        <Modal title="添加角色" visible={isAddModalVisible} okText={'添加'} cancelText={'取消'} footer={false} onCancel={this.handleAddCancel}>
          <Form ref={this.addfrom} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} name="addrole" initialValues={{ remember: true }} onFinish={this.onAddFinish}>
            <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: '角色名称不可以为空!' }]}>
              <Input placeholder={'请输入角色名称!'} allowClear />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: '2%' }}>
              <Button type="primary" htmlType="submit" style={{ float: 'right', marginLeft: '5px' }}>
                添加
              </Button>
              <Button onClick={this.handleAddCancel} style={{ float: 'right' }}>
                关闭
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* 权限模态框 */}
        <Modal title="配置角色权限" visible={isPowerModalVisible} okText={'确定'} cancelText={'取消'} onOk={this.handleOkPower} onCancel={this.handlePowerCancel}>
          <div style={{ width: '100%', marginBottom: '8%' }}>
            <span style={{ width: '15%' }}>角色名称：</span>
            <Input style={{ width: '80%' }} value={name || ''} placeholder={'请输入角色名称'} disabled />
          </div>
          <Tree checkable onCheck={this.onCheck} checkedKeys={checkedKeys} defaultExpandAll>
            <TreeNode title={'平台权限'} key={'all'}>
              {this.createTreeNodes(MenuList)}
            </TreeNode>
          </Tree>
        </Modal>
      </Card>
    )
  }
  // 树选节点生成
  // 循环生成节点
  createTreeNodes = data => {
    let arr = []
    data.forEach(item => {
      if (item.children) {
        return arr.push(
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.createTreeNodes(item.children)}
          </TreeNode>
        )
      } else {
        return arr.push(<TreeNode title={item.title} key={item.key} dataRef={item} />)
      }
    })
    return arr
  }
  onCheck = checkedKeys => {
    this.setState({
      checkedKeys,
    })
  }

  showAddModal = () => {
    this.setState({ isAddModalVisible: true })
  }

  handleAddCancel = () => {
    this.setState({ isAddModalVisible: false })
  }
  onAddFinish = async values => {
    let { RoleList } = this.state
    const relust = await reqAddRole(values.roleName)
    let { msg, data } = relust
    if (msg) {
      return message.error(msg)
    } else {
      let newArry = [...RoleList]
      newArry.push(data)
      message.success('添加角色成功, 请授权')
      this.setState({
        isAddModalVisible: false,
        RoleList: newArry,
      })
      this.addfrom.current.resetFields()
    }
  }
  // 权限
  showPower = (id, name, menus) => {
    let arr = []
    arr = menus.map(item => {
      return item.replace('/', '')
    })
    this.setState({
      isPowerModalVisible: true,
      _id: id,
      name,
      checkedKeys: arr,
    })
  }
  handleOkPower = async () => {
    let { _id, checkedKeys } = this.state
    let result = await reqPowerRole({ _id, menus: checkedKeys, auth_name: this.props.userInfo.user.username })
    let { status, data, msg } = result
    if (status === 0) {
      message.success('用户权限配置成功！', 1)
      this.setState({
        checkedKeys: data.menus,
      })
      this.getRoleList()
    } else message.error(msg, 1)
    this.setState({
      isPowerModalVisible: false,
    })
  }
  handlePowerCancel = () => {
    this.setState({
      isPowerModalVisible: false,
    })
  }
}
export default RoleComponent
