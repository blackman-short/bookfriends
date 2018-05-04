<template >
  <div class="Visdoctor">
    <div class="h-content">
      <div class="content-right"  >
        <div v-if="1 > 2" class="content-right-bottom">
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
import echarts from 'echarts'
import '../../assets/css/style1.css'
import {api} from '../../global/api'

export default {
  name: 'home',
  data: function () {
    return {
      value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      formInline: {
        user: '',
        region: ''
      },

      tableData: null

    }
  },

  methods: {
    initChart () {
    const option = {
      title : {
          text: '书圈系统图书分类',
          subtext: '',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient : 'vertical',
          x : 'left',
          data:['历史文学','休闲娱乐','科幻科技','计算机技术','少儿读物']
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                  show: true, 
                  type: ['pie', 'funnel'],
                  option: {
                      funnel: {
                          x: '25%',
                          width: '50%',
                          funnelAlign: 'left',
                          max: 1548
                      }
                  }
              },
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      series : [
          {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'历史文学'},
                  {value:310, name:'休闲娱乐'},
                  {value:234, name:'科幻科技'},
                  {value:135, name:'计算机技术'},
                  {value:1548, name:'少儿读物'}
              ]
          }
      ]
    };
      // 对图表进行初始化
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption(option)
    },
    getData: function () {
      // 这里可以写ajax方法
      // let me = this
      this.$http.get(api.testData).then(function (response) {
        // alert(0)
        console.log(response)
        console.log('这是我们需要的json数据', response.data)
        this.tableData = response.data
      }, function (response) {
        alert('请求失败了')
      })
    },
    // 点击取消
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
    }
  },

  mounted () {
    this.getData()
    this.initChart()
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

}
</script>

<style>
  body{
    /*background-color: #333;*/
    background-color: #F6F6F6;
  }
  /* .Visdoctor .name-span span{
    margin-left: 25px;
  }
  .Visdoctor .name-wrapper{
    text-align: left;
  }
  .Visdoctor .phone-s{
    width: 175px;
  } */
</style>
