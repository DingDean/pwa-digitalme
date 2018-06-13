<template>
  <div>
    <v-chart height='300' :data='langsData' :scale='scale'>
      <v-coord type='rect'/>
      <v-axis dataKey='date' title='true'/>
      <v-tooltip title='filetype'/>
      <v-stack-bar position='date*totalTime' color='filetype'
             tooltip='totalTime*percent'/>
      <v-legend dataKey="filetype" />
      <v-smooth-line position='date*totalTime' color='filetype'/>
      <v-point position='date*totalTime' color='filetype' shape='circle'/>
    </v-chart>

    <v-chart height='400' :data='flowData' :scale='flowScale'>
      <v-coord type='rect' direction='LB'/>
      <v-axis dataKey='range' title='true'/>
      <v-axis dataKey='date' title='true'/>
      <v-tooltip title='date'/>
      <v-legend dataKey='filetype'/>
      <v-bar position='date*range' color='filetype'
             tooltip='filetype'/>
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

export default {
  data () {
    return {
      langsData: [],
      flowData: [],
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
      flowScale: [{
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
  mounted () {
    this.getWeekReport()
  },
  methods: {
    getWeekReport () {
      this.$http.get('/api/weekReport')
        .then(res => {
          console.log(res)
          this.langsData = this.transformLang(res.body.langs)
          this.flowData = this.transformFlow(res.body.flow)
        })
        .catch(err => {
          console.log(err)
        })
    },
    transformLang (report) {
      let dv = new DataSet.View().source(report)
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
    },
    transformFlow (report) {
      let dv = new DataSet.View().source(report)
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
