<template>
  <div class="setting">
    <el-form ref="ruleForm" :model="ruleVlue">
      <el-form-item label="网站标题" :label-width="formLabelWidth" prop="title">
        <el-input
          v-model="ruleVlue.title"
          auto-complete="off"
          placeholder="输入网站标题..."
          class="inputs"
        />
      </el-form-item>
      <el-form-item
        label="网站摘要"
        :label-width="formLabelWidth"
        prop="summary"
      >
        <el-input
          v-model="ruleVlue.summary"
          auto-complete="off"
          placeholder="输入网站摘要..."
          class="inputs"
        />
      </el-form-item>
      <el-form-item
        label="LOGO图标"
        :label-width="formLabelWidth"
        prop="logoImg"
      >
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            name="file"
            :action="logoUrl"
            :show-file-list="false"
            :headers="getToken"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!--eslint-disable-next-line vue/html-self-closing-->
            <img
              v-if="ruleVlue.logoImg"
              :src="ruleVlue.logoImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="LOGO文本" :label-width="formLabelWidth" prop="logo">
        <el-input
          v-model="ruleVlue.logo"
          auto-complete="off"
          placeholder="logo名字..."
          class="inputs"
        />
      </el-form-item>
      <el-form-item label="META" :label-width="formLabelWidth" prop="meta">
        <el-input
          v-model="ruleVlue.seo"
          type="textarea"
          class="inputs"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="meta信息元..."
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <div class="setting-footer">
          <el-button type="danger" @click="onReset">
            重置
          </el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click.prevent="onConfirm"
          >
            确 定
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import address from '@/utils/address.config'
import { getSession } from '@/utils/storage'
export default {
  name: 'Setting',
  layout: 'frame',
  data() {
    return {
      formLabelWidth: '100px',
      ruleVlue: {
        title: '',
        summary: '',
        logo: '',
        logoImg: '',
        seo: ''
      },
      logoUrl: address.system.logoUpload,
      loading: false
    }
  },
  computed: {
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
  mounted() {
    this.getBasicData()
  },
  methods: {
    // 提交网站数据
    async onConfirm() {
      this.loading = true
      const ret = await axios.post(address.system.addSystem, this.ruleVlue)
      if (ret.status) {
        this.loading = false
        this.$message.success('更新成功')
        this.getBasicData()
      } else {
        this.loading = false
        this.$message.success(ret)
      }
    },
    // 上传成功后
    handleAvatarSuccess(res) {
      if (res.status) {
        this.ruleVlue.logoImg = res.value
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
    // 重置
    onReset() {
      this.ruleVlue.title = ''
      this.ruleVlue.summary = ''
      this.ruleVlue.logo = ''
      this.ruleVlue.logoImg = ''
      this.ruleVlue.seo = ''
    },
    // 获取基础配置数据
    async getBasicData() {
      const getUserInfo = getSession('userInfo')
      let data = Qs.stringify({
        id: getUserInfo.id
      })
      const ret = await axios.get(`${address.system.getSystem}?${data}`)
      if (ret.status) {
        this.ruleVlue.title = ret.value.title
        this.ruleVlue.summary = ret.value.summary
        this.ruleVlue.logo = ret.value.logo
        this.ruleVlue.logoImg = ret.value.logoImg
        this.ruleVlue.seo = ret.value.seo
      }
    }
  }
}
</script>

<style lang="scss">
.setting {
  margin-top: 20px;
  .inputs {
    width: 400px;
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
