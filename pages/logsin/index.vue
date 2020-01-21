<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="ruleForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h1 class="a11y-hidden">
        后台系统
      </h1>
      <el-form-item prop="username" class="el-username">
        <el-input
          ref="username"
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password" class="el-upassword">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="code" class="el-verifyCode">
        <el-input
          ref="verifyCode"
          v-model="ruleForm.code"
          placeholder="请输入验证码"
          name="verifyCode"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <div class="verifyCodeImg">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="img" @click="resetVerifyCode" v-html="verifyCode" />
        </div>
      </el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        class="loginSubmit"
        @click="handleLogin"
      >
        登录
      </el-button>
      <figure aria-hidden="true">
        <div class="person-body" />
        <div class="neck skin" />
        <div class="head skin">
          <div class="eyes" />
          <div class="mouth" />
        </div>
        <div class="hair" />
        <div class="ears" />
        <div class="shirt-1" />
        <div class="shirt-2" />
      </figure>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '../config/validate'
import { mapActions } from 'vuex'
import { setToken } from '@/utils/getToken'
// import { getNotSession } from '@/utils/storage'
export default {
  name: 'BackstageLogin',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名5-16位字符'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位数'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      codeTime: true,
      ruleForm: {
        username: 'admin',
        password: '1qaz2wsx',
        code: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password'
    }
  },
  computed: {
    verifyCode() {
      const code = this.$store.state.common.captchaCode
      return !code ? '' : code
    }
  },
  // asyncData(context) {
  //   console.log(context)
  // },
  mounted() {
    // if (!getNotSession('token')) {
    //   this.getVerifyCode()
    // } else {
    //   this.$router.push('/admin/home')
    // }
    this.getVerifyCode()
  },
  methods: {
    ...mapActions({
      code: 'common/verificaCode',
      login: 'common/login'
    }),
    // 登录
    handleLogin() {
      const that = this
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true
          that
            .login(that.ruleForm)
            .then(res => {
              that.loading = false
              if (res.status) {
                setToken(res.token)
                that.$router.push('/admin/home')
              }
            })
            .catch(err => {
              that.loading = false
              this.$message.error(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 刷新验证码
    resetVerifyCode() {
      const that = this
      if (that.codeTime) {
        that.codeTime = false
        this.getVerifyCode()
        setTimeout(() => {
          that.codeTime = true
        }, 3000)
      } else {
        this.$message.error('抱歉,您太心急了.')
      }
    },
    // 获取验证码
    getVerifyCode() {
      const that = this
      that
        .code()
        .then(res => {
          if (!res.status) {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import './login.scss';
</style>
