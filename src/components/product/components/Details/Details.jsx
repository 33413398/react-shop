import React, { Component } from 'react'
import { Card, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqProductDetails } from '../../../../api'
import { connect } from 'react-redux'
import './Details.less'
const { Item } = List
@connect(state => ({ productListData: state.productListData }), {})
class DetailsComponent extends Component {
  state = {
    dataSource: [],
  }
  componentDidMount() {
    let dataSource
    if (this.props.productListData.length !== 0) {
      dataSource = this.props.productListData.find(item => {
        if (item.categoryId === this.props.match.params.id) {
          return item
        }
      })
      this.setState({
        dataSource,
      })
    } else this.getDetails(this.props.match.params.id)
  }
  getDetails = async id => {
    let result = await reqProductDetails(id)
    let { status, msg, data } = result
    if (status === 0) {
      this.setState({
        dataSource: {
          name: '',
          desc: '',
          price: '',
          categoryId: 111,
          imgs: ['111'],
          detail: '<p>暂无数据</p>',
        },
      })
    } else {
      return message.error(msg)
    }
  }
  render() {
    return (
      <Card
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
            <span>{this.state.dataSource && this.state.dataSource.categoryId}</span>
          </Item>
          <Item style={{ justifyContent: 'left' }}>
            <span className={'details_title'}>商品图片：</span>
            {this.state.dataSource &&
              this.state.dataSource.imgs &&
              this.state.dataSource.imgs.map((item, index) => {
                return <img src={'/upload/' + item} key={index} alt="商品图片" />
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
