<template>
  <div class="smallhome">
    <div class="todayReservation">
      <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column prop="bookName" label="阅读Top"></el-table-column>
          <el-table-column prop="readCount" label="" width="100"></el-table-column>
          <el-table-column label="" width="200">
            <template slot-scope="scope">
              <el-rate style="float:left"
                v-model="scope.row.rating / 2"
                disabled
                text-color="#ff9900">
              </el-rate> 
              <label style="float:left; color:#F15A24; padding-left:10px">{{ scope.row.rating + '分' }}</label>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i v-if="scope.row.riseCount > 0" class="fa fa-arrow-up icon" aria-hidden="true">  {{scope.row.riseCount}}</i>
              <i v-else-if="scope.row.riseCount == 0"  class="fa fa-minus icon" ria-hidden="true">  {{scope.row.riseCount}}</i>
              <i v-else class="fa fa-arrow-down icon" aria-hidden="true">  {{scope.row.riseCount - 2 * scope.row.riseCount}}</i>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="todayArrange">
      <p v-if="newAddedBooks.length === 0" class="title">
        <span class="arr">今日新增</span>
        <!-- <router-link to="/home/arrange">
          <span class="more">更多</span>
        </router-link> -->
      </p>
      <div v-if="newAddedBooks.length === 0" class="content">
        <img src="../../assets/40.png" class="bells" style="margin-left: 35%;width:80px" >
        <p style="margin-left: 30%;opacity: 0.6;background-color: white">今日暂无新增图书</p>
      </div>
      <el-table v-if="newAddedBooks.length > 0" :data="newAddedBooks" style="width: 100%; text-align:center" stripe>
        <el-table-column label="今日新增">
          <template slot-scope="scope">
            <i class="fa fa-plus icon" aria-hidden="true"></i>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" width="120"></el-table-column>
        <el-table-column prop="createAt" width="180"></el-table-column>
      </el-table>
    </div>

    <div class="echart">
      <p>上周看书数统计</p>
      <div :style="{height:height,width:width}" ref="myEchart"></div>
    </div>
    <div class="news">
      <p v-if="dynamicData.length === 0">
        <span class="new">最新动态</span>
        <!-- <span class="more">更多</span> -->
      </p>
      <div v-if="dynamicData.length === 0 && loadDynamics === false" class="content" style="margin-top:20%">
        <img src="../../assets/40.png" class="bells" style="margin-left: 25%;width:200px" >
        <p style="margin-left: 30%;opacity: 0.3; background-color:white; font-size:30px">暂无最新动态</p>
      </div>
      <el-table v-if="dynamicData.length > 0"
         :data="dynamicData"
         stripe
         max-height="500"
         v-loading="loadDynamics">
        <el-table-column label="用户动态">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span>{{scope.row.bookName}}</span>
          </template>
        </el-table-column>
        <el-table-column >
          <template slot-scope="scope">
            <span style="font-size:4px"> 今天  {{scope.row.createTime.substring(11)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style type="text/css" scoped>
    .smallhome .todayReservation{
      margin-left:15px;
      text-align: center;
      float: left;
      width: 50%;
    }
    .smallhome .todayReservation .title {
      line-height: 40px;
      background-color: #eef1f6;
      width: 50%;
    }
    .smallhome .todayReservation p{
      font-size: 18px;
      line-height: 60px;
    }
    .smallhome .todayReservation a{
        text-decoration: none;
        color: #3398DB;
    }
    .smallhome .todayReservation a:hover,.smallhome .todayReservation a:active{
       color: red;
    }
    .smallhome .todayArrange{
      margin-left: 15px;
      border: 1px solid #dfe6ec;
      float: left;
      width: 38%;
      background: #fff;
    }
    .smallhome .todayArrange .title{
      line-height: 40px;
      background-color: #eef1f6;
    }
    .smallhome .todayArrange .title .arr,
    .smallhome .news .new{
      font-size: 14px;
      color:#1f2d3d;
      padding-left: 18px;
      padding-right: 18px;
      font-weight: bold;
    }
    .smallhome .todayArrange .title .more,
    .smallhome .news .more{
      font-size: 14px;
      color:#3398DB;
      padding-right: 30px;
      float: right;
    }
    .smallhome .todayArrange .content{
      height: 117px;
    }
    .smallhome .todayArrange .todayArrange-content{
      line-height: 30px;
      padding-left: 18px;
      padding-right: 18px;
      font-size: 14px;
      color:#10181f;
      border-bottom: 1px solid #dfe6ec;
    }
    .smallhome .echart{
      clear: both;
      margin-left: 15px;
      background: #fff;
      width: 49.9%;
      overflow: hidden;
      border: 1px solid #dfe6ec;
      position: relative;
      top: 15px;
      float: left;
    }
    .smallhome .echart p{
      font-size: 14px;
      font-weight: bold;
      color:#1f2d3d;
      width: 100%;
      line-height: 40px;
      background-color: #eef1f6;
      padding-left: 15px;
    }
    .smallhome .news{
      float: left;
      margin-left: 15px;
      margin-top: 15px;
      background: #fff;
      width: 38%;
      height: 540px;
      border: 1px solid #dfe6ec;
    }
    .smallhome .news p{
      line-height: 40px;
      background-color: #eef1f6;
    }
    .fa-arrow-up {
      color: #CD3700
    }
    .fa-arrow-down {
      color: #228B22
    }
    .fa-minus {
      color:#E6A23C
    }
    .fa-plus {
      color: #409EFF
    }
</style>
<script>
import echarts from 'echarts'
import store from '../../store'
import {api} from '../../global/api'
const API = require('../../services/getData').default
const dynamicConvertor = require('../../global/objectConvert').dynamicConvertor
const resultCode = require('../../global/resultCode').default
export default {
  data () {
    return {
      newAddedBooks: [], // 新增的图书列表
      tableData: [], // 阅读Top榜
      dynamicData: [], //用户最新动态
      visitOption: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            // 鼠标悬浮在柱上的效果
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 图表的位置
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          data: [50, 32, 100, 300, 190, 58, 350]
        }]
      },
      dataArrange: store.state.weeks_content,
      loadDynamics: true
    }
  },
  mounted: async function () {
    this.$http.get(api.testData).then(function (response) {
      this.newAddedBooks = response.data.newAdded
    })
    this.initVisitRecord() // 初始化图表。
    this.initTableData() // 初始化Top榜信息。
    this.initDynamicInfos() // 初始化最新用户动态信息。
  },

  // 图表部分
  // props接收父组件的数据
  props: {
    // 设置图表的宽度
    width: {
      type: String,
      default: '500px'
    },
    // 设置图表的高度
    height: {
      type: String,
      default: '500px'
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initTableData: async function () {
      const response = await API.getTop3()
      if (response && response.errorCode === resultCode.SUCCESS) {
        const books = response.data
        if (books && books.length > 0) {
          let resetData = []
          books.forEach(b => {
            resetData.push({
              bookName: b.title,
              readCount: b.visitCount + ' 次',
              rating: b.rating,
              riseCount: b.previousRanking - b.lastestRanking
            })
          })

          this.tableData = resetData
        }
      }
    },
    initDynamicInfos: async function () {
      this.loadDynamics = true
      const response = await API.getAllDynamics()
      if (response.errorCode === resultCode.SUCCESS) {
        this.dynamicData = response.data
      }
      this.loadDynamics = false
    },
    initVisitRecord: async function () {
      const response = await API.getWeekVisit()
      if (response.errorCode === resultCode.SUCCESS) {
        const chartData = response.data
        let xData = []
        let yData = []
        if (chartData) {
          chartData.forEach((c, i) => {
            if ( i === (chartData.length -1 )) {
              xData.push('今天')
            } else {
              xData.push(c.visitAt)
            }

            yData.push(c.visitCount)
          })
        }
        this.visitOption.xAxis[0].data = xData
        this.visitOption.series[0].data = yData
        // 对图表进行初始化
        this.chart = echarts.init(this.$refs.myEchart)

        // 把配置和数据放这里
        this.chart.setOption(this.visitOption)
      } else {
        this.showError('加载一周访问量数据失, 请重试。。。')
      }
    }
  }

}
</script>

<style scoped>

</style>
