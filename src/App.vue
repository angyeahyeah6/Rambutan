<template>
  <div id="app">
    <Nav ></Nav>
    <div class="main-container">
      <a-row :gutter="[20,20]">
        <a-col :span="24">
          <Main></Main>
        </a-col>
    </a-row>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Main from "./components/Main";
// import HelloWorld from './components/HelloWorld.vue' 
export default {
  name: "App",
  components: {
    Nav,
    Main
  }
}
</script>

<style>

element.style {
  --primary-color: #f2c94c;
  --my-gray-1: #e0e0e0;
  --my-gray-2: #c4c4c4;
  --my-gray-3: #828282;
}

#app {
  font-family: "Roboto", "sans-serif";
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0 !important;
}
h1 {
  font-size: 30px;
}
text {
  font-size: 16px;
}
small {
  font-size: 14px;
}
.main-container{
  margin-right: 130px;
  margin-left: 130px;
  max-width: 1180px;
  margin-top: 40px;
}
</style>
