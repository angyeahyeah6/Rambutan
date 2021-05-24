<template>
  <div id="info">
    <div class="info-container">
      <div class="info-left">
        <div class="info-main">
          <div class="info-title">
            <div class="info-service-name">{{ serviceName }}</div>
            <div class="info-level">{{ planName }}</div>
          </div>
          <div class="info-setting-btn">
            <a-button
              class="btn-primary btn-setting"
              :type="members.length <= 1 ? 'primary' : 'default'"
              @click="openSettingRoomModal()"
            >
              {{ $t(`settings`) }}
            </a-button>

            <a-button
              class="btn-primary"
              type="primary"
              :disabled="!members.length <= 1"
              @click="openNewRoundModal()"
            >
              {{ $t(`new_round`) }}
            </a-button>
          </div>
        </div>
        <div class="info-plan">
          <div class="info-plan-detail-container">
            <div class="info-plan-label-container">
              <div class="info-plan-label">{{ $t(`payment_deadline`) }}</div>
              <div class="info-plan-label">{{ $t(`interval`) }}</div>
              <div class="info-plan-label">{{ $t(`date`) }}</div>
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
          <div class="info-card-title">{{ $t(`announcement`) }}</div>
          <textarea />
        </div>
        <div class="info-card info-admin">
          <div class="info-card-title">{{ $t(`admin_info`) }}</div>
          <div class="info-card-content">
            <div class="info-profile-name">
              <img :src="user" />
              <div class="info-name">
                <div>{{ admin.name }}</div>
                <a-rate
                  :default-value="admin.rating"
                  allow-half
                  :disabled="isAdmin ? true : false"
                />
              </div>
            </div>
            <div class="info-profile-contact">
              <div>{{ admin.email }}</div>
              <div>{{ admin.phone }}</div>
            </div>
          </div>
          <div class="info-import-btn-container">
            <div class="info-import-btn">{{ $t(`import_bank_info`) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-table">
      <a-table
        :columns="columns"
        :data-source="members"
        rowKey="user_name"
        :locale="emptyText"
      >
        <span slot="user_name" slot-scope="text" class="info-table-user">
          <img :src="user" />
          {{ text }}</span
        >
        <span slot="payment_status" slot-scope="record" class="info-table-state"
          >{{ $t(`${record}`) }}
        </span>
        <span slot="action" slot-scope="record" class="info-table-action">
          <a-button
            type="primary"
            class="btn-action"
            :disabled="isSettleUpDisabled"
            @click="openSettleUpDialog(record)"
          >
            <a-icon type="dollar" />{{ $t(`settle_up`) }}</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRemindDialog(record)"
            ><a-icon type="mail" />{{ $t(`remind`) }}</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRateDialog(record)"
            ><a-icon type="star" />{{ $t(`rate`) }}</a-button
          >
          <a-button
            type="default"
            class="btn-action"
            @click="openRemoveDialog(record)"
            ><a-icon type="delete" />{{ $t(`remove`) }}</a-button
          >
        </span>
      </a-table>
    </div>

    <AdminRoomSetting
      v-if="serviceId"
      :visible="isSettingRoomModalOpen"
      :roomId="roomId"
      :isAdmin="isAdmin"
      :serviceId="serviceId"
      :serviceName="serviceName"
      :planName="planName"
      :maxCount="maxCount"
      :roundInfo="roundInfo"
      :members="members"
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
import axios from "axios";
import api from "../api";
import user from "../assets/user.png";
import AdminRoomSetting from "./AdminRoomSetting";
import NewRoundModal from "./NewRoundModal";
import SettleUpDialog from "./SettleUpDialog";
import RemindDialog from "./RemindDialog";
import RateDialog from "./RateDialog";
import RemoveDialog from "./RemoveDialog";

// const columns = ;

const axiosClient = axios.create({
  baseURL: api,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
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
      emptyText: {
        emptyText: this.$t(`go_to_settings_to_add_members`),
      },
      roomId: "",

      isAdmin: false,
      serviceId: 0,
      serviceName: "",
      planName: "",
      maxCount: 0,
      roundInfo: {},
      memberList: [],
      admin: {},

      // data,
      columns: [
        {
          title: this.$t(`user`),
          key: "user_name",
          width: "21%",
          dataIndex: "user_name",
          scopedSlots: { customRender: "user_name" },
        },
        {
          title: this.$t(`state`),
          key: "payment_status",
          width: "24%",
          dataIndex: "payment_status",
          scopedSlots: { customRender: "payment_status" },
        },
        {
          title: this.$t(`action`),
          key: "action",
          width: "55%",
          scopedSlots: { customRender: "action" },
        },
      ],
      isSettingRoomModalOpen: false,
      isNewRoundModalOpen: false,
      isSettleUpDialogOpen: false,
      selectedUserState: {},
      isRemindDialogOpen: false,
      isRateDialogOpen: false,
      isRemoveDialogOpen: false,
    };
  },
  computed: {
    members: function() {
      const memberList = JSON.parse(JSON.stringify(this.memberList));
      return memberList.filter((member) => member.user_name != this.admin.name);
    },
  },
  methods: {
    setTableKey(record) {
      console.log("record", record);
      return record.name;
    },
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
      this.selectedUserState = user;
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
    },
    closeRemoveDialog() {
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
    },
  },
  beforeMount() {
    this.roomId = this.$route.params.id;
  },
  async mounted() {
    console.log("router id", this.$route.params);
    this.roomId = this.$route.params.id;
    // console.log("roomid", this.roomId);
    const { data } = await axiosClient.get(`/rooms/${this.roomId}`);
    console.log("original data", data);
    if (data) {
      const email = localStorage.getItem("email");
      if (email == data.admin.email) {
        this.isAdmin = true;
      }
      this.serviceId = data.service_id;
      this.serviceName = data.service_name;
      this.planName = data.plan_name;
      this.maxCount = data.max_count;
      this.roundInfo = data.round;
      this.admin = data.admin;
      this.memberList = data.members;
      // console.log("list", this.members);
    }
  },
};
</script>

<style lang="less" scoped>
#info {
}
.info-container {
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
