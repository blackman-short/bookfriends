<template>
  <div class="smallproject" >
    <!-- <br> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户分类">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="会员" value="会员"></el-option>
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="请输入姓名/手机"></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-select v-model="formInline.state" placeholder="请选择">
          <el-option label="在线" value="ture"></el-option>
          <el-option label="离线" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item>
      <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit" :disabled="true">添加</el-button>
    </el-form>

    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" stripe max-height="400" row-key="isbn">
        <el-table-column  label="序号"  width="100">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
        </el-table-column>
        <el-table-column  prop="phoneNumber" label="手机号"  width="150"></el-table-column>
        <el-table-column  prop="nickName" label="用户名"  width="150"></el-table-column>
        <el-table-column  prop="sex" label="性别"  width="100"></el-table-column>
        <el-table-column  prop="age" label="年龄(岁)"  width="100"></el-table-column>
        <el-table-column  prop="location" label="所在地"  width="150"></el-table-column>
        <el-table-column  prop="isActive" label="账号状态"  width="100"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 点击编辑出现的弹窗 -->
    <el-dialog title="修改用户信息" v-model="dialogFormVisible" size="tiny" >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input v-model="form.location" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="可用状态">
        <el-select v-model="form.isActive" placeholder="请选择">
          <el-option label="可用" value="可用"></el-option>
          <el-option label="不可用" value="不可用"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击添加项目出现的弹窗 -->
    <el-dialog title="添加用户" v-model="dialogFormVisibleadd" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="可用状态">
          <el-input v-model="form.isActive"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSaveadd" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisibleadd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script >
const API = require('../../services/getData').default
const userConvertor = require('../../global/objectConvert').userConvertor
export default {
  name: 'smallproject',
  data () {
    return {
      msg: '项目',
      dialogFormVisible: false,
      dialogFormVisibleadd: false,
      editLoading: false, // 是否显示修改状态
      currentPage: 1,
      pageSize: 10,
      activeIndex: '1',
      formInline: {
        user: '',
        region: '',
        state: ''
      },
      form: {
        phoneNumber: '',
        nickName: '',
        sex: '',
        age: '',
        location: '',
        isActive: ''
      },
      tableData: [{
        phoneNumber: '',
        nickName: '',
        sex: '',
        age: '',
        location: '',
        isActive: ''
      }],
      totalCount: 0
    }
  }, 
  // 实例化就获取数据
  mounted: async function () {
    await this.getUsers()
  },
  methods: {
    getUsers: async function () {
      const response = await API.getUsers(this.currentPage, this.pageSize)
      if (response.errorCode === 0) {
        const users = response.data.users
        this.tableData = userConvertor(users)
        this.totalCount = response.data.totalCount
      } else {
        this.showWarning('加载失败。。。请重试 !')
      }
    },
    onSubmit () {
      // this.$http.get(api.smallproject_search, {params: this.formInline}).then(function (response) {
      //   this.tableData = response.data.tableData
      // })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form = Object.assign({}, row)
      this.table_index = index
    },

    handleSave () {
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
        this.editLoading = true// 显示正在修改，圆圈跑起来
        this.tableData[this.table_index] = this.form
        this.tableData.splice(this.table_index, 1, this.form)
        API.updateUser()
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.editLoading = false
        this.dialogFormVisible = false
      }).catch (() => {
        // Nothing to do.
      })
    },

    handleSaveadd () {
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
        // this.editLoading = true;//显示正在修改，圆圈跑起来
        let vm = this
        vm.tableData.push(vm.form)
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.dialogFormVisibleadd = false
      }).catch (() => {
        // Nothing to do.
      })
    },

    handleDelete (index, row) {
      this.$confirm('确认删除该用户？', '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const phoneNumber = this.tableData[index].phoneNumber
        API.deleteUser(phoneNumber).then((response) => {
          if (response && 0 === response.errorCode) {
          this.tableData.splice(index, 1)
          this.showSuccess()
        } else {
          this.showError('操作失败。。。请重试 !')
        }
        })        
      }).catch (() => {
        // Nothing to do.
      })
    },

    handleCreate () {
      this.initform()// //每次都初始化
      this.dialogFormVisibleadd = true
    },

    // 每次都初始化为空
    initform () {
      this.form = {
        style: '',
        name: '',
        company: '',
        price: '',
        department: '',
        usestate: ''
      }
    },

    handleSizeChange: async function (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      await this.getUsers()
    },

    handleCurrentChange: async function (index) {
      this.currentPage = index
      await this.getUsers()
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.smallproject{
  padding: 20px;
}

.smallproject .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.smallproject .block{
  text-align: center;
}
.smallproject .center{
  text-align: center;
}

</style>
