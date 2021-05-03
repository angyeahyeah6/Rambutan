<template>
  <div id="components-modal-demo-position">
    <a-modal
      v-model="isVisible"
      centered
      @ok="closeModal"
      @cancel="closeModal"
      :footer="null"
      width="{480}"
    >
      <div class="block-container">
        <p>Plan Select *</p>
        <a-space :size="15">
          <DropDown title="Platform" />
          <DropDown title="Plan" />
        </a-space>
      </div>
      <div class="block-container">
        <p>Plan Price *</p>
        <a-space :size="15">
          <DropDown title="Platform" />
          <a-input-number v-model="value" :min="1" :max="10" />
          <p>/</p>
          <a-input-number v-model="value" :min="1" :max="10" />
        </a-space>
      </div>
      <div class="block-container">
        <p>Split</p>
        <a-space :size="15" align="baseline">
          <a-input-number v-model="value" :min="1" :max="10" />
          <p>people</p>
        </a-space>
      </div>
      <div class="block-container">
        <p>Payment Deadline</p>
        <a-space :size="15" align="baseline">
          <a-input-number v-model="value" :min="1" :max="10" />
          <DropDown title="week" />
          <p>before start</p>
        </a-space>
      </div>
      <div class="block-container">
        <p>Members *</p>
        <a-select
          default-value="lucy"
          mode="multiple"
          style="width: 50%"
          placeholder="email"
          :filter-option="false"
          @search="addUser"
        >
          <a-icon slot="suffixIcon" type="user" />
          <a-select-option v-for="u in allUser" :key="u">
            {{ u }}
          </a-select-option>
        </a-select>
      </div>
      <div style="margin-top:40px;">
        <a-checkbox>Deposit Mechanism</a-checkbox>
      </div>
      <div style="margin-top:30px;">
        <a-checkbox>Publish Online</a-checkbox>
      </div>
      <a-row>
        <a-col :push="14">
          <a-button
            class="btn-primary"
            key="add Room"
            type="primary"
            @click="closeModal"
          >
            add Room
          </a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import DropDown from "./DropDown";
export default {
  components: {
    DropDown,
  },
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      value: 3,
      havefooter: null,
      allUser: ["Json", "Tina"],
      selectUser: "Sam",
      isVisible: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeAddModal", this.isVisible);
      // this.isVisible = false;
    },
    addUser(user) {
      this.selectUser.append(user);
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.isVisible = this.visible;
      }
    },
  },
};
</script>
<style scoped>
.modal-add-room .form-item {
  padding-top: "30px";
  padding-left: "50px";
  padding-right: "50px";
  height: "673px";
  width: "480px";
  background-color: "black";
}
.block-container {
  margin-bottom: 30px;
}
p {
  margin: 0px;
  margin-bottom: 10px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 8px, 16px, 8px, 16px;
}
</style>
