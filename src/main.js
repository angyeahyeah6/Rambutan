import Vue from 'vue'
import App from './App.vue'
import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import '../test.less';
Vue.config.productionTip = false
Vue.use(Button);
new Vue({
  render: h => h(App),
}).$mount('#app')
