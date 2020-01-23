<template>
  <div class="dialogArticle">
    <el-dialog
      ref="articleDialog"
      :title="dialogTitle"
      :visible.sync="articleDialog.flat"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleVlue" :rules="rules">
        <el-form-item
          label="文章标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input
            v-model="ruleVlue.title"
            auto-complete="off"
            placeholder="输入文章标题..."
          />
        </el-form-item>
        <el-form-item
          label="文章所属"
          :label-width="formLabelWidth"
          prop="menu"
        >
          <el-select v-model="ruleVlue.menus" placeholder="请选择">
            <el-option
              v-for="item in getMenu"
              :key="item.id"
              :label="item.subMenu"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="精选" :label-width="formLabelWidth">
          <el-radio
            v-for="(item, idx) in options2"
            :key="idx"
            v-model="ruleVlue.hot"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-form-item>
        <el-form-item
          label="浏览人数"
          :label-width="formLabelWidth"
          prop="viewerNum"
        >
          <el-input
            v-model="ruleVlue.viewerNum"
            auto-complete="off"
            placeholder="浏览人数..."
          />
        </el-form-item>
        <el-form-item
          label="轮播图"
          :label-width="formLabelWidth"
          prop="banner"
        >
          <el-select v-model="ruleVlue.banner" placeholder="是否轮播图">
            <el-option
              v-for="item in bannerList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="缩略图"
          :label-width="formLabelWidth"
          prop="miniImg"
        >
          <el-upload
            class="avatar-uploader"
            drag
            name="file"
            :headers="getToken"
            :action="thumbnailUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            multiple
          >
            <!--eslint-disable-next-line vue/html-self-closing-->
            <img
              v-if="ruleVlue.imageUrl"
              :src="ruleVlue.imageUrl"
              class="avatar"
            />
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要" :label-width="formLabelWidth" prop="summary">
          <el-input
            v-model="ruleVlue.summary"
            type="textarea"
            placeholder="请输入摘要"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio
            v-for="(item, idx) in statusList"
            :key="idx"
            v-model="ruleVlue.status"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <!-- <UE :article-dialog="articleDialog" @editorText="editorText" /> -->
          <no-ssr>
            <mavon-editor
              ref="md"
              v-model="ruleVlue.markContent"
              :ishljs="true"
              :placeholder="normalText"
              :code-style="codeStyle"
              @change="change"
              @save="saveFile"
              @imgAdd="$imgAdd"
            />
          </no-ssr>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">
          取 消
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click.native.prevent="onConfirm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import UE from '@/components/editor'
import config from '@/utils/address.config'
import { mapActions, mapGetters } from 'vuex'
// import { setSession, removeSession } from '@/utils/storage'
export default {
  name: 'ArticleAddDialog',
  props: {
    articleDialog: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    const articleTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('标题不能为空'))
      }
      callback()
    }
    return {
      formLabelWidth: '80px',
      thumbnailUrl: config.upload.thumbnail,
      dialogTitle: '添加文章',
      codeStyle: 'vs2015',
      normalText: '请在这里疯狂输出...',
      ruleVlue: {
        title: '',
        hot: 2,
        banner: 2,
        menus: 0,
        viewerNum: 10,
        summary: '',
        imageUrl: '',
        content: '',
        markContent: '',
        status: 1
      },
      handbook: '#### how to use mavonEditor in nuxt.js',
      statusList: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '异常'
        }
      ],
      bannerList: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      options2: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      articleMenu: [
        {
          value: 0,
          label: '全部选有'
        },
        {
          value: 3,
          label: '技术文章'
        },
        {
          value: 44,
          label: '学习笔记'
        }
      ],
      loading: false,
      rules: {
        title: [{ required: true, validator: articleTitle, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      getMenu: 'menu/menuList'
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    getToken() {
      if (process.client) {
        let token = sessionStorage.getItem('token')
        return {
          Authorization: token
        }
      }
    }
  },
  watch: {
    articleDialog: {
      handler: function(n) {
        this.dialogTitle = n.type == 'add' ? '添加文章' : '修改文章'
        if (n.type == 'update') {
          this.ruleVlue.id = n.value.id
          this.ruleVlue.title = n.value.title
          this.ruleVlue.hot = n.value.hot
          this.ruleVlue.banner = n.value.showHome
          this.ruleVlue.menus = n.value.menuId
          this.ruleVlue.status = n.value.status
          this.ruleVlue.summary = n.value.summary
          this.ruleVlue.imageUrl = n.value.image
          this.ruleVlue.content = n.value.content
          this.ruleVlue.markContent = n.value.markContent
          // setSession('content', n.value)
        } else {
          if (n && this.getMenu.length <= 0) {
            this.menu()
          }
          this.clearInput()
        }
        // if (!n.flat) {
        //   removeSession('content')
        // }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      addArticle: 'article/add',
      getMenuList: 'menu/get',
      getArticle: 'article/get',
      updatesArticle: 'article/updates',
      upload: 'article/uploadImg'
    }),
    // 关闭弹窗
    handleClose() {
      this.$emit('closeAddArticle', false)
    },
    // 改变editor
    // editorText(val) {
    //   this.ruleVlue.content = val
    // },
    // 图片上传
    handleAvatarSuccess(res) {
      // this.ruleVlue.imgUrl = URL.createObjectURL(file.raw);
      if (res.status) {
        this.ruleVlue.imageUrl = res.value
      }
    },
    // 上传失败后触发
    hanldAvatarError(err) {
      if (err) {
        let e = JSON.parse(err.msg)
        this.$message.error(e.msg)
      }
    },
    // 上传之前限制
    beforeAvatarUpload(file) {
      const imgType = ['image/png', 'image/jpg', 'image/jpeg']
      const isType = imgType.indexOf(file.type)
      const isLt500K = file.size / 1024 < 500
      if (isType <= -1) {
        this.$message.error('上传图片只能是JPG/JPEG/PNG格式!')
        return
      }
      if (!isLt500K) {
        this.$message.error('上传图片大小不能超过 500K!')
        return
      }
      this.multfileImg = file
      return isType && isLt500K
    },
    change(value, render) {
      this.ruleVlue.content = render
    },
    // 上传图片
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('fileName', $file)
      this.upload(formdata)
        .then(res => {
          if (res.status) {
            this.$refs.md.$img2Url(pos, res.value)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    saveFile(value, render) {
      console.log(value, render)
    },
    // 重置表单
    clearInput() {
      this.ruleVlue.title = ''
      this.ruleVlue.hot = 2
      this.ruleVlue.banner = 2
      this.ruleVlue.menus = 0
      this.ruleVlue.status = 1
      this.ruleVlue.summary = ''
      this.ruleVlue.imageUrl = ''
      this.ruleVlue.content = ''
      this.ruleVlue.markContent = ''
    },
    // 获取菜单
    menu() {
      this.getMenuList()
        .then(res => {
          if (!res.status) {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 查找文章
    getArticleList(query) {
      this.getArticle(query)
        .then(res => {
          if (!res.status) {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    //提交数据
    onConfirm() {
      const that = this
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.loading = true
          that.sendArticle(this.ruleVlue)
        } else {
          that.$message.error('必填项未填写')
        }
      })
    },
    // 发送请求
    sendArticle(das) {
      const that = this
      if (that.articleDialog.type == 'add') {
        that
          .addArticle(das)
          .then(res => {
            if (res.status) {
              that.$message.success('添加成功')
              that.loading = false
              that.clearInput()
              that.handleClose()
              that.getArticleList({ page: 1, pageSize: 10 })
            }
          })
          .catch(err => {
            that.loading = false
            that.$message.error(err)
          })
      } else {
        that
          .updatesArticle(das)
          .then(res => {
            if (res.status) {
              that.$message.success('修改成功')
              that.loading = false
              that.handleClose()
              that.getArticleList({ page: 1, pageSize: 10 })
            }
          })
          .catch(err => {
            that.loading = false
            that.$message.error(err)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.dialogArticle {
  .el-dialog {
    width: 800px;
  }
  .avaDiv {
    display: inline-block;
    margin: 4px 11px;
    .avtiveBorder {
      box-shadow: 1px 1px 4px #409eff;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .bannerImg {
    position: absolute;
    left: 0;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-upload-dragger {
    img {
      width: 100%;
    }
  }
  .el-textarea__inner {
    height: 120px;
    padding: 5px 45px 0 15px;
  }
  .v-note-panel {
    max-height: 400px;
  }
}
.v-note-help-wrapper {
  z-index: 3000 !important;
}
@media (max-width: 639px) {
  .dialogArticle {
    .el-dialog {
      width: 90%;
      margin-bottom: 10vh;
    }
    .el-upload-dragger,
    .avatar-uploader .el-upload {
      width: 100%;
    }
  }
}
</style>
