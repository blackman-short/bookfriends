<template>
  <el-row class="header">
    <el-col :xs="14" :sm="14" :offset="2" class="menu-title">
      <el-row>
        <el-col :xs="4" :sm="4"><router-link to="/" class="" title="首页">首页</router-link></el-col>
        <el-col :xs="4" :sm="4"><router-link to="" class="" title="资源">资源</router-link></el-col>
        <el-col :xs="4" :sm="4"><router-link to="" class="" title="服务">服务</router-link></el-col>
        <el-col :xs="4" :sm="4"><router-link to="" class="" title="活动">活动</router-link></el-col>
        <el-col :xs="4" :sm="4"><router-link to="" class="" title="专题">专题</router-link></el-col>
        <el-col :xs="4" :sm="4"><router-link to="" class="" title="关于我们">关于我们</router-link></el-col>
      </el-row>
    </el-col>

    <el-col :xs="1" :sm="1"  class="login-area">
      <el-row>
        <!-- <el-col :xs="6" :sm="6"><router-link to="" class="btn-xu icon" title="续借">续借</router-link></el-col>
        <el-col :xs="6" :sm="6"><router-link to="" class="btn-xu icon" title="资源通道">资源通道</router-link></el-col> -->
        <el-col :xs="6" :sm="6"><router-link to="/login" class="btn-login icon" title="登录">登录</router-link></el-col>
        <el-col :xs="6" :sm="6"><router-link to="/register" class="btn-register icon" title="注册">注册</router-link></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="stylus" scoped>
.header
  height 3.75rem /* 60/16 */
  background-color #FEFEFE
  border-bottom .0625rem /* 1/16 */ solid #BCBCBC
  .login-area
    padding-left 2.5rem /* 40/16 */
    width 23.75rem /* 380/16 */
    a
      display block
      min-width 4.375rem /* 70/16 */
      height 1.875rem /* 30/16 */
      text-align center
      color #7c808c
      font-size 1.125rem /* 18/16 */
      text-decoration none
      margin-top .9375rem /* 15/16 */
      margin-right .5rem /* 8/16 */
      float left
      cursor pointer
    .btn-login
      background-color #38B4E6
      border-radius .3125rem /* 5/16 */
      color #FFF
    .btn-register
      background-color #92D736
      border-radius .3125rem /* 5/16 */
      color #FFF
    .btn-xu
      border 1px solid #fff
      border-radius .3125rem /* 5/16 */
    .icon
      font-size 1.125rem /* 18/16 */
      line-height 1.875rem /* 30/16 */
  .menu-title
    text-align right
    a
      display block
      float left
      text-decoration none
      width 7.5rem /* 120/16 */
      font-size 1.125rem /* 18/16 */
      color #7c808c
      line-height 3.75rem /* 60/16 */
      text-align center
      cursor pointer
    a:hover
      color #0080ff

</style>
