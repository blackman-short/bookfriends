<template>
  <div class="project" >

  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/home/project/smallproject">
      <el-menu-item index="1">用户</el-menu-item>
      </router-link>
    <router-link to="/home/project/package">
      <el-menu-item index="2">图书</el-menu-item>
      </router-link>
    <router-link to="/home/project/registration">
      <el-menu-item index="3">管理员</el-menu-item>
      </router-link>
  </el-menu> 
  <router-view ></router-view>
  </div>
</template>
<script >

export default {
  name: 'project',
  data () {
    return {
      msg: '项目',
      activeIndex: '1',
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project{

}

</style>
