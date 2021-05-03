<template>
  <div id="components-modal-demo-position">
    <a-modal
      v-model="isVisible"
      centered
      @ok="closeModal"
      @cancel="closeModal"
      :footer="null"
      :width="480"
			:body-style="{ padding: '50px', paddingTop:'30px', height: '685px' }"
    >
      <div class="ard-block-container">
        <p>Plan Select *</p>
        <a-space :size="15">
          <DropDown title="Platform"  :menulist="platforms"/>
          <DropDown title="Plan" :menulist="plans"/>
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Plan Price *</p>
        <a-space :size="15">
          <DropDown title="NT$" :menulist="money"/>
          <a-input-number v-model="month" :min="1" :max="10" />
          <p>/</p>
          <a-input-number v-model="date" :min="1" :max="10" />
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Split</p>
        <a-space :size="15" align="baseline">
          <a-input-number v-model="peoplecnt" :min="1" :max="10" />
          <p>people</p>
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Payment Deadline</p>
        <a-space :size="15" align="baseline">
          <a-input-number v-model="number" :min="1" :max="10" />
          <DropDown title="week" :menulist="timetype"/>
          <p>before start</p>
        </a-space>
      </div>
      <div class="ard-block-container">
        <p>Members *</p>
        <a-select
          default-value="lucy"
          mode="multiple"
          style="width: 50%"
          placeholder="email"
          :filter-option="false"
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
      <div class="ard-button-container">
          <a-button
            class="btn-primary"
            key="add Room"
            type="primary"
            @click="goToInfoPage()"
          >
            + Add Room
          </a-button>
      </div>
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
      number:3,
      peoplecnt:4,
      allUser: ["Json", "Tina"],
      isVisible: false,
      month:1,
      date:2,
      plans:[{
        "index":1,
        "value": "family"
      }, {
        "index":2,
        "value": "premium"
      }],
      platforms:[{
        "index":1,
        "value": "Youtube"
      }, {
        "index":2,
        "value": "Slack"
      }],
      money:[{
        "index":1,
        "value": 300
      }, {
        "index":2,
        "value": 720
      }],
      timetype:[{
        "index":1,
        "value": "week"
      }, {
        "index":2,
        "value": "month"
      }],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeAddModal", this.isVisible);
      // this.isVisible = false;
    },
    goToInfoPage() {
      this.$router.push("/Info");
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
.ard-input{
  height: 32px;
  width: 109px;
  border-radius: 2px;
}
.ard-button-container{
  justify-content: flex-end;
  display: flex;
  padding: 0px;
  margin-top: 40px;
}
.ard-modal{
  padding-top: "30px";
  padding-left: "50px";
  padding-right: "50px";
  height: "1080px";
}
.ard-space{
  justify-content: space-between;
}
.ard-block-container {
  margin-bottom: 30px;
}
p {
  margin: 0px;
  margin-bottom: 10px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  border-radius: 50px;
}
</style>
