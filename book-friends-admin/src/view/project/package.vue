<template>
  <div class="package">
    <!-- <br> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding: 0px">
      <el-form-item label="图书分类">
        <!-- <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="文学" value="文学"></el-option>
          <el-option label="小说" value="小说"></el-option>
          <el-option label="科幻" value="科幻"></el-option>
          <el-option label="历史" value="历史"></el-option>
          <el-option label="其他" value="其他"></el-option>
          <el-option label="新增" value="新增"></el-option>
          <el-option label="Top" value="Top"></el-option>
        </el-select> -->
        <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          @change="handleSelect">
        </el-cascader>
      </el-form-item>
      <el-form-item label="图书名称">
        <el-input v-model="formInline.user" placeholder="请输入图书名称"></el-input>
      </el-form-item>
      <el-form-item label="ISBN">
         <el-input v-model="formInline.user" placeholder="请输入图书ISBN"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="onSubmit" title="搜索"></el-button>
      </el-form-item>
      <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit" title="添加图书"></el-button>
      <el-button type="danger" class="el-icon-delete" @click="batchDelete()" title="批量删除"></el-button>
      <el-button type="info" class="el-icon-caret-bottom" @click="download()" title="下载"></el-button>
    </el-form>

    <div class="content">
      <el-table  :data="tableData"
      style="width: 100%" max-height="400"
      row-key="isbn"
      @selection-change="handleSelectionChange"
      stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
           <div>
             <div style="float: left; width:15%">
               <img v-bind:src="scope.row.images.small" referrer="no-referrer|origin|unsafe-url" style="height:150px; width:100px"/>
             </div>
             <div style="float: left;width: 20%;height:120px">
               <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item>
                  <span style="font-size:25px">{{ scope.row.title }}</span>
                </el-form-item>
                <el-form-item label="出版商:">
                  <span>{{ scope.row.publisher }}</span>
                </el-form-item>
                <el-form-item label="出版时间:">
                  <span>{{ scope.row.pubdate }}</span>
                </el-form-item>
               </el-form>
             </div>

             <div style="float: left;width: 21%;height:120px">
               <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="翻译:">
                  <span>{{ scope.row.translator.length === 0? '无' : scope.row.translator.toString() }}</span>
                </el-form-item>
                <el-form-item label="电子书:">
                  <span>暂无数据</span>
                </el-form-item>
                <el-form-item label="关键词: ">
                  <span>{{ scope.row.tags[1].name + ',' +  scope.row.tags[2].name }}</span>
                </el-form-item>
               </el-form>
             </div>
             <div style="float: left;width: 42%;height:120px">
               <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="评分:">
                  <template>
                    <el-rate style="padding-top:6px;float:left"
                      v-model="scope.row.rating / 2"
                      disabled
                      text-color="#ff9900">
                    </el-rate> 
                    <label style="float:left; color:#F15A24; padding-left:10px">{{ scope.row.rating + '分' }}</label>
                  </template>
                </el-form-item>
                <el-form-item label="综述:">
                  <span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden; line-height:20px">{{scope.row.summary}}</span>
                </el-form-item>
               </el-form>
             </div>
           </div>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
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
            {{(scope.row.isActive.toString() === "true" || scope.row.isActive.toString() === "可用")? '可用':'不可用'}}
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
          <el-button type="primary" @click="saveEdit" :loading="editLoading">修改</el-button>
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
export default {
  name: 'package',
  data () {
    return {
      msg: '项目>套餐',
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
      options: [
        {
          value: 'category',
          label: '类型',
          children: [
            {
              value: '文学',
              label: '文学'
            },
            {
              value: '科幻',
              label: '科幻'
            },
            {
              value: '计算机',
              label: '计算机'
            }
          ]
        },
        {
          value: 'operations',
          label: '其他',
          children: [
            {
              value: 'TOP',
              label: '排行榜'
            },
            {
              value: 'NEW',
              label: '新增图书'
            }
          ]
        }
      ],
      selectedOptions: [],
      totalCount: 0,
      selectedISBNS: [],
      disBatchable: true // 批量删除
    }
  },
  // 实例化就获取数据
  mounted: async function () {
   await this.getBooks()
  },
  methods: {
    getBooks: async function () {
      const response = await API.getBooks(this.currentPage, this.pageSize)
      if (response.errorCode === 0) {
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
      
      this.form = Object.assign({}, row)
      this.form.author =  row.author.toString()
      this.form.ebookUrl = row.ebookUrl == false? '暂无数据' : row.ebookUrl,
      this.form.isActive = row.isActive === true? '可用': '不可用'
      this.table_index = index
    },

    // edit one book.
    saveEdit () {
      this.$confirm('确认提交修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
        this.editLoading = true// 显示正在修改，圆圈跑起来
        this.form.tags = JSON.stringify(this.form.tags)
        this.form.images = JSON.stringify(this.form.images)
        API.updateBook(this.form).then((response) => {
          if (response.errorCode === 0) {
            this.tableData[this.table_index] = this.form
            this.tableData.splice(this.table_index, 1, this.form)
            this.showSuccess()
            this.editLoading = false
            this.dialogFormVisible = false
          }
        }).catch (() => {
          this.showError('操作失败。。。请重试 !')
        })
        
      }).catch (() => {
        // Nothing to do.
        this.showError('操作失败。。。请重试 !')
      })
    },

    // adds one book.
    handleSaveadd () {
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
        // this.editLoading = true;//显示正在修改，圆圈跑起来
        let vm = this
        console.log(vm.form)
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
      this.$confirm('确认删除这本书？', '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const isbn = this.tableData[index].isbn
        API.deleteBook([isbn]).then((response) => {
          if (response && 0 === response.errorCode) {
            this.tableData.splice(index, 1)
            this.showSuccess()
          } else {
            this.showError('操作失败。。。请重试 !')
          }
        })        
      }).catch (() => {
        // Nothing to do.
        this.showError('操作失败。。。请重试 !')
      })
    },

    // 多选
    async handleSelectionChange (selections) {
      this.selectedISBNS = [] // clear one.
      if (selections && selections.length > 0) {
        this.disBatchable = false
        selections.forEach(s => {
          this.selectedISBNS.push(s.isbn)
        })
        console.log(this.selectedISBNS)
      } else {
        // Nothing to do.
      }
    },

    // batch delete books.
    async batchDelete () {
      if (this.selectedISBNS.length < 1) {
        this.showWarning('请勾选要删除的项。。。')
      } else {
        this.$confirm('确认删除已勾选的图书？', '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          API.deleteBook(this.selectedISBNS).then((response) => {
            if (response && 0 === response.errorCode) {
              this.getBooks().then(() => {
                this.showSuccess()
              })
            } else {
              this.showError('操作失败。。。请重试 !')
            }
          })        
        }).catch (() => {
          // Nothing to do.
        })
      }
    },

    download() {
      // console.log('download----')
      // this.downloadLoading = true
      // require.ensure([], () => {
      // const { export_json_to_excel } = require('../../global/Export2Excel')
      //   const tHeader = ['ISBN', '书名', '作者']
      //   const filterVal = ['isbn', 'title', 'author']
      //   const list = this.tableData
      //   const data = this.formatJson(filterVal, list)
      //   export_json_to_excel(tHeader, data, '列表excel')
      //   this.downloadLoading = false
      // })
    },

    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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

    handleSizeChange: async function (val) {
      this.pageSize = val
      await this.getBooks()
    },

    handleCurrentChange: async function (index) {
      this.currentPage = index
      await this.getBooks()
    },
    handleSelect (option) {
      console.log('---' + option)
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
