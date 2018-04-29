<template>
  <div class="login">
    <div class="login-container">
      <el-form :model="loginForm"  ref="loginForm" class="card-box login-form">
          <h1 class="title">书圈系统</h1>
          <el-form-item prop="userName" class="item userItem">
              <span class="svg-container">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </span>
              <el-input name="userName" type="text" v-model="loginForm.userName"  placeholder="用户名" class="input-content"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
              <span class="svg-container">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
              <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="密码" class="input-content"></el-input>
          </el-form-item>
          <el-form-item>
            测试账号：1111/vuex  密码：123456
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="handleLogin">
                  登录
              </el-button>
              <el-button type="primary">
                  <router-link to="/register">注册</router-link>
              </el-button>
          </el-form-item>
      </el-form>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  .login .login-container{
    position: relative;
    width: 500px;
    height: 350px;
    margin: 15% auto;
    background: #fff;
    text-align: center;
    border-radius: 5px;
  }
  .login .login-container .title{
    position: relative;
    top: 30px;
    font-family: "华文行楷"
  }
  .login .login-container .userItem{
    margin-top: 50px;

  }
  .login .login-container .item .svg-container{
    display: inline-block;
    width: 40px;
    text-align: center;
    color: #889aa4;
    font-size: 20px;
  }
  .login .login-container .item .input-content{
    display: inline-block;
    height: 47px;
      width: 55%;
  }
  .login .login-container a{
    color: #fff;
    text-decoration: none;
  }
</style>
<script>
import Hello from '@/view/home_content/hello'
import store from './../store'
const validator = require('validator')
import Vue from 'vue'
const login = require('../services/getData').default.login
const resultCode = require('../resultCode').default
export default{
  data () {
    
    return {
      loginForm: store.state.userInfo,
    }
  },
  methods: {
    handleLogin: async function () {
      const userName = this.loginForm.userName
      const password = this.loginForm.password
      if (!userName || !validator.trim(userName)) {
        this.showError('请输入用户名')
      } else if (!password || !validator.trim(password)) {
        this.showError('请输入密码')
      } else {
        // Call server to validates the account.
        const res = await login(userName, password)
        if (res.errorCode === resultCode.SUCCESS) {
          store.state.userInfo = res.data
          this.$router.push('/home/hello')
        } else {
          this.showError('用户名或密码错误!')
        }
        
      }
    }
  },
  mounted: function () {
    console.log('stor内容', store.state.userInfo)
  }
}
</script>
