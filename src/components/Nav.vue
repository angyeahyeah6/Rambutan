<template>
  <div id="nav">
    <a-icon @click="goToHomePage()" class="nav-home-btn" type="home" />
    <div class="nav-logo">Logo</div>
    <div class="nav-right-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="25px"
        fill="#C4C4C4"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"
        />
      </svg>
      <div class="nav-profile-btn" @click="goToProfilePage()">
        <img :src="user" />
      </div>
    </div>
    <!-- <div class="nav-logo">Logo</div>
    <div class="nav-right-container">
      <img class="nav-lang-btn" :src="globe" />
      <div class="nav-login-btn">Login in</div>
      <div class="nav-signup-btn">Sign up</div>
    </div> -->
  </div>
</template>

<script>
import globe from "../assets/globe.png";
import home from "../assets/home.png";
import user from "../assets/user.png";
export default {
  data() {
    return {
      globe,
      home,
      user,
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/Main");
    },
    goToProfilePage() {
      this.$router.push("/Info");
    },
  },
};
</script>

<style lang="less" scoped>
#nav {
  height: 60px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav-home-btn {
  font-size: 30px;
  color: #c4c4c4;
  margin-left: 130px;
  cursor: pointer;
}
.nav-logo {
  /* margin-left: 130px; */
  font-size: 30px;
}
.nav-right-container {
  width: 115.5px;
  margin-right: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }

  .nav-profile-btn {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background-color: #e0e0e0;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 35px;
      height: 35px;
    }
  }
}

/* .nav-lang-btn {
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
} */
</style>
