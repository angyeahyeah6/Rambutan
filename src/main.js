import Vue from "vue";
import App from "./App.vue";
import { enUS, zhTW } from "./locale";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import routes from "./router";
import { Button, Table, Icon, Rate } from "ant-design-vue";
import Antd from "ant-design-vue";
import "../ant-design-vue/dist/antd.less";
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Table);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(VueI18n);
console.log(enUS);
console.log(zhTW);
const locale = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : "enUS";
localStorage.setItem("lang", locale);
const i18n = new VueI18n({
  locale: locale,
  messages: { enUS, zhTW },
});
const router = new VueRouter({
  mode: "history",
  routes,
});
new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
