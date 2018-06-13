<template>
  <div id="app">
    <main>
      <LiveLang :rawData='liveData.langs'/>
      <LiveFlow :rawData='liveData.flow'/>
      <WeekLang :rawData='weekData.langs'/>
      <WeekFlow :rawData='weekData.flow'/>
    </main>
  </div>
</template>

<script>
import LiveLang from './components/live.lang.vue'
import LiveFlow from './components/live.flow.vue'
import WeekLang from './components/week.lang.vue'
import WeekFlow from './components/week.flow.vue'

export default {
  data () {
    return {
      liveData: {langs: [], flow: []},
      weekData: {langs: [], flow: []}
    }
  },
  components: {
    LiveLang, LiveFlow, WeekLang, WeekFlow
  },
  mounted () {
    this.getLiveReport()
    this.getWeekReport()
  },
  methods: {
    getLiveReport () {
      this.$http.get('/api/liveReport')
        .then(function (res) {
          let {langs, flow} = res.body
          this.liveData = {langs, flow}
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getWeekReport () {
      this.$http.get('/api/weekReport')
        .then(res => {
          let {langs, flow} = res.body
          this.weekData = {langs, flow}
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont,Segoe
  UI,Roboto,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans
  GB,Microsoft YaHei,SimSun,sans-serif;
  font-size: 12px;
  line-height: 22px;
}

main {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr 1fr;
  align-self: center;
}
</style>
