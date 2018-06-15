<template>
<section class='terminal'>
  <h2 class='terminal-title' style='text-align:left'>今日时间分布</h2>
  <p class='terminal-title' style='text-align:right'>经常编程时间:
    夜晚</p>
  <v-chart
    class='terminal-chart'
    height='300' :data='flow' :scale='scale'>
    <v-coord type='rect'/>
    <v-bar position='range*ticks' color='filetype'
      tooltip='ticks*elapsed'/>
    <v-axis dataKey='range' title='true'/>
    <v-axis dataKey='ticks' title='true'/>
    <v-tooltip title='filetype'/>
  </v-chart>
</section>
</template>

<script>
import moment from 'moment'
const DataSet = require('@antv/data-set')
const scale = [{
  dataKey: 'range',
  type: 'time',
  mask: 'HH:mm',
  nice: true,
  min: moment().startOf('day'),
  max: moment().endOf('day'),
  alias: '时间',
}, {
  dataKey: 'ticks',
  alias: '敲击数'
}, {
  dataKey: 'elapsed',
  alias: '持续时间'
}]
export default {
  props: ['rawData'],
  data () {
    return {
      scale
    }
  },
  computed: {
    flow () {
      let self = this
      const dv = new DataSet.View().source(this.rawData)
      dv.transform({
        type: 'filter',
        callback (row) {
          return row.elapsed > 60000 // 只显示编辑时间超过一分钟的流程
        }
      })
      dv.transform({
        type: 'map',
        callback (row) {
          row.from = Number(row.from)
          row.end = row.from + row.elapsed
          row.range = [row.from, row.end]
          row.elapsed = self.descTime(row.elapsed)
          return row
        }
      })
      return dv.rows
    }
  },
  methods: {
    descTime (elapsed) {
      const HOUR = 3600000
      const MINUTE = 60000
      let hour = Math.floor(elapsed / HOUR)
      let minutes = Math.floor((elapsed - hour * HOUR) / MINUTE)
      return `${hour}小时又${minutes}分钟`
    }
  }
}
</script>

<style>
</style>
