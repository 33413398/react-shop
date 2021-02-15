import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api'
import { getLoginInfo } from '../../redux/action/loginInfoAction'
import logo from '../../assets/images/logo192.png'
import './index.css'

@connect(state => ({ userInfo: state.userInfo }), {
  saveUserInfo: getLoginInfo,
})
class LoginComponent extends Component {
  handleSubmit = async values => {
    const { username, password } = values
    const { data, msg, status } = await reqLogin(username, password)
    if (status === 0) {
      // 1.请求到的值保存到redux
      this.props.saveUserInfo(data)
      // 2.跳转，必须在存储之后跳转否则跳转到的组件拿不到值
      this.props.history.replace('/admin')
      message.success('登录成功!')
    } else {
      message.error(msg, 1)
    }

    // this.props.loginAsync(username, password)
  }

  /* 
  对密码进行自定义验证
  */
  validatePwd = (rule, value, callback) => {
    const pwdReg = /^[a-zA-Z0-9_]+$/
    const length = value && value.length
    /*
  用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
  */
    if (!value) {
      return Promise.reject('密码必须输入')
    } else if (length < 4) {
      return Promise.reject('密码必须大于等于4位')
    } else if (length > 12) {
      return Promise.reject('密码必须小于等于12位')
    } else if (!pwdReg.test(value)) {
      return Promise.reject('密码必须是英文、数字或下划线组成')
    } else {
      return Promise.resolve() // 验证通过/成功
    }
  }

  render() {
    if (this.props.userInfo.isLogin) {
      return <Redirect to="/admin" />
    }
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="login" />
          <h1>商城管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.handleSubmit}
          >
            <Form.Item
              name="username"
              // 配置对象
              initialValue="" // 初始值
              /*
            用户名/密码的的合法性要求
              1). 必须输入
              2). 必须大于等于4位
              3). 必须小于等于12位
              4). 必须是英文、数字或下划线组成
            */
              // 声明式验证: 利用已有的验证规则进行验证, 不用亲自判断
              rules={[
                { required: true, whitespace: true, message: '用户名必须输入' },
                { min: 4, message: '用户名不能小于4位' },
                { max: 12, message: '用户名不能大于12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              // 初始值
              initialValue=""
              rules={[
                // 自定义验证
                { validator: this.validatePwd },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" allowClear placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" color="#1DA57A" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default LoginComponent
