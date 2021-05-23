<template>
  <a-modal
    v-model="visible"
    :closable="false"
    :footer="false"
    :width="495"
    :body-style="{ padding: '50px', paddingTop: '50px', height: '600px' }"
  >
    <div class="su-block-container">
      <a-button style="height:50px;" block>
        <a-icon type="google" />
        Continue with Google
      </a-button>
      <div class="su-center-container">
        <p>or</p>
      </div>
      <a-form :form="form" hasFeedback :style="{ radius: '2px' }">
        <div class="su-form-item">
          <p>name</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Name  is required.',
                    },
                  ],
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </div>
        <div class="su-form-item">
          <p>email</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The account should be email',
                    },
                    {
                      required: true,
                      message: 'Email  is required.',
                    },
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
        <div class="su-form-item">
          <p>password</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Password  is required.',
                    },
                  ],
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </div>
        <div class="su-center-container">
          <a-space>
            <p>Already have an account?</p>
            <p style="color:#1890FF; cursor:pointer;" @click="goToLogin()">
              Log in
            </p>
          </a-space>
        </div>
        <div class="su-btn-container">
          <a-button
            class="btn-primary"
            key="add Room"
            type="primary"
            @click="goToMain()"
          >
            Sign Up
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script>
import api from "../api";
export default {
  data() {
    return {
      visible: true,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/Login");
    },
    goToMain() {
      this.$router.push("/Main");
    },
    postSignUp(){
      this.form.validateFields((err, values) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        };
        fetch(api + "/auth/signup", requestOptions)
        .then(response => response.json())
        .then((response) => {
          localStorage.setItem("token", response.token);
        })
        .then(() => this.goToMain())
        .catch((error) => {
          console.log(error);
        })
      });
    }
  },
};
</script>
<style scoped>
.su-block-container {
  width: 395px;
  height: 379px;
}
.su-center-container {
  text-align: center;
  margin: 20px;
  display: flex;
  justify-content: center;
}
p {
  margin: 0px;
  margin-bottom: 10px;
}
.su-form-item {
  margin-bottom: 30px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  margin: 0px;
  border-radius: 50px;
}

.su-btn-container {
  margin-top: 11px;
  justify-content: flex-end;
  display: flex;
}
</style>
