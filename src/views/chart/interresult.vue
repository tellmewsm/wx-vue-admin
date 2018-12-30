<template>
 <div id="myChart" :style="{width: '1500px', height: '700px'}"></div>
</template>

<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
import 'echarts/theme/macarons.js'
// 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例 +定义主题第二个参数
      const myChart = echarts.init(document.getElementById('myChart'), 'macarons')
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })
    }
  }
}
</script>

