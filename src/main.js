import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Toast from "components/common/toast"
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("./assets/lazyload.gif"),

})

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
