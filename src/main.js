import Vue from 'vue'
import App from './App.vue'
import { Button } from 'ant-design-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Antd);
new Vue({
  render: h => h(App),
}).$mount('#app')
