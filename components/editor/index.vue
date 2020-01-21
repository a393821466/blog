<template>
  <div class="editor">
    <div id="myWangEditor">
      <div id="toolbar" ref="toolbar" />
      <div ref="myWangEditor" />
    </div>
  </div>
</template>

<script>
import address from '../../utils/address.config'
import { getNotSession, getSession } from '../../utils/storage'
export default {
  name: 'Editoritem',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    defaultMsg: String,
    articleDialog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editorContent: '', // 内容
      editor: '',
      info_: ''
    }
  },
  computed: {
    getToken() {
      let token = getNotSession('token')
      return token
    }
  },
  watch: {
    // articleDialog(val) {
    //   // 触发清除文本域内容
    //   if (val) {
    //     this.editor.txt.clear()
    //     this.info_ = null
    //   }
    // }
    articleDialog: {
      handler: function(n) {
        if (!n.flat) {
          this.editor.txt.clear()
          this.info_ = null
        } else {
          this.editor.txt.html(n.value.content)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (process.client) {
      this.seteditor()
    }
  },
  methods: {
    async seteditor() {
      const E = require('wangeditor')
      this.editor = new E(this.$refs.toolbar, this.$refs.myWangEditor) // 实例化wangeditor
      this.editor.customConfig = {
        onchange: html => {
          this.editorContent = html
          this.$emit('editorText', html)
        },
        uploadImgHeaders: {
          Authorization: this.getToken,
          enctype: 'multipart/form-data'
        },
        uploadImgMaxSize: 1 * 1024 * 1024, // 将图片大小限制为 3M
        uploadImgMaxLength: 3, // 限制一次最多上传 1 张图片
        uploadFileName: 'fileName', // 设置上传图片文件的时候，后台接受的文件名，files.fileName;
        withCredentials: true, // 跨域上传中如果需要传递 cookie 需设置 withCredentials
        uploadImgTimeout: 3000, // 自定义 timeout 时间，这里是设置的3秒
        uploadImgServer: address.upload.content, // 上传到后台的接口
        menus: [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo' // 撤销
          // 'redo' // 重复
        ]
      }
      this.toListenUp(this.editor) // 监听上传的各个阶段
      this.editor.create()
      let getContent = getSession('content')
      if (getContent) {
        this.editor.txt.html(getContent.content)
      }
    },
    toListenUp: function(editor) {
      // 监听上传图片的几个阶段，和做相应的处理
      // var _this = this
      editor.customConfig.uploadImgHooks = {
        // eslint-disable-next-line no-unused-vars
        before: function(xhr, editor, files) {
          // 图片上传之前触发
        },
        // eslint-disable-next-line no-unused-vars
        success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        // eslint-disable-next-line no-unused-vars
        fail: function(xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        // eslint-disable-next-line no-unused-vars
        error: function(xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        // eslint-disable-next-line no-unused-vars
        timeout: function(xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        // eslint-disable-next-line no-unused-vars
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = result.value // 获取后台返回的图片路径
          insertImg(url) // 把图片路径展示在编辑器里面
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './editorBar.scss';
</style>
