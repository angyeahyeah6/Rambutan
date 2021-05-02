<template>
  <div id="app">
    <Nav />
    <div class="main-container">
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <!-- <Main /> -->
          <Info />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
// import Main from "./components/Main";
import Info from "./components/Info";
export default {
  name: "App",
  components: {
    Nav,
    // Main,
    Info,
  },
};
</script>

<style>
element.style {
  --primary-color: #f2c94c;
  --my-gray-1: #e0e0e0;
  --my-gray-2: #c4c4c4;
  --my-gray-3: #828282;
}
.main-container {
  margin-right: 130px;
  margin-left: 130px;
  max-width: 1180px;
  margin-top: 40px;
}
</style>
