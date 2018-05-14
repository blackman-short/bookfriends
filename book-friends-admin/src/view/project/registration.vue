<template>
  <div class="registration" >
    <!-- <br> -->
    <el-button class="filter-item" type="success" @click="handleCreate()">新增管理员</el-button>
    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" stripe>
        <el-table-column  label="序号"  width="100">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.$index + 1}}</label>
            <label v-else>{{scope.$index + 1}}</label>
          </template>
        </el-table-column>
        <el-table-column label="管理员"  width="110">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.row.adminName}}</label>
            <label v-else>{{scope.row.adminName}}</label>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名"  width="100">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.row.realName}}</label>
            <label v-else>{{scope.row.realName}}</label>
          </template>
        </el-table-column>
        <el-table-column label="手机号"  w160idth="100">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.row.phoneNumber}}</label>
            <label v-else>{{scope.row.phoneNumber}}</label>
          </template>
        </el-table-column>
        <el-table-column label="邮箱"  width="200">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.row.email}}</label>
            <label v-else>{{scope.row.email}}</label>
          </template>
        </el-table-column>
        <el-table-column  label="最近登录"  width="200">
          <template slot-scope="scope">
            <label class="admin-color" v-if="currentAdmin === scope.row.phoneNumber">{{scope.row.loginAt == null? '暂未登录' :  scope.row.loginAt}}</label>
            <label v-else>{{scope.row.loginAt == null? '暂未登录' :  scope.row.loginAt}}</label>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="currentAdmin === scope.row.phoneNumber" size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)" disabled>删除</el-button>
            <el-button v-else size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          <el-button @click="dialogFormVisible = false; editLoading=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击添加项目出现的弹窗 -->
    <el-dialog title="新增管理员" v-model="dialogFormVisibleadd" size="tiny" >
      <el-form ref="form" :model="form" status-icon="true" :rules="rules" label-width="100px">
        <el-form-item label="管理员名" prop="adminName">
          <el-input v-model="form.adminName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSaveadd('form')" :loading="editLoading">新增</el-button>
          <el-button @click="cancelAdd('form')">取消</el-button>
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
  const validator = require('validator')
  const resultCode = require('../../global/resultCode').default
  export default {
    name: 'registration',
    data () {

      const validateAdminName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入管理员用户名'))
        } else {
          if (value.length >= 2 && value.length <= 6) {
            callback()
          } else {
            callback(new Error('长度在2到6个字符之间'))
          }
        }
      }
      const validateRealName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入真实姓名'))
        } else {
          if (value.length >= 2 && value.length <= 4) {
            callback()
          } else {
            callback(new Error('长度在2到4个字符之间'))
          }
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入电话号码'))
        } else {
          var reg1 = /^1[3|4|5|8][0-9]\d{4,8}$/
          if (!reg1.test(value)) {
            callback(new Error('请输入正确的手机号码'))
          } else {
            callback()
          }
        }
      }
      const validateMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系邮箱'))
        } else {
          var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if (!reg.test(value)) {
            callback(new Error('输入的联系邮箱必须包含@'))
          } else {
            callback()
          }
        }
      }

      return {
        msg: '项目>挂号费',
        dialogFormVisible: false,
        dialogFormVisibleadd: false,
        editLoading: false, // 是否显示修改状态
        currentPage: 1,
        pageSize: 10,
        currentAdmin: '18206296760',
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
        totalCount: 0,
        // 表单验证规则.
        rules: {
          adminName: [
            { validator: validateAdminName, trigger: 'blur', required: true }
          ],
          realName: [
            { validator: validateRealName, trigger: 'blur', required: true }
          ],
          phoneNumber: [
            { validator: validatePhone, trigger: 'blur', required: true }
          ],
          email: [
            { validator: validateMail, trigger: 'blur', required: true }
          ]
        }
      }
    },
    mounted: async function () {
      await this.getAdmins()
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
        this.$confirm('确认提交修改吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.editLoading = true// 显示正在修改，圆圈跑起来
          console.log(this.form)
          API.updateAdmin(this.form).then((res) => {
            if (res.errorCode === resultCode.SUCCESS) {
              this.tableData[this.table_index] = this.form
              this.tableData.splice(this.table_index, 1, this.form)
              this.showSuccess()
              this.editLoading = false
              this.dialogFormVisible = false
            } else if (res.errorCode === resultCode.ERROR_USER_HASEXISTED) {
              this.showWarning('该手机号已存在')
            } else {
              this.showWarning('更新失败, 请重试。。。')
              this.editLoading = false
              this.dialogFormVisible = false
            }
          })
        
        }).catch (() => {
          // Nothing to do.
        })
      },

      // Adds one admin.
      handleSaveadd (formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            if (!validator.trim(vm.form.adminName) || !validator.trim(vm.form.realName) ||
                !validator.trim(vm.form.phoneNumber || !validator.trim(vm.form.email))) {
              this.showWarning('所填写必选项(*)不能为空字符串。。。')
              return
            }

            this.$confirm('确认提交吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'cancel'
            }).then(() => {
              this.editLoading = true;//显示正在修改，圆圈跑起来
              const defaultPWD = '123456'

              API.register(vm.form.realName, vm.form.adminName, defaultPWD, vm.form.phoneNumber, vm.form.email).then((res) => {
                if (res.errorCode === resultCode.SUCCESS) {
                  vm.tableData.push(vm.form)
                  this.showSuccess()
                  this.dialogFormVisibleadd = false
                  this.editLoading = false
                } else if (res.errorCode === resultCode.ERROR_USER_HASEXISTED) {
                  this.showWarning('该手机号已被注册。。。')
                }else {
                  this.showError('添加管理员失败, 请稍后重试。。。')
                }
              })
            }).catch(() => {
              // Nothing to do.
            })
          }
        })
      },

      cancelAdd (formName) {
        this.dialogFormVisibleadd = false
        this.editLoading = false
        this.$refs[formName].resetFields()
      },

      handleDelete: async function (index, row) {
        const response = await API.deleteAdmin(row.id)
        if (response.errorCode === resultCode.SUCCESS) {
          this.tableData.splice(index, 1)
          this.showSuccess('删除成功!', 'delete')
        } else {
          this.showWarning('删除失败, 请重试。。。')
        }
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
.admin-color {
  color: #67C23A
}

</style>
