<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
:root{
  --primary-color:#f2c94c;
  --my-gray-1: #e0e0e0;
  --my-gray-2: #c4c4c4;
  --my-gray-3: #828282;
} 

#app {
  font-family: Noto Sans TC;
}
h1{
  font-size:30px;
} 
text{
  font-size:16px;
}
small{
  font-size: 14px;
}
</style>
