<template>
  <div id="app">
    <Nav class="app-nav" />
    <div class="main-container">
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <router-view />
        </a-col>
      </a-row>
    </div>
    <!-- <div v-else class="main-container">
      <template v-if="hasaccout">
        <Login  @noaccountexist="()=> {this.hasaccout=false;}"></Login>
      </template>
      <template v-else>
        <SignUp @gotologin="()=> {this.islogin=true;}"></SignUp>
      </template>
    </div> -->
  </div>
</template>

<script>
import Nav from "./components/Nav";
// import Login from "./components/Login";
// import SignUp from './components/SignUp';
export default {
  name: "App",
  components: {
    Nav,
    // Login,
    // SignUp,
  },
  data() {
    return {
      islogin: false,
      hasaccout: true,
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
};
</script>

<style>
.main-container {
  margin-right: 130px;
  margin-left: 130px;
  max-width: 1180px;
  margin-top: 100px;
}
</style>
