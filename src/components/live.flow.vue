<template>
<div>
  <div class='dgmc-chart'>
    <v-chart height='300' :data='rawData' :scale='scale'>
      <v-coord type='rect'/>
      <v-bar position='range*ticks' color='filetype'
        tooltip='ticks*elapsed'/>
      <v-axis dataKey='range' title='true'/>
      <v-axis dataKey='ticks' title='true'/>
      <v-tooltip title='filetype'/>
    </v-chart>
  </div>
  <h3>Flow</h3>
</div>
</template>

<script>
import moment from 'moment'
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
  }
}
</script>

<style>
</style>
