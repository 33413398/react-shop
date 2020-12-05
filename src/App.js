import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './containers/login/index'
import Admin from './components/admin/index'
// 按需加载antd需要将样式引入app全局
import 'antd/dist/antd.css'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin" exact />
      </Switch>
    </HashRouter>
  )
}

export default App
