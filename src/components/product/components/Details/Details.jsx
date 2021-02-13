import React, { Component } from 'react'
import { Card, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqProductDetails, reqCategory } from '../../../../api'
import { connect } from 'react-redux'
import './Details.less'
const { Item } = List
@connect(state => ({ productListData: state.productListData, CategoryData: state.CategoryData }), {})
class DetailsComponent extends Component {
  state = {
    dataSource: [],
    cardLoading: true,
    categoryName: '',
  }
  componentDidMount() {
    let dataSource
    if (this.props.productListData.length) {
      dataSource = this.props.productListData.find(item => {
        return item.categoryId === this.props.match.params.id
      })
      this.categoryId = dataSource.categoryId //this是将状态挂载到自身
      if (this.props.CategoryData.length) {
        let categoryName = this.props.CategoryData.find(chitem => {
          return this.categoryId === chitem._id
        })
        this.setState({
          categoryName: categoryName.name,
          cardLoading: false,
        })
      } else this.getCategoryName()
      this.setState({
        dataSource,
      })
    } else this.getDetails(this.props.match.params.id)
  }
  getCategoryName = async () => {
    let result = await reqCategory()
    let { status, data } = result
    if (status === 0) {
      let categoryName = data.find(chitem => {
        return this.categoryId === chitem._id
      })
      this.setState({
        categoryName: categoryName.name,
        cardLoading: false,
      })
    }
  }
  getDetails = async id => {
    let result = await reqProductDetails(id)
    let { status, msg /* data */ } = result
    if (status === 0) {
      this.setState({
        cardLoading: false,
        dataSource: {
          name: '暂无数据',
          desc: '暂无数据',
          price: '暂无数据',
          categoryId: '暂无数据',
          imgs: [],
          detail: '<p>后台暂无数据</p>',
        },
      })
    } else {
      return message.error(msg)
    }
  }
  render() {
    return (
      <Card
        loading={this.state.cardLoading}
        title={
          <div>
            <ArrowLeftOutlined style={{ marginRight: '5px', color: '#42A68F' }} onClick={() => this.props.history.goBack()} />
            <span>商品详情</span>
          </div>
        }
      >
        <List rowKey="222">
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品名称：</span>
            <span>{this.state.dataSource && this.state.dataSource.name}</span>
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品描述：</span>
            <span>{this.state.dataSource && this.state.dataSource.desc}</span>
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品价格：</span>
            <span>{'$' + this.state.dataSource && this.state.dataSource.price}</span>
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品分类：</span>
            <span>{this.state.categoryName}</span>
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品图片：</span>
            {this.state.dataSource &&
              this.state.dataSource.imgs &&
              this.state.dataSource.imgs.map((item, index) => {
                return <img src={'/upload/' + item} key={index} alt="商品图片" width="220px" height="260px" />
              })}
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: this.state.dataSource && this.state.dataSource.detail }} />
          </Item>
        </List>
      </Card>
    )
  }
}
export default DetailsComponent
