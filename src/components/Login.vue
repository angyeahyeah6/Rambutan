<template>
  <a-modal
    v-model="visible"
    :closable="false"
    :footer="false"
    :width="495"
    :body-style="{ padding: '50px', paddingTop: '50px', height: '600px' }"
  >
    <div class="l-block-container">
      <a-button style="height:50px;" block @click="googleLogin()">
        <a-icon type="google" />
        {{ $t(`google_login`) }}
      </a-button>
      <div class="l-center-container">
        <p>{{ $t(`or`) }}</p>
      </div>
      <a-form :form="form" hasFeedback :style="{ radius: '2px' }">
        <div class="l-form-item">
          <p>{{ $t(`email`) }}</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: $t(`account_should_be_email`),
                    },
                    {},
                  ],
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
        </div>
        <div class="l-form-item">
          <p>{{ $t(`password`) }}</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      message: $t(`password_is_required`),
                    },
                  ],
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </div>
        <div class="l-center-container">
          <p style="color:#1890FF">
            {{ $t(`forgot_password`) }}
          </p>
        </div>
        <div class="l-center-container">
          <a-space algin="baseline">
            <div>{{ $t(`dont_have_an_account`) }}</div>
            <a-button
              type="link"
              @click="goToSignUp()"
              style="color:#1890FF; padding-left:0px"
            >
              {{ $t(`sign_up`) }}
            </a-button>
          </a-space>
        </div>
        <div class="l-btn-container">
          <a-button
            class="btn-primary"
            key="add Room"
            type="primary"
            @click="postLogin()"
          >
            {{ $t(`log_in`) }}
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script>
import api from "../api";
import firebase from "firebase";
export default {
  data() {
    return {
      token: "",
      visible: true,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    goToSignUp() {
      this.$router.push("/SignUp");
    },
    goToMain() {
      this.$router.push("/Main");
    },
    postLogin() {
      this.form.validateFields((err, values) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(values),
        };
        fetch(api + "/auth/signin", requestOptions)
          .then((response) => response.json())
          .then((response) => {
            localStorage.setItem("token", response.token);
            localStorage.setItem("email", values.email);
          })
          .then(() => this.goToMain())
          .catch((error) => {
            console.log(error);
          });
      });
    },
    googleLogin() {
      const that = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: result.user.email,
              password: result.user.uid,
            }),
          };

          fetch(api + "/auth/signin", requestOptions)
            .then((response) => response.json())
            .then((response) => {
              localStorage.setItem("token", response.token);
              localStorage.setItem("email", result.user.email);
            })
            .then(() => this.goToMain())
            .catch(() => {
              that.$router.push("/SignUp");
            });
        })
        .catch((err) => console.log(err));
    },
  },
  async mounted() {
    if (localStorage.getItem("email") && localStorage.getItem("token")) {
      fetch(api + "/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log("response", response);
          localStorage.setItem("id", response.id);
        });
      this.goToMain();
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../ant-design-vue/dist/antd.less";
.l-block-container {
  width: 395px;
  height: 379px;
}
.l-center-container {
  text-align: center;
  margin: 30px;
  display: flex;
  justify-content: center;
}
p {
  margin: 0px;
  margin-bottom: 10px;
}
.l-form-item {
  margin-bottom: 30px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  margin-bottom: 20px;
  border-radius: 50px;
}
.btn-primary:hover {
  color: @my-grey-3;
}
.l-btn-container {
  margin-top: 22px;
  justify-content: flex-end;
  display: flex;
}
</style>
