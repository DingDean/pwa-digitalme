<template>
<section class='terminal'>
  <h2 class='terminal-title' style='text-align:left'>一周语言分布</h2>
  <v-chart
    class='terminal-chart'
    height='300' :data='langs' :scale='scale'>
    <v-coord type='rect'/>
    <v-axis dataKey='date' title='true'/>
    <v-tooltip title='filetype'/>
    <v-stack-bar position='date*totalTime' color='filetype'
           tooltip='totalTime*percent'/>
    <v-legend dataKey="filetype" />
    <v-smooth-line position='date*totalTime' color='filetype'/>
    <v-point position='date*totalTime' color='filetype' shape='circle'/>
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
        dataKey: 'percent',
        min: 0,
        formatter: '.0%',
        alias: '比例'
      }, {
        dataKey: 'totalTime',
        alias: '总用时',
        formatter: (data) => data + '分钟'
      }],
    }
  },
  props: ['rawData'],
  computed: {
    langs () {
      let dv = new DataSet.View().source(this.rawData)
      dv.transform({
        type: 'map',
        callback (row) {
          row.totalTime = Math.floor(row.totalTime / 60000)
          return row
        }
      }).transform({
        type: 'percent',
        field: 'totalTime',
        dimension: 'filetype',
        groupBy: ['date'],
        as: 'percent'
      })
      return dv.rows
    }
  }
}
</script>

<style>
</style>
