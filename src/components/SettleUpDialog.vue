<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    :width="557"
    :closable="false"
    @ok="close"
    @cancel="close"
  >
    <div class="content">
      <div>
        <img :src="user" />
        <span class="user-name">{{ userState.user_name }}</span>

        <span class="state"
          >{{ $t(`paid`) }} NT${{ userState.state ? userState.state[1] : 0 }}
          {{ $t(`to`) }}</span
        >
        <img :src="user" />
        <span>{{ $t(`you`) }}</span>
      </div>

      <div class="btn-container">
        <a-button
          class="btn-primary btn-cancel"
          key="cancel"
          type="default"
          @click="close()"
        >
          {{ $t(`cancel`) }}
        </a-button>
        <a-button
          class="btn-primary"
          key="settleUp"
          type="primary"
          @click="close()"
        >
          {{ $t(`settle_up`) }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import user from "../assets/user.png";
export default {
  props: {
    visible: { type: Boolean, default: false },
    userState: {
      type: Object,
      default: function() {
        return { user_name: "", payment_status: "" };
      },
    },
  },
  data() {
    return {
      user,
      isVisible: false, // default should be false
    };
  },
  watch: {
    visible: function(val) {
      this.isVisible = val;
    },
  },
  methods: {
    close: function() {
      this.isVisible = false;
      this.$emit("close", this.isVisible);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 194px;
  padding: 26px;
  font-size: 16px;

  img {
    width: 50px;
    margin-right: 10px;
  }

  .user-name {
    margin-right: 50px;
  }

  .state {
    margin-right: 50px;
  }

  .btn-container {
    margin-top: 64px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .btn-primary {
      height: 40px;
      width: 130px;
      margin-bottom: 20px;
      border-radius: 50px;
      padding: 8px, 16px, 8px, 16px;
      color: black;
      font-weight: bold;
    }

    .btn-cancel {
      margin-right: 20px;
    }
  }
}
</style>
