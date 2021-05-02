<template>
  <div id="app">
<<<<<<< Updated upstream
    <Nav />
=======
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
   
    <a-button type="primary">
      Primary
    </a-button>
    
>>>>>>> Stashed changes
  </div>
  
</template>

<script>
import Nav from "./components/Nav";
// import HelloWorld from './components/HelloWorld.vue' 
export default {
  name: "App",
  components: 
    Nav,
}
</script>

<style>
:root {
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
