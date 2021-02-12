import React, { Component } from 'react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserInfo, reqWeather } from '../../redux/action/loginInfoAction'
import { Layout, Menu, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
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
import Details from '../product/components/Details/Details'
import AddModify from '../product/components/AddModify/AddModify'
// logo
import logo from '../../assets/images/logo192.png'
import './index.css'
import MenuList from '../../config/menu-config'
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
    // 菜单
    let menuData = this.creatMenu(MenuList)
    this.setState({
      menuList: menuData,
    })
    // 获取标题
    // console.log(this.getTitle())
    // 请求天气
    let weather = await reqWeather()
    this.setState({
      NowWeather: weather.data[0],
      city: weather.city,
    })
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
    let { isfullScreen, newDate, NowWeather, city, collapsed, menuList } = this.state
    let { pathname } = this.props.location
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
          <Menu theme="dark" mode="inline" selectedKeys={pathname.split('/').indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]} defaultOpenKeys={pathname.split('/').splice(2)}>
            {/* ["", "admin", "home"] 所以是删除第二项并返回删除的数 */}
            {menuList}
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
              <div className="header-bottom-left">{this.getTitle()}</div>
              <div className="header-bottom-right">
                {newDate}&nbsp;&nbsp;&nbsp;&nbsp;
                {NowWeather &&
                  ` 今天是  :   ${NowWeather.week} 您所在城市 :  ${city}      空气指数  : ${NowWeather.air} 空气质量  :   ${NowWeather.air_level}   ${NowWeather.tem2} —— ${NowWeather.tem1}   ${
                    NowWeather.wea
                  }    ${NowWeather.win[0]} —— ${NowWeather.win[1] === undefined ? '' : NowWeather.win[1]}`}
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              minHeight: 280,
            }}
          >
            {/* 路由区 */}
            <Switch>
              <Route path="/admin/home" component={Home} />
              <Route path="/admin/prod_about/category" component={Category} />
              <Route path="/admin/prod_about/product" component={Product} exact />
              <Route path="/admin/prod_about/product/add" component={AddModify} />
              <Route path="/admin/prod_about/product/details/:id" component={Details} />
              <Route path="/admin/prod_about/product/modify/:id" component={AddModify} />
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
  // 根据数据动态生成菜单函数
  creatMenu = menuData => {
    return menuData.map(item => {
      if (item.children) {
        // 二级菜单
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.creatMenu(item.children)}
          </SubMenu>
        )
      } else {
        // 一级菜单
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        )
      }
    })
  }
  // 获取标题
  getTitle = () => {
    let title = ''
    let newPath = this.props.location.pathname.split('/').indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split('/').pop()
    MenuList.forEach(item => {
      if (item.children instanceof Array) {
        // find返回找到的那一项
        let temp = item.children.find(item2 => {
          return item2.key === newPath
        })
        if (temp) {
          return (title = temp.title)
        }
      } else {
        if (item.key === newPath) {
          title = item.title
        }
      }
    })
    return title
  }
}
export default Admin
