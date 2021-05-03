import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import { Button, Table, Icon, Rate } from "ant-design-vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Table);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(Antd);
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes,
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
