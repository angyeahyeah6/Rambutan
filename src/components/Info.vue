<template>
  <div id="info">
    <div class="info-container">
      <div class="info-left">
        <div class="info-main">
          <div class="info-title">
            <div class="info-service-name">Youtube</div>
            <div class="info-level">Premium</div>
          </div>
          <div class="info-setting-btn">
            <a-button
              class="btn-primary btn-setting"
              type="primary"
              :disabled="isSettingDisabled"
              @click="openSettingRoomModal()"
            >
              Settings
            </a-button>
            <a-button
              class="btn-primary"
              type="primary"
              :disabled="isNewRoundDisabled"
              @click="openNewRoundModal()"
            >
              New Round
            </a-button>
          </div>
        </div>
        <div class="info-plan">
          <div class="info-plan-detail-container">
            <div class="info-plan-label-container">
              <div class="info-plan-label">Payment Deadline</div>
              <div class="info-plan-label">Interval</div>
              <div class="info-plan-label">Date</div>
            </div>
            <div class="info-plan-date-container">
              <div class="info-plan-date">-</div>
              <div class="info-plan-date">-</div>
              <div class="info-plan-date">-</div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-card info-announce">
          <div class="info-card-title">Announcement</div>
          <textarea />
        </div>
        <div class="info-card info-admin">
          <div class="info-card-title">Admin Info</div>
          <div class="info-card-content">
            <div class="info-profile-name">
              <img :src="user" />
              <div class="info-name">
                <div>Carolyn</div>
                <a-rate :default-value="2.5" allow-half />
              </div>
            </div>
            <div class="info-profile-contact">
              <div>carolyn@gmail.com</div>
              <div>(812) 1234-567890</div>
            </div>
          </div>
          <div class="info-import-btn-container">
            <div class="info-import-btn">Import bank info</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-table">
      <a-table :columns="columns" :data-source="data">
        <span slot="user" slot-scope="text" class="info-table-user">
          <img :src="user" />
          {{ text }}</span
        >
        <span slot="state" slot-scope="record" class="info-table-state"
          >{{ record[0] }} you NT$ {{ record[1] }}</span
        >
        <span slot="action" slot-scope="record" class="info-table-action">
          <a-button
            type="primary"
            class="btn-action"
            :disabled="isSettleUpDisabled"
            @click="openSettleUpDialog(record)"
          >
            <a-icon type="dollar" />Settle up</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRemindDialog(record)"
            ><a-icon type="mail" />Remind</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRateDialog(record)"
            ><a-icon type="star" />Rate</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRemoveDialog(record)"
            ><a-icon type="delete" />Remove</a-button
          >
        </span>
      </a-table>
    </div>

    <AdminRoomSetting
      :visible="isSettingRoomModalOpen"
      @close="closeRoomSettingModal()"
    />
    <NewRoundModal
      :visible="isNewRoundModalOpen"
      @close="closeNewRoundModal()"
    />

    <SettleUpDialog
      :visible="isSettleUpDialogOpen"
      :userState="selectedUserState"
      @close="closeSettleUpDialog()"
    />

    <RemindDialog
      :visible="isRemindDialogOpen"
      :userState="selectedUserState"
      @close="closeRemindDialog()"
    />
    <RateDialog
      :visible="isRateDialogOpen"
      :userState="selectedUserState"
      @close="closeRateDialog()"
    />
    <RemoveDialog
      :visible="isRemoveDialogOpen"
      :userState="selectedUserState"
      @close="closeRemoveDialog()"
    />
  </div>
</template>

<script>
import user from "../assets/user.png";
import AdminRoomSetting from "./AdminRoomSetting";
import NewRoundModal from "./NewRoundModal";
import SettleUpDialog from "./SettleUpDialog";
import RemindDialog from "./RemindDialog";
import RateDialog from "./RateDialog";
import RemoveDialog from "./RemoveDialog";

const columns = [
  {
    title: "User",
    key: "user",
    width: "21%",
    dataIndex: "user",
    scopedSlots: { customRender: "user" },
  },
  {
    title: "State",
    key: "state",
    width: "24%",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "Actions",
    key: "action",
    width: "55%",
    scopedSlots: { customRender: "action" },
  },
];
const data = [
  {
    key: "1",
    user: "Kevin Yu",
    state: ["Owe", "720"],
  },
  {
    key: "2",
    user: "Frank Chen",
    state: ["Owe", "720"],
  },
  {
    key: "3",
    user: "Angela Lee",
    state: ["Owe", "720"],
  },
  {
    key: "4",
    user: "Chen",
    state: ["Owe", "720"],
  },
];
export default {
  components: {
    AdminRoomSetting,
    NewRoundModal,
    SettleUpDialog,
    RemindDialog,
    RateDialog,
    RemoveDialog,
  },
  data() {
    return {
      user,
      isSettingDisabled: false, // default should be false
      isNewRoundDisabled: false, // default should be true
      isSettleUpDisabled: false, // default should be true

      data,
      columns,
      isSettingRoomModalOpen: false,
      isNewRoundModalOpen: false,
      isSettleUpDialogOpen: false,
      selectedUserState: {},
      isRemindDialogOpen: false,
      isRateDialogOpen: false,
      isRemoveDialogOpen: false,
    };
  },
  methods: {
    openSettingRoomModal() {
      this.isSettingRoomModalOpen = !this.isSettingRoomModalOpen;
    },
    closeRoomSettingModal() {
      this.isSettingRoomModalOpen = !this.isSettingRoomModalOpen;
    },
    openNewRoundModal() {
      this.isNewRoundModalOpen = !this.isNewRoundModalOpen;
    },
    closeNewRoundModal() {
      this.isNewRoundModalOpen = !this.isNewRoundModalOpen;
    },
    openSettleUpDialog(user) {
      this.selectedUserState = user;
      this.isSettleUpDialogOpen = !this.isSettleUpDialogOpen;
    },
    closeSettleUpDialog() {
      this.isSettleUpDialogOpen = !this.isSettleUpDialogOpen;
    },
    openRemindDialog(user) {
      this.selectedUserState = user;
      this.isRemindDialogOpen = !this.isRemindDialogOpen;
    },
    closeRemindDialog() {
      this.isRemindDialogOpen = !this.isRemindDialogOpen;
    },
    openRateDialog(user) {
      this.selectedUserState = user;
      this.isRateDialogOpen = !this.isRateDialogOpen;
    },
    closeRateDialog() {
      this.isRateDialogOpen = !this.isRateDialogOpen;
    },
    openRemoveDialog(user) {
      console.log("user", user);
      this.selectedUserState = user;
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
    },
    closeRemoveDialog() {
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
    },
  },
};
</script>

<style lang="less" scoped>
#info {
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: space-between;
}
.info-container {
  // background-color: yellow;
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.info-left {
  width: 50%;
  height: 100%;
}
.info-main {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .info-title {
    width: 100%;
    color: #000000;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .info-service-name {
      font-weight: 700;
      font-size: 30px;
      margin-right: 40px;
    }
    .info-level {
      font-size: 30px;
      margin-right: 40px;
      font-weight: 400;
    }
    .anticon {
      font-size: 25px;
      cursor: pointer;
    }
  }
  .info-setting-btn {
    width: 100%;
    margin-top: 30px;
  }
  .btn-setting {
    color: #000000;
  }
  .btn-primary {
    height: 40px;
    width: 130px;
    // margin-top: 100px;
    margin-bottom: 20px;
    margin-right: 25px;
    border-radius: 50px;
    padding: 8px, 16px, 8px, 16px;
    font-weight: bold;
  }
}

.info-plan {
  height: 70%;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .info-plan-detail-container {
    // margin-top: 40px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    .info-plan-label-container {
      margin-right: 130px;
    }

    .info-plan-label,
    .info-plan-date {
      margin-top: 30px;
    }
  }
}

.info-right {
  // background-color: blue;
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .info-card {
    width: 48%;
    height: 97%;
    border: #d9d9d9 solid 1px;
    border-radius: 10px;
    padding: 30px;
    color: #828282;

    .info-card-title {
      font-size: 16px;
      margin-bottom: 30px;
    }
    textarea {
      width: 100%;
      height: 60%;
      border-color: #d9d9d9;
      border-radius: 2px;
    }
    .info-import-btn-container {
      // margin-top: 70px;
      width: 100%;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .info-import-btn {
        font-size: 14px;
        color: #000000;
        width: 132px;
        height: 32px;
        border: #d9d9d9 solid 1px;
        border-radius: 50px;
        cursor: pointer;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .info-announce {
    margin-right: 20px;
  }
  .info-admin {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .info-card-content {
    height: 70%;
    .info-profile-name {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 50px;
        margin-right: 20px;
      }
    }
    .info-profile-contact {
      margin-top: 10px;
      div {
        margin-top: 20px;
      }
    }
  }
}
.info-table {
  // background-color: green;
  margin-top: 40px;
  .info-table-user {
    img {
      width: 50px;
      margin-right: 15px;
    }
  }
  .info-table-state {
  }
  // .info-table-action {
  //   width: 50%;
  // }
  .btn-action {
    font-weight: normal;
    border-radius: 50px;
    width: 130px;
    margin: 5px 0;
    margin-right: 15px;
  }
}
</style>
