import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, message } from 'antd'
import { connect } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { reqProductList, reqSearchProduct, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../config.js'
import { getProductList } from '../../redux/action/ProductAction'
const { Option } = Select

@connect(state => ({}), {
  getProductList,
})
class ProductComponent extends Component {
  state = {
    total: '',
    productList: [],
    searchType: 'productName',
    tableLoding: true,
  }

  componentDidMount() {
    this.getProductFunc()
  }
  getProductFunc = async (pageNum = 1) => {
    let { getProductList } = this.props
    //形参初始化
    let result
    let { searchType, keyWord } = this.state
    if (this.searchFlag) {
      result = await reqSearchProduct(pageNum, PAGE_SIZE, searchType, keyWord)
    } else {
      result = await reqProductList(pageNum, PAGE_SIZE)
    }
    if (result.status === 0) {
      let { total, list } = result.data
      this.setState({
        total,
        pageNum: pageNum,
        productList: list,
        tableLoding: false,
      })
      getProductList(list)
    } else {
      this.setState({
        tableLoding: false,
      })
      return message.error('分页列表数据获取失败！')
    }
  }
  render() {
    let { productList, pageNum, total } = this.state
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '5%',
        align: 'center',
        render: reload => {
          return <span>{'$' + reload}</span>
        },
      },
      {
        title: '状态',
        key: 'status',
        width: '5%',
        align: 'center',
        render: reload => {
          return (
            <div>
              {reload.status === 1 ? (
                <Button type="primary" danger onClick={() => this.upStatefunc(reload._id, reload.status)}>
                  下架
                </Button>
              ) : (
                <Button type="primary" onClick={() => this.upStatefunc(reload._id, reload.status)}>
                  上架
                </Button>
              )}
              <span>{reload.status === 1 ? '在售' : '已停售'}</span>
            </div>
          )
        },
      },
      {
        title: '操作',
        key: '_id',
        width: '5%',
        align: 'center',
        render: reload => {
          return (
            <div>
              <Button type="link" onClick={() => this.props.history.push(`/admin/prod_about/product/details/${reload.categoryId}`)}>
                详情
              </Button>
              <Button type="link" onClick={() => this.props.history.push(`/admin/prod_about/product/modify/${reload._id}`)}>
                修改
              </Button>
            </div>
          )
        },
      },
    ]
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" style={{ width: 150 }} onChange={e => this.setState({ searchType: e })} allowClear>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input placeholder="关键字" style={{ width: 230, margin: '0 10px' }} onChange={e => this.setState({ keyWord: e.target.value })} allowClear />
            <Button type="primary" onClick={this.SrarchFunc}>
              搜索
            </Button>
          </div>
        }
        extra={
          <Button type={'primary'} icon={<PlusOutlined />} onClick={() => this.props.history.push(`/admin/prod_about/product/add`)}>
            添加商品
          </Button>
        }
        style={{ height: '100%' }}
      >
        <Table
          rowKey="_id"
          bordered
          dataSource={productList}
          columns={columns}
          pagination={{
            current: pageNum,
            pageSize: PAGE_SIZE,
            total: total,
            onChange: this.changePage,
          }}
          loading={this.state.tableLoding}
        />
      </Card>
    )
  }
  changePage = (page, pageSize) => {
    this.setState(
      {
        pageSize,
      },
      () => this.getProductFunc(page)
    )
  }
  SrarchFunc = () => {
    this.searchFlag = true
    this.getProductFunc()
  }
  upStatefunc = async (id, state) => {
    let productList = [...this.state.productList] //深拷贝
    if (state === 1) state = 2
    else state = 1
    let result = await reqUpdateStatus(id, state - 0)
    let { status, msg } = result
    if (status === 0) {
      message.success('状态修改成功！', 1)
      productList.map(item => {
        if (item._id === id) item.status = state
        return item
      })
      this.setState({
        productList,
      })
    } else message.error(msg, 1)
  }
}
export default ProductComponent
