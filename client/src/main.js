import Vue from 'vue'
import App from './App.vue'
import Common from './mixins/Common';
import store from './store/index'
Vue.config.productionTip = false
Vue.mixin(Common)
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
