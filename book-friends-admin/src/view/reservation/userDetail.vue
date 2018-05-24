<template >
  <div class="Visdoctor">
    <div class="h-content" style="height:200px">
      <div class="content-right">
        <div v-if="1 > 2" class="content-right-bottom">
          <img src="../../assets/40.png" class="bells" style="margin-left: 40%;margin-top: 16%;" >
          <p style="margin-left: 45%;opacity: 0.6;">暂无统计信息</p>
        </div>
        <div class="echart">
          <div :style="{height:height,width:width,float:leftFloat}" ref="myEchart"></div> <!-- :style="{height:height2,width:width2,float:leftFloat,margin:marginLeft}" -->
          <div v-if="chartValues.showCity === 1" style="{height:300px,width:300px,float:left,margin:40px 0px 0px 20px,background-color:grey}"  ref="city">111</div>
        </div>
        <div style="float:left">
          <div v-if="chartValues.chart1 === 0" class="blockChart" :style="{height:height1,width:width1}" ref="chart1" @click="showThis('chart1')"></div>
          <div v-else class="blockChart selected" :style="{height:height1,width:width1}" ref="chart1" @click="showThis('chart1')"></div>
          <div v-if="chartValues.chart2 === 0" class="blockChart" :style="{height:height1,width:width1}" ref="chart2" @click="showThis('chart2')"></div>
          <div v-else class="blockChart selected" :style="{height:height1,width:width1}" ref="chart2" @click="showThis('chart2')"></div>
          <div v-if="chartValues.chart3 === 0" class="blockChart" :style="{height:height1,width:width1}" ref="chart3" @click="showThis('chart3')"></div>
          <div v-else class="blockChart selected" :style="{height:height1,width:width1}" ref="chart3" @click="showThis('chart3')"></div>
          <div v-if="chartValues.chart4 === 0" class="blockChart" :style="{height:height1,width:width1}" ref="chart4" @click="showThis('chart4')"></div>
          <div v-else class="blockChart selected" :style="{height:height1,width:width1}" ref="chart4" @click="showThis('chart4')"></div>
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
      chartValues: {
        chart1: 0,
        chart2: 0,
        chart3: 0,
        chart4: 0,
        showCity: 0
      },
      chartLegendNames: {
        chart1: [],
        chart2: [],
        chart3: [],
        chart4: [
          '1 ~ 20',
          '21 ~ 40',
          '41 ~ 60',
          '61 ~   '
        ]
      },
      chartOptions: {
        chart1: {
          title : {
              text: '书圈系统用户男女比例',
              subtext: '',
              x:'center',
              textStyle: {
                fontSize:8
              }
          },
          tooltip : {
              show: false,
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient : 'vertical',
              x : 'left',
              data:[],
          },
          calculable : true,
          series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                  {value:600, name:'文学'},
                  {value:100, name:'科技'},
                  {value:300, name:'计算机'}
                ],
                hoverAnimation:false,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    show: false
                  }
                }
            }
          ]
        },
        chart2: {
          title : {
              text: '书圈系统用户地区分析',
              subtext: '',
              x:'center',
              textStyle: {
                fontSize:8
              }
          },
          tooltip : {
              show: false,
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient : 'vertical',
              x : 'left',
              data:[],
          },
          calculable : true,
          series : [
              {
                  name:'访问来源',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                    {value:600, name:'文学'},
                    {value:100, name:'科技'},
                    {value:300, name:'计算机'}
                  ],
                  hoverAnimation:false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  label: {
                    normal: {
                      show: false
                    }
                  }
              }
          ]
        },
        chart3: {
          title : {
              text: '书圈系统用户学历分析',
              subtext: '',
              x:'center',
              textStyle: {
                fontSize:8
              }
          },
          tooltip : {
              show: false,
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient : 'vertical',
              x : 'left',
              data:[],
          },
          calculable : true,
          series : [
              {
                  name:'访问来源',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                      {value:600, name:'文学'},
                      {value:100, name:'科技'},
                      {value:300, name:'计算机'}
                  ],
                  hoverAnimation:false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  label: {
                    normal: {
                      show: false
                    }
                }
              }
          ]
        },
        chart4: {
          title : {
              text: '书圈系统用户年龄分析',
              subtext: '',
              x:'center',
              textStyle: {
                fontSize:8
              }
          },
          tooltip : {
              show: false,
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient : 'vertical',
              x : 'left',
              data:[],
          },
          calculable : true,
          series : [
              {
                  name:'访问来源',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                    {value:6, name:'1 ~ 20'},
                    {value:1, name:'21 ~ 40'},
                    {value:3, name:'41 ~ 60'}
                  ],
                  hoverAnimation:false,
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  label: {
                    normal: {
                      show: false
                    }
                }
              }
          ]
        },
        cityChart: {
          title : {
              text: '书圈系统用户男女比例',
              subtext: '',
              x:'center',
              textStyle: {
                fontSize:8
              }
          },
          tooltip : {
              show: false,
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient : 'vertical',
              x : 'left',
              data:[],
          },
          calculable : true,
          series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                  {value:600, name:'文学'},
                  {value:100, name:'科技'},
                  {value:300, name:'计算机'}
                ],
                hoverAnimation:false,
                labelLine: {
                  normal: {
                    show: false
                  }
                }
            }
          ]
        }
      },
      option: {
        title : {
            text: '书圈系统用户详情分析',
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
      cityChart: null
    }
  },

  methods: {
    initChart () {
      // 对图表进行初始化
      var vm = this
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption(this.option)

      // this.cityChart = echarts.init(this.$refs.city)
      

      this.chart.on('mouseover', function (params) {
        if (params.name.indexOf('省') > 0 || params.name.indexOf('市') > 0) {          
          // vm.cityChart.setOption(vm.chartOptions['chart1'])
          vm.chartValues.showCity = 1
        }
      })
      
      

      this.chart1 = echarts.init(this.$refs.chart1)
      this.chart1.setOption(this.chartOptions['chart1'])

      this.chart2 = echarts.init(this.$refs.chart2)
      this.chart2.setOption(this.chartOptions['chart2'])

      this.chart3 = echarts.init(this.$refs.chart3)
      this.chart3.setOption(this.chartOptions['chart3'])

      this.chart4 = echarts.init(this.$refs.chart4)
      this.chart4.setOption(this.chartOptions['chart4'])
      this.showThis ('chart1')
    },

    async initCityChart (provinceName) {
      this.cityChart = echarts.init(this.$refs.cityChart)
      this.cityChart.setOption(this.chartValues.cityChart)
    },

    // Toggles show items.
    showThis (refName) {
      for (var key in this.chartValues) {
        this.chartValues[key] = 0
      }
      this.chartValues[refName] = 1
      const selectedChart = this.chartOptions[refName]
      this.option.title.text = selectedChart.title.text
      this.option.series[0].data = selectedChart.series[0].data
      this.option.legend.data = this.chartLegendNames[refName]
      this.chart.setOption(this.option)
    },

    // number - int: 1 - chart1; 2 - chart2; 3 - chart3; 4 - chart4.
    convertCetainChartData (datas, number) {
      let names = []
      let valueNames = []
      let keyWord = 'sex'
      switch (number) {
        case 3:
          keyWord = 'education'
          break
        case 2:
          keyWord = 'province'
          break
        case 1:
          keyWord = 'sex'
          break
        default:
          break
      }
      
      for (let i in datas) {
        const d = datas[i]
        let n = d[keyWord]
        if (number === 1 && n !== null) {
          n = n === 0? '女' : '男'
        }

        n = n === null? '暂无数据' : n

        names.push(n)
        valueNames.push({
          value: d.number,
          name: n
        })
      }

      return {
        legendData: names,
        seriesData: valueNames
      }
    },

    // Gets chart group.
    async getChartGroup () {
      const response = await API.getChartGroup()
      
      if (response.errorCode === resultCode.SUCCESS) {
        const sexData = response.data.sex
        const provinceData = response.data.province
        const educationData = response.data.education
        // chart1.
        if (sexData) {
          const values = this.convertCetainChartData(sexData, 1)
          this.chartLegendNames['chart1'] = values.legendData
          this.chartOptions['chart1'].series[0].data = values.seriesData
          this.chart1 = echarts.init(this.$refs.chart1)
          this.chart1.setOption(this.chartOptions['chart1'])
        }

        // chart2.
        if (provinceData) {
          const values = this.convertCetainChartData(provinceData, 2)
          this.chartLegendNames['chart2'] = values.legendData
          this.chartOptions['chart2'].series[0].data = values.seriesData
          this.chart1 = echarts.init(this.$refs.chart2)
          this.chart1.setOption(this.chartOptions['chart2'])
        }

        // chart3.
        if (educationData) {
          const values = this.convertCetainChartData(educationData, 3)
          this.chartLegendNames['chart3'] = values.legendData
          this.chartOptions['chart3'].series[0].data = values.seriesData
          this.chart1 = echarts.init(this.$refs.chart3)
          this.chart1.setOption(this.chartOptions['chart3'])
        }

      } else {
        this.showError('加载数据失败, 请刷新。。。')
      }
    },

    // Gets city chart.
    async getCityChart (provinceName) {
      const respones = await API.getCityChart('')
      if (response.errorCode === resultCode.SUCCESS) {

      }
    }
  },

  async mounted () {
    await this.getChartGroup()
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
      default: '60%'
    },
    // 设置图表的高度
    height: {
      type: String,
      default: '400px'
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
    },
    // 设置图表的高度
    height2: {
      type: String,
      default: '200px'
    },
    marginLeft: {
      type: String,
      default: '0px 0px 0px 60px'
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
