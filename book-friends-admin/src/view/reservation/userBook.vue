<template >
  <div class="Visdoctor">
    <div class="h-content" style="height:200px">
      <div class="content-right">
        <div v-if="1 > 2" class="content-right-bottom">
          <img src="../../assets/40.png" class="bells" style="margin-left: 40%;margin-top: 16%;" >
          <p style="margin-left: 45%;opacity: 0.6;">暂无统计信息</p>
        </div>
        <div class="echart">
          <div :style="{height:height,width:width}" ref="myEchart"></div>
          <div style='margin: 20px 0px 0px 0px;background-color:#F6F6F6;height:10px;width:900px'>&nbsp;</div>
          <div :style="{height:height,width:width}" ref="myEchart1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import '../../assets/css/style1.css'
import {api} from '../../global/api'
const API = require('../../services/getData').default
const resultCode = require('../../global/resultCode').default

export default {
  name: 'home',
  data: function () {
    return {
      value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      formInline: {
        user: '',
        region: ''
      },
      
      option1: {
        title : {
            text: '书架类别详情分析',
            subtext: '',
            x:'center',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['文学','科技','计算机']
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
                  {value:600, name:'文学'},
                  {value:100, name:'科技'},
                  {value:300, name:'计算机'}
                ]
            }
        ]
      },
      option2: {
        title : {
            text: '书架用户年龄分析',
            subtext: '',
            x:'center',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['文学','科技','计算机']
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
                  {value:600, name:'文学'},
                  {value:100, name:'科技'},
                  {value:300, name:'计算机'}
                ]
            }
        ]
      },
    }
  },

  methods: {
    initChart: async function () {
      // 对图表进行初始化
      const res1 = await API.chartTagsOfUserBokks()
      if (res1 && res1.errorCode === resultCode.SUCCESS) {
        this.option1.series[0].data = res1.data.values
        this.option1.legend.data = res1.data.labels
      }

      const res2 = await API.chartUserBook()
      if (res2 && res2.errorCode === resultCode.SUCCESS) {
        
        let labels = []
        let values = []
        const json = res2.data
        for (let key in json) {
         if(json[key] > 0) {
            labels.push(key)
            values.push({
              value:json[key],
              name: key
            })
         }
        }

        this.option2.series[0].data = values
        this.option2.legend.data = labels
      }

      var vm = this
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption(this.option1)
      this.chart = echarts.init(this.$refs.myEchart1)
      this.chart.setOption(this.option2)
    }
  },

  async mounted () {
    this.initChart()
  },
   // 图表部分
  // props接收父组件的数据
  props: {
    leftFloat: {
      type: String,
      default: 'left'
    },
    // 设置图表的宽度
    width: {
      type: String,
      default: '100%'
    },
    // 设置图表的高度
    height: {
      type: String,
      default: '350px'
    },
    // 设置图表的宽度
    width1: {
      type: String,
      default: '100px'
    },
    // 设置图表的高度
    height1: {
      type: String,
      default: '100px'
    },
    // 设置图表的宽度
    width2: {
      type: String,
      default: '200px'
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null

    if (!this.chart1) {
      return
    }
    this.chart1.dispose()
    this.chart1 = null

    if (!this.chart2) {
      return
    }
    this.chart2.dispose()
    this.chart2 = null

    if (!this.chart3) {
      return
    }
    this.chart3.dispose()
    this.chart3 = null

    if (!this.chart4) {
      return
    }
    this.chart4.dispose()
    this.chart4 = null
  },

}
</script>

<style>
  body {
    /*background-color: #333;*/
    background-color: #F6F6F6;
  }
  .echart {
    height: 400px;
    width: 800px
  }
  .content-right{
    width:100%
  }
  .blockChart {
    float:left;
    background-color:#F5FDFF;
    width:100px;
    height:100px;
    margin-left: 15px;
    border:1px solid;
    border-color: #A8A8A8;
    cursor: hand;
  }

  .unselected {
    border-color:#A8A8A8
  }

  .selected {
    border-color:#409EFF
  }
</style>
