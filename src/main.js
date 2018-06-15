// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ViserVue from 'viser-vue'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(ViserVue)
Vue.use(VueResource)
Vue.use(VueSocketio, 'http://localhost:8765')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<div><App/><Three/></div>',
  template: '<App/>',
  components: {
    App
    // Three: () => import('./components/helio.vue')
  },
  sockets: {
    connect: function () {
      console.log('connected')
    }
  }
})
