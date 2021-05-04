<template>
  <div id="app">
    <Nav class="app-nav" />
    <div v-if="islogin" class="main-container">
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <router-view />
        </a-col>
      </a-row>
    </div>
    <div v-else class="main-container">
      <Login v-if="hasaccout"></Login>
      <SignUp v-else></SignUp>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Login from "./components/Login";
import SignUp from './components/SignUp';
export default {
  name: "App",
  components: {
    Nav,
    Login,
    SignUp,
  },
  data() {
    return {
      islogin:true,
      hasaccout:true
    };
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
  margin-top: 100px;
}
</style>
