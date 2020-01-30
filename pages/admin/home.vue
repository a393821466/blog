<template>
  <section class="container">
    <div class="banner">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>快捷方式</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                操作按钮
              </el-button>
            </div>
            <div class="upload">
              <el-upload
                class="avatar-uploader"
                action="/admin/uploadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <!--eslint-disable-next-line vue/html-self-closing-->
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>待办事件</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                操作按钮
              </el-button>
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline" />
              </div>
              我的消息
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline" />
              </div>
              我的邮件
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline" />
              </div>
              备忘录
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline" />
              </div>
              我的邮件
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>网站配置</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                操作按钮
              </el-button>
            </div>
            <div v-for="o in 6" :key="o" class="text item">
              {{ '列表内容 ' }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>网站访问量</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                操作按钮
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>联系我</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                操作按钮
              </el-button>
            </div>
            <div>
              验证码
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
// import { mapActions } from 'vuex'
// import { getSession } from '@/utils/storage'
export default {
  layout: 'frame',
  data() {
    return {
      shortcuts: [],
      isCollapse: false,
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload() {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    }
  }
}
</script>
<style scoped lang="scss">
a {
  text-decoration-line: none;
  color: #000000;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.text {
  float: left;
  margin: 8px 6px;
  font-size: 14px;
  .del_shortcut {
    margin-right: 2px;
    color: red;
    font-size: 18px;
  }
  .icon-text {
    margin-bottom: 8px;
    text-align: center;
    width: 100%;
    i {
      font-size: 23px;
    }
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
</style>
