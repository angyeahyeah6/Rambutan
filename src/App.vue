<template>
  <div id="app">
    <Nav class="app-nav" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  name: "App",
  components: {
    Nav,
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
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.main-container {
  padding: 8%;
  padding-top: 80px;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .main-container {
    padding: 35px;
    padding-top: 80px;
    width: 100%;
  }
}
</style>
