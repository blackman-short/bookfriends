<template>
  <div class="top">
    <!-- <el-row> -->
    <div>
      <!-- <el-button class="barsBtn">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </el-button> -->
      <span class="font-time">今天&nbsp;{{ time.month }}&nbsp;月{{ time.day }}&nbsp;日&nbsp;&nbsp;{{ todos[time.Day] }}&nbsp;&nbsp;{{ time.hours }}:{{ time.minutes }}:{{time.seconds}}</span>
      <ul class="menu2">
        <li>
          <el-dropdown class="dropdown">
              <span class="el-dropdown-link dropdown-link">
                <i class="fa fa-user-o img">
                  <!-- <img src="../../assets/logo.png"> -->
                  <!-- class="fa fa-user-o" -->
                </i>
                <span>{{user.adminName}}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to='/home/personal' style="text-decoration:none;color:#666;">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <i class="fa fa-envelope-o" aria-hidden="true"></i>消息
        </li>
        <li>
          <i class="fa fa-question-circle" aria-hidden="true"></i>帮助
        </li>
        <li class="exit">
          <router-link to="/">
            <i class="fa fa-sign-in" aria-hidden="true"></i>退出
          </router-link>
        </li>
      </ul>
      </div>
    <!-- </el-row> -->
  </div>
</template>
<style type="text/css" scoped>
  .top{
    line-height: 50px;
    background: #fff;
  }
  /*三横导航按钮*/
  /*.top .barsBtn{
    border: 0;
    border-radius: 0;
    background: #f1f1f1;
    width: 50px;
    height: 50px;
  }*/

  /*时间*/
  .top .font-time{
    margin-left: 15px;
    float: left;
  }
  .top .font-time,.top .dropdown,.top .menu2 li{
    color: #666;
    font-size: 14px;
  }
  .top .menu2{
    text-align: center;
    float: right;
    margin-right:60px;
  }
  .top .menu2 li{
    display: inline-block;
    list-style: none;
    text-align: center;
    margin-left: 30px;
  }
  .top .menu2 .exit a{
    text-decoration: none;
    color: #666;
    font-size: 14px;
  }
  .top .menu2 li i{
    margin-right: 10px;
  }
  .top img{
    width: 30px;
    height: 30px;
    vertical-align: middle;   /*使得图片垂直居中*/
  }
  .top .dropdown-link{
    cursor: pointer;
  }
</style>
<script>
import store from '../../store'
export default {
  data () {
    return {
      user: store.state.userInfo,
      date: new Date(),
      todos: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  methods: {
    updateTime: function () {
      this.date = new Date()
    }
  },
  mounted () {
    var timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
  },
  computed: {
    time: function () {
      return {
          month: this.date.getMonth() + 1,
          day: this.date.getDate(),
          Day: this.date.getDay(),
          hours: this.date.getHours(),
          minutes: this.date.getMinutes(),
          seconds: this.date.getSeconds()
      }
    }
  }
}
</script>
