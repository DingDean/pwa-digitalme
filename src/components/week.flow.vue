<template>
<section class='terminal'>
  <h2 class='terminal-title' style='text-align:left'>一周时间分布</h2>
  <v-chart
    class='terminal-chart'
    height='300' :data='flows' :scale='scale'>
    <v-coord type='rect' direction='LB'/>
    <v-axis dataKey='range' title='true'/>
    <v-axis dataKey='date' title='true'/>
    <v-tooltip title='date'/>
    <v-legend dataKey='filetype'/>
    <v-bar position='date*range' color='filetype'
           tooltip='filetype'/>
  </v-chart>
</section>
</template>

<script>
const DataSet = require('@antv/data-set')
export default {
  data () {
    return {
      scale: [{
        dataKey: 'date',
        type: 'timeCat',
        mask: 'MM-DD',
        nice: true,
        alias: '日期'
      }, {
        dataKey: 'range',
        type: 'linear',
        nice: true,
        min: 0,
        max: 24 * 60 * 60000,
        alias: '时间',
        tickInterval: 14400000,
        formatter: (millis) => (millis / 3600000) + ':00'
      }]
    }
  },
  props: ['rawData'],
  computed: {
    flows () {
      let dv = new DataSet.View().source(this.rawData)
      dv.transform({
        type: 'filter',
        callback (row) {
          return row.elapsed > 60000 // 只显示编辑时间超过一分钟的流程
        }
      }).transform({
        type: 'map',
        callback (row) {
          let from = Number(row.from) - row.date
          let end = from + row.elapsed
          row.range = [from, end]
          return row
        }
      })
      return dv.rows
    }
  }
}
</script>

<style>
</style>
