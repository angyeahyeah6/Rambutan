<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    :width="666"
    :closable="false"
    @ok="close"
    @cancel="close"
  >
    <div class="admin-room">
      <a-menu
        style="width: 100px; height: 485px; padding: 12px 35px 10px 10px; box-sizing: content-box;"
        mode="vertical"
        :default-selected-keys="['1']"
        :selected-keys="[selectedItem]"
        @click="handleSettingState"
      >
        <a-menu-item key="1">
          Settings
        </a-menu-item>
        <a-menu-item key="2">
          Members
        </a-menu-item>
        <a-menu-item key="3">
          Reminder
        </a-menu-item>
        <a-menu-item key="4">
          Delete
        </a-menu-item>
      </a-menu>

      <div class="admin-room-content">
        <div v-if="selectedItem == '1'">
          <div class="content-item">
            <div class="content-title">Plan Select</div>
            <a-select
              :default-value="planData[0]"
              style="width: 110px; margin-right: 15px;"
              @change="handlePlanChange"
            >
              <a-select-option v-for="ele in planData" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
            <a-select v-model="planLevel" style="width: 110px">
              <a-select-option v-for="ele in plan" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
          </div>
          <div class="content-item">
            <div class="content-title red">Plan Price</div>
            <a-select
              :default-value="planData[0]"
              style="width: 110px; margin-right: 15px;"
              @change="handlePlanChange"
            >
              <a-select-option v-for="ele in planData" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
            <a-input placeholder="" v-model="price" style="width: 110px;" />
            <span> / </span>
            <a-select v-model="planLevel" style="width: 110px">
              <a-select-option v-for="ele in plan" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
          </div>
          <div class="content-item">
            <div class="content-title red">Split</div>
            <a-input placeholder="" v-model="price" style="width: 110px;" />
            <span> people </span>
          </div>
          <div>
            <a-checkbox @change="onChange" style="font-size: 16px">
              Make this Room Public
            </a-checkbox>
          </div>
          <div class="btn-container">
            <a-button class="btn-primary" key="Save" type="primary">
              Save
            </a-button>
          </div>
        </div>
        <div v-if="selectedItem == '2'">Members</div>
        <div v-if="selectedItem == '3'">Reminder</div>
        <div v-if="selectedItem == '4'">Delete</div>
      </div>
    </div>
  </a-modal>
</template>

<script>
const planData = ["Youtube", "Netflix"];
const planLevelData = {
  Youtube: ["Premium", "Famili"],
  Netflix: ["Family"],
};
export default {
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      // isVisible: false,
      isVisible: true,
      selectedItem: "1",
      planData,
      planLevelData,
      plan: planLevelData[planData[0]],
      planLevel: planLevelData[planData[0]][0],
      price: 0,
    };
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.isVisible = this.visible;
      }
    },
  },
  methods: {
    close: function() {
      this.$emit("close", this.isVisible);
    },
    handleSettingState(e) {
      this.selectedItem = e.key;
    },
    handlePlanChange(value) {
      this.plan = planLevelData[value];
      this.planLevel = planLevelData[value][0];
    },
  },
};
</script>

<style lang="less" scoped>
.admin-room {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 510px;
}
.admin-room-content {
  box-sizing: content-box;
  padding: 26px;
  padding-left: 50px;
  width: 480px;
}
.ant-menu-item-selected {
  background-color: none !important;
}
.content-item {
  margin-bottom: 30px;
  .red {
    color: #ff4d4f;
  }
  span {
    font-size: 16px;
    margin: 0 15px;
  }
}
.content-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.btn-primary {
  height: 40px;
  width: 130px;
  margin-top: 100px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 8px, 16px, 8px, 16px;
  color: black;
  font-weight: bold;
}
</style>
