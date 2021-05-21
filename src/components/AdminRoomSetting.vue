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
              v-model="currency"
              :default-value="currencyData[0]"
              style="width: 110px; margin-right: 15px;"
            >
              <a-select-option v-for="ele in currencyData" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
            <a-input v-model="price" placeholder="0" style="width: 110px;" />
            <span> / </span>
            <a-select
              v-model="period"
              :default-value="periodData[0]"
              style="width: 110px"
            >
              <a-select-option v-for="ele in periodData" :key="ele">
                {{ ele }}
              </a-select-option>
            </a-select>
          </div>
          <div class="content-item">
            <div class="content-title red">Split</div>
            <a-input placeholder="0" v-model="people" style="width: 110px;" />
            <span> people </span>
          </div>
          <div>
            <a-checkbox
              style="font-size: 16px"
              :checked="isRoomPublic"
              @change="handleRoomPublic"
            >
              Make this Room Public
            </a-checkbox>
          </div>
          <div class="btn-container">
            <a-button
              class="btn-primary btn-save"
              key="Save"
              type="primary"
              :disabled="true"
              @click="close()"
            >
              Save
            </a-button>
          </div>
        </div>
        <div v-if="selectedItem == '2'">
          <div v-for="ele in pinList" class="new-code" :key="ele.pinCode">
            <img :src="question" />
            <div class="pin-info">
              <div class="pin">
                <div class="label">Room PIN</div>
                <div>{{ ele.pinCode }}</div>
              </div>
              <div class="note">
                expire at {{ ele.expireDate }} {{ ele.expireTime }}
              </div>
            </div>
            <copy-to-clipboard :text="ele.pinCode" @copy="handleCopy">
              <a-button class="btn-primary btn-copy" type="default">
                Copy
              </a-button>
            </copy-to-clipboard>
          </div>

          <div class="new-user" @click="generateNewPin()">
            <img :src="add" />
          </div>
        </div>
        <div v-if="selectedItem == '3'">
          <button class="btn-google-calendar">Add to Google Calendar</button>
        </div>
        <div v-if="selectedItem == '4'">
          <a-button class="btn-primary" type="danger" ghost>
            Delete Room
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import CopyToClipboard from "vue-copy-to-clipboard";
import add from "../assets/add.png";
import question from "../assets/question.png";

const planData = ["Youtube", "Netflix"];
const planLevelData = {
  Youtube: ["Premium", "Famili"],
  Netflix: ["Family"],
};
const currencyData = ["NT", "US"];
const periodData = ["month", "week"];

const pinList = [
  { pinCode: "222333", expireDate: "2075-01-01", expireTime: "05:20" },
  { pinCode: "122334", expireDate: "2075-01-01", expireTime: "05:20" },
  { pinCode: "223335", expireDate: "2075-01-01", expireTime: "05:20" },
  { pinCode: "223335", expireDate: "2075-01-01", expireTime: "05:20" },
];
export default {
  components: {
    CopyToClipboard,
  },
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      add,
      question,

      isVisible: false, // default should be false
      selectedItem: "2", // default should be 1
      planData,
      planLevelData,
      plan: planLevelData[planData[0]],
      planLevel: planLevelData[planData[0]][0],
      price: 0,
      currencyData,
      periodData,
      currency: currencyData[0],
      period: periodData[0],
      people: 0,
      isRoomPublic: false,

      pinList,
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
    handleSettingState(e) {
      this.selectedItem = e.key;
    },
    handlePlanChange(value) {
      this.plan = planLevelData[value];
      this.planLevel = planLevelData[value][0];
    },
    handleRoomPublic() {
      this.isRoomPublic = !this.isRoomPublic;
    },
    handleCopy(result) {
      console.log(result);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../ant-design-vue/dist/antd.less";
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
  // margin-top: 100px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 8px, 16px, 8px, 16px;
  color: black;
  font-weight: bold;
}
.btn-save {
  margin-top: 100px;
}
.btn-google-calendar {
  width: 200px;
  height: 32px;
  font-size: 14px;
  border: solid @my-grey-1 1px;
  border-radius: 50px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.new-code {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  margin-bottom: 30px;
  img {
    width: 50px;
    margin-right: 25px;
  }
  .pin-info {
    margin-right: 40px;
    .pin {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .label {
        margin-right: 30px;
      }
    }
    .note {
      color: @my-grey-3;
    }
  }
  .btn-copy {
    width: 70px;
    margin-bottom: 0;
    font-size: 14px !important;
    font-weight: 400;
  }
}

.new-user {
  cursor: pointer;
  img {
    width: 50px;
  }
}
</style>
