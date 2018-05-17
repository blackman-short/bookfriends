<template >
  <div class="liuContent">
    <div class="content-right" style="height:550px"  >
      <div class="content-right-bottom">
        <div v-if="!visitCounts">
          <img src="../../assets/40.png" class="bells" style="margin-left: 40%;margin-top: 16%;" >
          <p style="margin-left: 45%;opacity: 0.6;">暂无统计信息</p>
        </div>
        <div class="echart">
          <div :style="{height:height,width:width}" ref="myEchart"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import '../../assets/css/style1.css'
import echarts from 'echarts'
// npm i element-ui -S 等同于
// npm install element-ui --save
export default {
  name: 'home',
  data: function () {
    return {
      value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      formInline: {
        user: '',
        region: ''
      },
      visitCounts: null
    }
  },
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
    getData: function () {

    },
    initChart () {
      this.visitCounts = {
        months: ['4月', '5月', '6月'],
        counts: [3684, 7525, 5200]
      }
      // 对图表进行初始化
      this.chart = echarts.init(this.$refs.myEchart)

      // 把配置和数据放这里
      this.chart.setOption({
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
          data: ['4月', '5月', '6月'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'line',
          barWidth: '60%',
          data: [3684, 7525, 5200]
        }]
      })
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style>
  body {
    background-color: #F6F6F6;
  }

</style>
