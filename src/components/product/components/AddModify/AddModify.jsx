import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, message } from 'antd'
import { connect } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import PicturesWall from './components/PicturesWall'
import RichText from './components/RichText'
import { reqCategory, reqAddProduct, reqUploadProduct } from '../../../../api'
const { Option } = Select

@connect(state => ({ CategoryData: state.CategoryData, productListData: state.productListData }), {})
class DetailsComponent extends Component {
  imags = React.createRef() //refs新版创建方法，调用直接this.名字
  richText = React.createRef()
  ModifyformRef = React.createRef()
  state = {
    cardLoading: false,
    categoryName: [], //商品分类数据
    categoryId: null,
    name: '',
    desc: '',
    price: '',
    detail: '',
    imgs: [],
  }
  componentDidMount() {
    let { productListData } = this.props
    if (this.props.CategoryData.length) this.getCategoryName(this.props.CategoryData)
    else this.getCategoryList()
    // 修改
    if (this.props.match.params.id) {
      let currentProductList = productListData.find(item => {
        return item._id === this.props.match.params.id
      })
      //如果数据存在就回显，否则给服务器发请求
      if (currentProductList) {
        let { name, desc, price, categoryId, imgs, detail } = currentProductList
        this.imags.current.setFileList(imgs)
        this.richText.current.setRichText(detail)
        this.ModifyformRef.current.setFieldsValue({ name, desc, price, categoryId })
      } else {
        this.imags.current.setFileList([])
        this.richText.current.setRichText('<span>后端根据ID查询商品信息接口暂无，目前只能通过外部redux拿到数据，如果刷新导致，可以重新进</span>')
        this.ModifyformRef.current.setFieldsValue({ name: '', desc: '', price: '', categoryId: null })
      }
    }
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
        <Form ref={this.ModifyformRef} labelCol={{ span: 3 }} wrapperCol={{ span: 16 }} name="product" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
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
          <Form.Item wrapperCol={{ span: 16 }}>
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
    let result
    let imgs = this.imags.current.getFileList() //调用ref对应的组件方法
    let detail = this.richText.current.getRichText() //调用ref对应的组件方法
    if (this.props.match.params.id) {
      //修改
      result = await reqUploadProduct({ ...values, imgs, detail, _id: this.props.match.params.id })
    } else result = await reqAddProduct({ ...values, imgs, detail })

    let { status, msg } = result
    if (status === 0) {
      message.success(this.props.match.params.id ? '商品修改成功！' : '商品添加成功！', 1)
      this.props.history.replace('/admin/prod_about/product')
    } else message.error(msg, 1)
  }
  // 表单校验失败函数
  onFinishFailed = err => {
    console.log(err)
  }
}
export default DetailsComponent
