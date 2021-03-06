import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    })
  }
  // 将富文本值传给父组件
  getRichText = () => {
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  // 通过父组件初始化富文本
  setRichText = html => {
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({ editorState })
    }
  }
  render() {
    const { editorState } = this.state
    return (
      <div>
        {/* wrapperClassName外边框工具栏区域类名样式，editorClassName用户输入的内容区类名样式 */}
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorStyle={{
            paddingLeft: '10px',
            border: '1px solid #000',
            lineHeight: '15px',
            minHeight: '200px',
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
