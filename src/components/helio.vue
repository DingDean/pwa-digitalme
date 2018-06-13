<template>
<div id='three-container'>
</div>
</template>

<script>
import Helio from '../assets/js/helio.js'
export default {
  sockets: {
    ping () {
      Helio.react()
    }
  },
  mounted () {
    Helio.init()
    Helio.animate()
  }
}
</script>

<style>
#three-container {
  position: fixed;
  top: 0;
  z-index: -1000;
}
</style>
