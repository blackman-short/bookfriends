<template>
  <div class="package">
    <!-- <br> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="图书分类">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="文学" value="文学"></el-option>
          <el-option label="小说" value="小说"></el-option>
          <el-option label="科幻" value="科幻"></el-option>
          <el-option label="历史" value="历史"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图书名称">
        <el-input v-model="formInline.user" placeholder="请输入图书名称"></el-input>
      </el-form-item>
      <el-form-item label="ISBN">
         <el-input v-model="formInline.user" placeholder="请输入图书ISBN"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item>
      <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">添加图书</el-button>
    </el-form>

    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" max-height="400" stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
           <div>
             <div style="float: left; width:15%">
               <img v-bind:src="scope.row.images.small" referrer="no-referrer|origin|unsafe-url" style="height:120px; width:80px"/>
             </div>
             <div style="float: left;width: 30%;height:120px">
              <div><label>出版社</label>{{scope.row.publisher}}</div>
              <div><label>出版时间</label>{{scope.row.pubdate}}</div>
              <div>
                <label>当前评分</label>
                <el-rate
                  v-model="scope.row.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                  >
                </el-rate>
              </div>
             </div>
           </div>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column  label="序号"  width="55" style="display:none">
          <template slot-scope="scope">{{scope.$index}}</template>
        </el-table-column> -->
        
        <el-table-column  prop="title" label="书名"  width="150"></el-table-column>
        <el-table-column  prop="isbn" label="ISBN"  width="150"></el-table-column>
        <el-table-column  prop="price" label="单价(元)"  width="100"></el-table-column>
        <el-table-column label="作者"  width="200">
          <template slot-scope="scope">
            {{scope.row.author.toString()}}
          </template>
        </el-table-column>
        <el-table-column  label="可用状态"  width="100">
          <template slot-scope="scope">
            {{scope.row.isActive===true? '可用' : '不可用'}}
          </template>
        </el-table-column>

        <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
      </el-table>
    </div>
    <!-- 点击编辑出现的弹窗 -->
    <el-dialog title="修改图书信息" v-model="dialogFormVisible" size="tiny" >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="电子书网址">
          <el-input v-model="form.ebookUrl"></el-input>
        </el-form-item>
        <el-form-item label="可用状态">
        <el-select v-model="form.isActive" placeholder="请选择">
          <el-option label="可用" value="true"></el-option>
          <el-option label="不可用" value="false"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击添加项目出现的弹窗 -->
    <el-dialog title="添加图书信息" v-model="dialogFormVisibleadd" size="tiny">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn"></el-input>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="电子书地址">
          <el-input v-model="form.ebookUrl"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-input v-model="form.usestate"></el-input>
        </el-form-item>
        <el-form-item>
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
        :current-page="currentPage1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script >
const API = require('../../services/getData').default
export default {
  name: 'package',
  data () {
    return {
      msg: '项目>套餐',
      dialogFormVisible: false,
      dialogFormVisibleadd: false,
      editLoading: false, // 是否显示修改状态
      currentPage1: 1,
      activeIndex: '1',
      formInline: {
        user: '',
        region: '',
        state: ''
      },
      form: {
        isbn: '',
        title: '',
        author: '',
        price: '',
        ebookUrl: '',
        isActive: ''
      },
      tableData: [{
        isbn: '',
        title: '',
        author: '',
        price: '',
        ebookUrl: '',
        isActive: ''
      }],
      totalCount: 0,
      rating: 2
    }
  },
  // 实例化就获取数据
  mounted: async function () {
    // this.$http.get(api.package).then(function (response) {
    //   this.tableData = response.data.tableData
    // })
   await this.getBooks(1)
  },
  methods: {
    getBooks: async function (index) {
      const response = await API.getBooks(index)
      if (response.errorCode === 0) {
        console.log(response.data.books)
        this.tableData = []
        this.tableData = response.data.books
        this.totalCount = response.data.totalCount
      }
    },
    onSubmit () {
      // this.$http.get(api.package_search, {params: this.formInline}).then(function (response) {
      //   this.tableData = response.data.tableData
      // })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      console.log(row)
      row.isActive = row.isActive === true? '可用': '不可用'
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
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.editLoading = false
        this.dialogFormVisible = false
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
        name: '',
        relate: '',
        price: '',
        department: '',
        usestate: ''
      }
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },

    handleCurrentChange: async function (index) {
      console.log(`当前页: ${index}`)
      await this.getBooks(index)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.package{
  padding: 20px;
}

.package .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.package .block{
  text-align: center;
}
.package .center{
  text-align: center;
}

</style>
