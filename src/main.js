import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vgl from 'vue-golden-layout'
import 'golden-layout/src/css/goldenlayout-dark-theme.css'
import Peer from 'peerjs'
import VuePeerJS from 'vue-peerjs'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

Vue.use(vgl)
Vue.use(VuePeerJS, new Peer({
    host: process.env.PEERJS_HOSTNAME,
    path: process.env.PEERJS_PATH,
    port: process.env.PEERJS_PORT,
}))

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
