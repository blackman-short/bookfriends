<template>
  <div class="registration" >
    <!-- <br> -->
    <el-button class="filter-item" type="success" @click="handleCreate()">新增管理员</el-button>
    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" stripe>
        <el-table-column  label="序号"  width="100">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
        </el-table-column>
        <el-table-column  prop="adminName" label="管理员"  width="110"></el-table-column>
        <el-table-column  prop="realName" label="真实姓名"  width="100"></el-table-column>
        <el-table-column  prop="phoneNumber" label="手机号"  w160idth="100"></el-table-column>
        <el-table-column  prop="email" label="邮箱"  width="200"></el-table-column>
        <el-table-column  prop="loginAt" label="最近登录"  width="200"></el-table-column>
        <!-- <el-table-column  label="状态"  width="100" ></el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"  @click="handleEdit(scope.$index, scope.row)"> 编辑</el-button>
            <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 点击编辑出现的弹窗 -->
    <el-dialog title="修改管理员信息" v-model="dialogFormVisible" size="tiny" >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="管理员名">
          <el-input v-model="form.adminName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击添加项目出现的弹窗 -->
    <el-dialog title="新增管理员" v-model="dialogFormVisibleadd" size="tiny" >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="管理员名">
          <el-input v-model="form.adminName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSaveadd" :loading="editLoading">新增</el-button>
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
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>
<script >
  const API = require('../../services/getData').default
  export default {
    name: 'registration',
    data () {
      return {
        msg: '项目>挂号费',
        dialogFormVisible: false,
        dialogFormVisibleadd: false,
        editLoading: false, // 是否显示修改状态
        currentPage: 1,
        pageSize: 10,
        formInline: {
          user: '',
          region: '',
          state: ''
        },
        form: {
          adminName: '',
          realName: '',
          phoneNumber: '',
          email: '',
          loginAt: ''
        },
        tableData: [
          {
          adminName: '',
          realName: '',
          phoneNumber: '',
          email: '',
          loginAt: ''
          }
        ],
        totalCount: 0
      }
    },
    mounted: async function () {
      await this.getAdmins(1, 10)
    },
    methods: {
      getAdmins: async function () {
        const response = await API.getAdmins(this.currentPage, this.pageSize)
        if (response.errorCode === 0) {
          this.tableData = response.data.admins
          this.totalCount = response.data.totalCount
        } else {
          this.showWarning('加载失败。。。请重试 !')
        }
      },
      onSubmit () {
        this.$message('模拟数据，这个方法并不管用哦~')
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
          type: 'info'
        }).then(() => {
          this.editLoading = true// 显示正在修改，圆圈跑起来
          this.tableData[this.table_index] = this.form
          this.tableData.splice(this.table_index, 1, this.form)
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
        }).catch(() => {
          // Nothing to do.
        })
      },

      handleDelete (index, row) {
        this.tableData.splice(index, 1)
        this.$message({
          message: '操作成功！',
          type: 'success'
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
          relate: '',
          price: '',
          usestate: ''
        }
      },

      handleSizeChange: async function (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        await this.getAdmins()
      },

      handleCurrentChange: async function (index) {
        this.currentPage = index
        await this.getAdmins()
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.registration{
  padding: 20px;
}

.registration .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.registration .block{
  text-align: center;
}
.registration .center{
  text-align: center;
}

</style>
