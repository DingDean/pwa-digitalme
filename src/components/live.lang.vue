<template>
<section class='terminal'>
  <h2 class='terminal-title' style='text-align:left'>今日语言分布</h2>
  <p class='terminal-title' style='text-align:center'>总编程时间:
    {{descTime(langsReport.totalTime)}}</p>
  <p class='terminal-title' style='text-align:right'>最常编辑:
    {{langsReport.topType}}</p>
  <v-chart
    class='terminal-chart'
    :height="height"
    :data="lang"
    :scale="scale">
    <v-tooltip title='filetype' dataKey="filetype*percent" />
        <v-legend dataKey="filetype" />
          <v-pie
            position="percent"
            color="filetype"
            tooltip="percent*timeUsed"
            :vStyle="pieStyle"
            :label="labelConfig"
            />
            <v-coord type="theta" />
  </v-chart>
</section>
</template>

<script>
const DataSet = require('@antv/data-set')

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}]
export default {
  props: ['rawData'],
  data () {
    return {
      scale,
      height: 300,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['percent', {
        offset: -40,
        textStyle: {
          rotate: 0,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }],
    }
  },
  computed: {
    lang () {
      let self = this
      const dv = new DataSet.View().source(this.rawData)
      dv.transform({
        type: 'percent',
        field: 'totalTime',
        dimension: 'filetype',
        as: 'percent'
      })
      dv.transform({
        type: 'map',
        callback (row) {
          row.timeUsed = self.descTime(row.totalTime)
          return row
        }
      })
      return dv.rows
    },
    langsReport () {
      let num = this.rawData.length
      let totalTime = this.rawData.reduce((a, b) => a + b.totalTime, 0)

      let topType = ''
      let topTime = ''
      if (num > 0) {
        this.rawData.sort((a, b) => a.totalTime < b.totalTime)
        let {filetype, totalTime: tt} = this.rawData[0]
        topType = filetype
        topTime = this.descTime(tt)
      }
      return {num, totalTime, topType, topTime}
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
.terminal {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: repeated(2, min-content)
}
.terminal-title {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: center;
}
.terminal-chart {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
</style>
