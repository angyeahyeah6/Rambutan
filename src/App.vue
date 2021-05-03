<template>
  <div id="app">
    <Nav />
    <div class="main-container">
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <router-view />
        </a-col>
      </a-row>
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
