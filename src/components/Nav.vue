<template>
  <div id="nav">
    <div class="nav-logo">Logo</div>
    <div class="nav-right-container">
      <img class="nav-lang-btn" :src="globe" />
      <div class="nav-login-btn">Login in</div>
      <div class="nav-signup-btn">Sign up</div>
    </div>
  </div>
</template>

<script>
import globe from "../assets/globe.png";
export default {
  data() {
    return {
      globe,
    };
  },
};
</script>

<style scoped>
#nav {
  height: 60px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  margin-left: 130px;
}
.nav-right-container {
  width: 322.5px;
  margin-right: 130px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav-lang-btn {
  width: 25px;
}
.nav-login-btn {
  width: 130px;
  height: 32px;
  font-size: 14px;
  border-radius: 50px;
  border: #c4c4c4 solid 1px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.nav-signup-btn {
  width: 130px;
  height: 32px;
  font-size: 14px;
  border-radius: 50px;
  background-color: #f2c94c;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
