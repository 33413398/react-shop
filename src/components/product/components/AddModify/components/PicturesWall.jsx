import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BASE_URL } from '../../../../../config'
import { reqDelImage } from '../../../../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //点击图片预览对话框标识符
    previewImage: '', //要预览的图片地址或者base64码，默认是base64码
    previewTitle: '', //要预览的标题
    fileList: [],
  }
  //预览图片模态框关闭方法
  handleCancel = () => this.setState({ previewVisible: false })

  //预览图片模态框打开方法
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      //如果没有url也没有预览则转换为base64，file是当前选择的图片对象
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }
  // 上传组件改变触发的方法
  handleChange = async ({ file, fileList }) => {
    //删除图片,点击删除按钮状态会变为removed
    if (file.status === 'removed') {
      let result = await reqDelImage(file.name)
      let { status, msg } = result
      if (status === 0) message.success('图片删除成功！', 1)
      else message.error(msg, 1)
    }
    //将后台返回的url设置为图片url,不再用base64
    if (file.status === 'done') {
      fileList[fileList.length - 1].thumbUrl = file.response.data.url
      fileList[fileList.length - 1].name = file.response.data.name
    }
    this.setState({ fileList })
  }
  // 将上传的图片数据交给上级组件,上级通过ref调用
  getFileList = () => {
    let newArry = []
    if (this.state.fileList.length) {
      this.state.fileList.forEach(item => {
        newArry.push(item.name)
      })
    }
    return newArry
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    )
    return (
      <>
        {/*action图片上传的后台地址,listType是布局样式，onPreview图片预览对应事件，fileList.length规定图片达到几张时不再显示上传图片按钮,name发到后台的文件参数名  */}
        <Upload name={'image'} action={`${BASE_URL}/manage/img/upload`} listType="picture-card" fileList={fileList} onPreview={this.handlePreview} onChange={this.handleChange}>
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
