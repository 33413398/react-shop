import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, message } from 'antd'
import { connect } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import PicturesWall from './components/PicturesWall'
import RichText from './components/RichText'
import { reqCategory, reqAddProduct } from '../../../../api'
const { Option } = Select

@connect(state => ({ CategoryData: state.CategoryData }), {})
class DetailsComponent extends Component {
  imags = React.createRef() //refs新版创建方法，调用直接this.名字
  richText = React.createRef()
  state = {
    cardLoading: false,
    categoryName: [], //商品分类数据
  }
  componentDidMount() {
    if (this.props.CategoryData.length) this.getCategoryName(this.props.CategoryData)
    else this.getCategoryList()
  }
  // 请求分类列表
  getCategoryList = async () => {
    let result = await reqCategory()
    let { status, data } = result
    if (status === 0) {
      this.getCategoryName(data)
    }
  }
  // 拿到的分类列表设置到状态中
  getCategoryName = data => {
    this.setState({
      categoryName: data,
    })
  }
  render() {
    let { categoryName } = this.state
    return (
      <Card
        loading={this.state.cardLoading}
        title={
          <div>
            <ArrowLeftOutlined style={{ marginRight: '5px', color: '#42A68F' }} onClick={() => this.props.history.goBack()} />
            <span>{this.props.match.params.id ? '商品修改' : '商品新增'}</span>
          </div>
        }
      >
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 16 }} name="product" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Form.Item label="商品名称" name="name" rules={[{ required: true, message: '请先输入商品名称!' }]}>
            <Input placeholder={'商品名称'} />
          </Form.Item>
          <Form.Item label="商品描述" name="desc" rules={[{ required: true, message: '请先入商品描述!' }]}>
            <Input placeholder={'商品描述'} />
          </Form.Item>
          <Form.Item label="商品价格" name="price" rules={[{ required: true, message: '请先入商品价格!' }]}>
            <Input type={'number'} prefix="￥" suffix="元" placeholder={'商品价格'} />
          </Form.Item>
          <Form.Item label="商品分类" name="categoryId" rules={[{ required: true, message: '请先选择商品分类!' }]}>
            <Select placeholder={'选择商品分类'}>
              {categoryName.map((item, index) => {
                return (
                  <Option value={item._id} key={index}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="商品图片" name="imgs" wrapperCol={{ span: 12 }}>
            <PicturesWall ref={this.imags} />
          </Form.Item>
          <Form.Item label="商品详情" name="detail">
            <RichText ref={this.richText} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
  // 表单校验通过函数
  onFinish = async values => {
    let imgs = this.imags.current.getFileList() //调用ref对应的组件方法
    let detail = this.richText.current.getRichText() //调用ref对应的组件方法
    let result = await reqAddProduct({ ...values, imgs, detail })
    let { status, msg } = result
    if (status === 0) {
      message.success('商品添加成功！', 1)
      this.props.history.replace('/admin/prod_about/product')
    } else message.error(msg, 1)
  }
  // 表单校验失败函数
  onFinishFailed = err => {
    console.log(err)
  }
}
export default DetailsComponent
