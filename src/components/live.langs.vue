<template>
<div>
  <div class='dgmc-chart'>
     <v-chart :height="height" :data="rawData" :scale="scale">
      <v-tooltip title='filetype' dataKey="filetype*percent" />
      <v-axis />
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
  </div>
  <div>
    <h2>每日编程语言分布</h2>
    <p>我今天在{{langsReport.num}}门编程语言上共花了{{descTime(langsReport.totalTime)}}。</p>
    <p>在{{langsReport.topType}}上投入的时间是最多的，共{{langsReport.topTime}}。</p>
  </div>
</div>
</template>

<script>
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
    langsReport () {
      console.log('data changed')
      console.log(this.rawData)
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
</style>
