<template>
<div id='liveReport'>
  <div v-if='langsData.length === 0'>
    <p>暂无数据</p>
  </div>
  <Lang v-else :rawData='langsData' class='grid-section'/>
  <div v-if='flowData.length === 0'>
    <p>暂无数据</p>
  </div>
  <Flow v-else :rawData='flowData' class='grid-c-all'/>
</div>
</template>

<style>
.grid-section {
  display: grid;
  grid-template-columns: max-content 1fr;
}
.grid-c-all {
  grid-column: 1 / 3;
}
</style>

<script>
import Lang from './live.langs.vue'
import Flow from './live.flow.vue'
const DataSet = require('@antv/data-set')

export default {
  data () {
    return {
      langsData: [],
      flowData: [],
    }
  },
  components: {
    Lang, Flow
  },
  mounted () {
    this.getLiveReport()
  },
  methods: {
    descTime (elapsed) {
      const HOUR = 3600000
      const MINUTE = 60000
      let hour = Math.floor(elapsed / HOUR)
      let minutes = Math.floor((elapsed - hour * HOUR) / MINUTE)
      return `${hour}小时又${minutes}分钟`
    },
    getLiveReport () {
      this.$http.get('/api/liveReport')
        .then(function (res) {
          this.langsData = this.transformLang(res.body.langs)
          this.flowData = this.transformFlow(res.body.flow)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    transformLang (raw) {
      let self = this
      const dv = new DataSet.View().source(raw)
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
    transformFlow (raw) {
      let self = this
      const dv = new DataSet.View().source(raw)
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
  }
}
</script>

