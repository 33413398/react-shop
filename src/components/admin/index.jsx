import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserInfo, reqWeather } from '../../redux/action/loginInfoAction'
import { Layout, Menu, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { UserOutlined, DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
// import { reqCategory } from '../../api'
// 子组件
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../bar/Bar'
import Line from '../line/Line'
import Pie from '../pie/Pie'
// logo
import logo from '../../assets/images/logo.png'
import './index.css'
const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

@connect(state => ({ userInfo: state.userInfo }), {
  deleteUserInfo,
})
class Admin extends Component {
  state = {
    collapsed: false,
    // 是否全屏标志位
    isfullScreen: false,
    // 时间
    newDate: dayjs().format('YYYY年 MM月DD日 HH:mm:ss  A'),
  }

  // 挂载全屏监听函数
  async componentDidMount() {
    screenfull.on('change', () => {
      this.setState({
        isfullScreen: !this.state.isfullScreen,
      })
    })
    // let dayDate = Date.now()
    // 时间插件
    setInterval(() => {
      this.setState({
        newDate: dayjs().format('YYYY年 MM月DD日 HH:mm:ss  A'),
      })
    }, 1000)
    // 请求天气
    let weather = await reqWeather()
    this.setState({
      NowWeather: weather,
    })

    console.log(this.props)
  }

  // 注销组件前清除(可以防止组件切换的报错，万金油)
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return
    }
  }
  // 侧边栏是否展开的回调函数
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  // 退出登录
  deleteUser = () => {
    let { deleteUserInfo } = this.props
    Modal.confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要退出登录吗？将会返回登录界面！',
      okText: '确认',
      cancelText: '取消',
      // 点击确定执行的回调
      onOk: () => {
        // action使用需要先导入，然后连接器，连接器的方法都在props中拿
        deleteUserInfo()
      },
      // 取消执行的回调
      onCancel: () => {},
    })
  }
  // 全屏切换
  fullScreen = () => {
    screenfull.toggle()
  }

  render() {
    let { isfullScreen, newDate, NowWeather, collapsed } = this.state
    if (NowWeather) {
      var { nightPictureUrl, dayPictureUrl } = NowWeather
    }
    if (!this.props.userInfo.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
            <img src={logo} alt="logo" className={!collapsed ? 'logobox' : 'logoboxOpen'} />
            {!collapsed && <h1 className="logo_title">商城管理系统</h1>}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header-top">
              <Button size="small" onClick={this.fullScreen}>
                {isfullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              </Button>
              <span className="username">欢迎您,{this.props.userInfo.user.username}</span>
              <Button type="link" size="small" onClick={this.deleteUser}>
                退出登录
              </Button>
            </div>
            <div className="header-botton">
              <div className="header-bottom-left">{this.props.location.pathname.split('/').pop()}</div>
              <div className="header-bottom-right">
                {newDate}&nbsp;&nbsp;&nbsp;&nbsp;
                {NowWeather && `实时天气:  今天是${NowWeather.date}    ${NowWeather.weather}    ${NowWeather.temperature}    ${NowWeather.wind}`}
                {newDate.split(' ').pop() === 'PM' ? <img src={NowWeather && nightPictureUrl} alt="png" /> : <img src={NowWeather && dayPictureUrl} alt="png" />}
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* 路由区 */}
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/category" component={Category} />
              <Route path="/admin/product" component={Product} />
              <Route path="/admin/role" component={Role} />
              <Route path="/admin/user" component={User} />
              <Route path="/admin/charts/bar" component={Bar} />
              <Route path="/admin/charts/line" component={Line} />
              <Route path="/admin/charts/pie" component={Pie} />
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin
