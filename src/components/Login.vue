<template>
  <a-modal
    v-model="visible"
    :closable="false"
    :footer="false"
    :width="495"
    :body-style="{ padding: '50px', paddingTop: '50px', height: '600px' }"
  >
    <div class="l-block-container">
      <a-button style="height:50px;" block>
        <a-icon type="google" />
        Continue with Google
      </a-button>
      <div class="l-center-container">
        <p>or</p>
      </div>
      <a-form :form="form" hasFeedback :style="{ radius: '2px' }">
        <div class="l-form-item">
          <p>email</p>
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Account is required.',
                    },
                    {
                      validator: checkAccountExist,
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
        <div class="l-form-item">
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
                    {
                      validator: checkPasswordValid,
                    },
                  ],
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </div>
        <div class="l-center-container">
          <p style="color:#1890FF">Forgot password?</p>
        </div>
        <div class="l-center-container">
          <a-space algin="baseline">
            <div>Don’t have an account?</div>
            <a-button
              type="link"
              @click="goToSignUp()"
              style="color:#1890FF; padding-left:0px"
            >
              Sign up
            </a-button>
          </a-space>
        </div>
        <div class="l-btn-container">
          <a-button
            class="btn-primary"
            key="add Room"
            type="primary"
            @click="goToMainPage()"
          >
            Log in
          </a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    checkAccountExist(rule, value, callback) {
      if (value != "carolyn@gmail.com") {
        callback("This account dose not exist");
      }
    },
    checkPasswordValid(rule, value, callback) {
      if (value != "carolyn") {
        callback("The password is incorrect");
      }
    },
    goToSignUp() {
      this.$router.push("/SignUp");
    },
    goToMainPage() {
      this.$router.push("/Main");
    },
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
  color: @primary-button-text;
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
