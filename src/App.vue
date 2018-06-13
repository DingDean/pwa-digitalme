<template>
  <div id="app">
    <header>
      <h1>数据为镜</h1>
    </header>
    <main>
      <div class='grid-center'>
        <liveReport/>
      </div>
      <div class='grid-center'>
        <weekReport/>
      </div>
      <div class='grid-center'>
        <h2>数据采样说明</h2>
        <p>采样机制</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {
    'liveReport': () => import('./components/liveReport.vue'),
    'weekReport': () => import('./components/weekReport.vue')
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
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: auto;
}

.grid-center {
  grid-column: 2 / 3;
  text-align: left;
}

</style>
