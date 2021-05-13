import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

import api from './api/index.js'
import request from './utils/httpUtils.js'
import url from './utils/config.js'

Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
