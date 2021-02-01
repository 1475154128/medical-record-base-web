<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587603253120&di=013e91ce9d57edae2e5ac37952532851&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-4cca084f81687f3048032cfcfaaf08ab_hd.jpg"
             alt="" />
      </div>
      <h2 class="m-title">病案上报系统</h2>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef"
               :model="loginForm"
               :rules="loginFormRules"
               label-width="0px"
               class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="user">
          <el-input v-model="loginForm.username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import { setToken, setUser } from '@/utils/auth'
import * as api from './service'
export default {
  data () {
    return {
      loginForm: {
        username: 'cxg',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        user: [
          { required: true, message: '请输入登录名称', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码' },
          {
            min: 6,
            max: 250,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        const res = await api.login({
          username: this.loginForm.username,
          password: encrypt(this.loginForm.password)
        })
        if (res.data.state === 200) {
          const { token, tokenType } = res.data.data.token
          const { user } = res.data.data
          setToken(`${tokenType} ${token}`)
          setUser(user)
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-color: #2b4b6b;
  height: 100vh;
  .login-box {
    width: 450px;
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .m-title {
      color: #409eff;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 220px;
    }
    .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
