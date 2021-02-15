import React, { Component } from 'react'
import { Button, Card, Table, Modal, message } from 'antd'
import dayjs from 'dayjs'
import { reqUserList, reqDelUser } from '../../api'
import AddModifyComponent from './components/AddModify'

export default class UserComponent extends Component {
  state = {
    UserList: [],
    rolesList: [],
    titleType: '',
    userId: '',
    username: '',
    phone: '',
    email: '',
    role_id: '',
    addFlag: false,
    delFlag: false,
    modifyUserData: {},
  }
  componentDidMount() {
    this.getUserList()
  }
  getUserList = async () => {
    let result = await reqUserList()
    let { data, msg, status } = result
    if (status === 0) {
      this.setState({
        UserList: data.users,
        rolesList: data.roles,
      })
    } else message.error(msg, 1)
  }
  render() {
    let { UserList, rolesList, addFlag, titleType, userId, modifyUserData, delFlag } = this.state
    return (
      <Card
        title={
          <Button type={'primary'} onClick={this.showAdd}>
            创建用户
          </Button>
        }
      >
        <Table
          dataSource={UserList}
          rowKey={'_id'}
          bordered
          columns={[
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              key: 'email',
              width: '20%',
            },
            {
              title: '电话',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: '注册时间',
              dataIndex: 'create_time',
              key: 'create_time',
              width: '20%',
              render: time => (time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''),
            },
            {
              title: '所属角色',
              dataIndex: 'role_id',
              key: 'role_id',
              render: role_id => {
                let backdata = rolesList.find(item => {
                  return item._id === role_id
                })
                return backdata.name
              },
            },
            {
              title: '操作',
              key: '_id',
              render: item => {
                return (
                  <div>
                    <Button type={'link'} onClick={() => this.showModify(item)}>
                      修改
                    </Button>
                    <Button type={'link'} onClick={() => this.showDel(item._id)}>
                      删除
                    </Button>
                  </div>
                )
              },
            },
          ]}
        />
        {addFlag && (
          <AddModifyComponent
            rolesList={rolesList}
            id={userId}
            modifyUserData={modifyUserData}
            getUserList={this.getUserList}
            addFlag={addFlag}
            titleType={titleType}
            handleAddCancel={this.handleAddCancel}
          />
        )}
        <Modal title={'删除'} visible={delFlag} okText={'确认'} cancelText={'取消'} onOk={this.okDelFun} onCancel={() => this.handleDelCancel()}>
          <p>确定删除该用户吗？</p>
        </Modal>
      </Card>
    )
  }
  showDel = id => {
    this.setState({
      delid: id,
      delFlag: true,
    })
  }
  okDelFun = async () => {
    let { delid } = this.state
    let result = await reqDelUser(delid)
    let { status, msg } = result
    if (status === 0) {
      message.success('删除用户成功！', 1)
      this.handleDelCancel()
      this.getUserList()
    } else message.error(msg, 1)
  }
  handleDelCancel = () => {
    this.setState({
      delFlag: false,
    })
  }
  showModify = item => {
    if (item) {
      let { _id } = item
      this.setState({ addFlag: true, titleType: '修改用户', userId: _id, modifyUserData: item })
    }
  }
  showAdd = () => {
    this.setState({ addFlag: true, titleType: '创建用户' })
  }
  handleAddCancel = () => {
    this.setState({ addFlag: false })
  }
}
