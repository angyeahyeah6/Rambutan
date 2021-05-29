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
              class="btn-primary-long btn-setting"
              style="{width:214px;}"
              v-show="!isAdmin"
            >
              {{ $t(`add_to_google_calendar`) }}
            </a-button>
            <a-button
              v-show="isAdmin"
              class="btn-primary btn-setting"
              :type="members.length < 1 ? 'primary' : 'default'"
              @click="openSettingRoomModal()"
            >
              {{ $t(`settings`) }}
            </a-button>
            <a-button
              v-show="isAdmin"
              v-if="isInRound"
              class="btn-primary"
              type="primary"
              @click="openDoubleCheckModal()"
            >
              {{ $t(`delete_round`) }}
            </a-button>
            <a-button
              v-show="isAdmin"
              class="btn-primary"
              type="primary"
              v-else
              :disabled="!(members.length >= 1 && !isInRound)"
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
              <div class="info-plan-date">
                {{ this.timelineBoard.paymentDeadline }}
              </div>
              <div class="info-plan-date">
                {{ this.timelineBoard.interval }}
              </div>
              <div class="info-plan-date">
                {{ this.timelineBoard.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-card info-announce">
          <div class="info-card-title">{{ $t(`announcement`) }}</div>

          <textarea v-if="isAdmin" v-model="announcement" />
          <div v-else class="text">
            {{ this.announcement ? this.announcement : $t(`none`) }}
          </div>
          <div v-show="isAdmin" class="btn-announce-container">
            <a-button
              type="default"
              class="btn-primary btn-announce"
              @click="handleAnnouncement()"
              >{{ $t(`announce`) }}</a-button
            >
          </div>
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
        <span slot="customUser">{{ $t(`user`) }}</span>
        <span slot="customStatus">{{ $t(`state`) }}</span>
        <span slot="customAction">{{ $t(`action`) }}</span>
        <span slot="user_name" slot-scope="text" class="info-table-user">
          <img :src="user" />
          {{ text == "You" ? $t(`you`) : text }}</span
        >
        <span slot="payment_status" slot-scope="record" class="info-table-state"
          >{{ $t(`${record}`) }}
        </span>
        <span slot="action" slot-scope="record" class="info-table-action">
          <a-button
            v-show="isAdmin || record.user_name == 'You'"
            type="primary"
            class="btn-action"
            :disabled="isSettleUpDisabled"
            @click="openSettleUpDialog(record)"
          >
            <a-icon type="dollar" />{{ $t(`settle_up`) }}</a-button
          >
          <a-button
            v-show="isAdmin"
            type="default"
            class="btn-action"
            @click="openRemindDialog(record)"
            ><a-icon type="mail" />{{ $t(`remind`) }}</a-button
          >
          <a-button
            v-show="isAdmin || record.user_name == 'You'"
            type="default"
            class="btn-action"
            @click="openRateDialog(record)"
            ><a-icon type="star" />{{ $t(`rate`) }}</a-button
          >
          <a-button
            v-show="isAdmin"
            type="default"
            class="btn-action"
            @click="openRemoveDialog(record)"
            ><a-icon type="delete" />{{ $t(`remove`) }}</a-button
          >
        </span>
      </a-table>
    </div>
    <DoubleCheckDialog
      :visible="isDoubleCheckModalOpen"
      delteObject="this Round"
      @doYes="deleteRound()"
      @close="closeDoubleCheckModal()"
    />
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
      v-if="serviceId"
      :visible="isNewRoundModalOpen"
      :roomId="roomId"
      @setboard="setTimelineBoard()"
      @close="closeNewRoundModal()"
    />

    <SettleUpDialog
      v-if="serviceId"
      :visible="isSettleUpDialogOpen"
      :roomId="roomId"
      :userState="selectedUserState"
      @close="closeSettleUpDialog()"
      @settleUp="settleUp"
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
      v-if="serviceId"
      :visible="isRemoveDialogOpen"
      :roomId="roomId"
      :userState="selectedUserState"
      @close="closeRemoveDialog()"
      @removeUser="removeUser"
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
import DoubleCheckDialog from "./DoubleCheckDialog";
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
    DoubleCheckDialog,
  },
  data() {
    return {
      isRoomStart: true,
      user,
      isSettingDisabled: false, // default should be false
      isNewRoundDisabled: false, // default should be true
      isSettleUpDisabled: false, // default should be true
      isInRound: false,
      emptyText: {
        emptyText: this.$t(`go_to_settings_to_add_members`),
      },
      roomId: "",
      isAdmin: false,
      serviceId: 0,
      serviceName: "",
      planName: "",
      isPublic: false,
      maxCount: 0,
      roundInfo: {},
      memberList: [],
      admin: {},
      timelineBoard: {
        paymentDeadline: "-",
        interval: "-",
        date: "-",
      },
      originalAnnouncement: "",
      announcement: "",

      // data,
      columns: [
        {
          key: "user_name",
          width: "21%",
          dataIndex: "user_name",
          slots: { title: "customUser" },
          scopedSlots: { customRender: "user_name" },
        },
        {
          key: "payment_status",
          width: "24%",
          dataIndex: "payment_status",
          slots: { title: "customStatus" },
          scopedSlots: { customRender: "payment_status" },
        },
        {
          key: "action",
          width: "55%",
          slots: { title: "customAction" },
          scopedSlots: { customRender: "action" },
        },
      ],
      isSettingRoomModalOpen: false,
      isDoubleCheckModalOpen: false,
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
      console.log("user_name", this.admin.name);
      let memberList = JSON.parse(JSON.stringify(this.memberList));
      return memberList;
    },
  },
  methods: {
    async setTimelineBoard() {
      const { data } = await axiosClient.get(`/rooms/${this.roomId}`);
      if (data) {
        const email = localStorage.getItem("email");
        if (email == data.admin.email) {
          this.isAdmin = true;
        }
        if (data.round.payment_deadline != "") {
          this.isInRound = true;
          this.timelineBoard.paymentDeadline = data.round.payment_deadline;
          this.timelineBoard.interval = data.round.round_interval + "  year";
          this.timelineBoard.date =
            data.round.starting_time + "  ->  " + data.round.ending_time;
        } else {
          this.timelineBoard.paymentDeadline = "-";
          this.timelineBoard.interval = "-";
          this.timelineBoard.date = "-";
        }
      }
    },
    setTableKey(record) {
      console.log("record", record);
      return record.name;
    },
    async deleteRound() {
      const res = await axiosClient.delete(`/rooms/${this.roomId}/round`);
      if (res.status == 200) {
        this.isInRound = false;
        this.setTimelineBoard();
      }
    },
    openDoubleCheckModal() {
      this.isDoubleCheckModalOpen = !this.isDoubleCheckModalOpen;
    },
    closeDoubleCheckModal() {
      this.isDoubleCheckModalOpen = !this.isDoubleCheckModalOpen;
    },

    openSettingRoomModal() {
      this.isSettingRoomModalOpen = !this.isSettingRoomModalOpen;
    },
    closeRoomSettingModal() {
      // this.isSettingRoomModalOpen = !this.isSettingRoomModalOpen;
      window.location.reload();
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
    settleUp(newUserStatus) {
      this.isSettleUpDialogOpen = !this.isSettleUpDialogOpen;
      this.memberList.forEach((member, id) => {
        if (member.user_id == newUserStatus.userId) {
          this.memberList[id].payment_status = newUserStatus.status;
        }
      });
    },
    removeUser(userId) {
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
      let userIdx;
      this.memberList.forEach((member, id) => {
        if (member.user_id == userId) {
          userIdx = id;
        }
      });
      this.memberList.splice(userIdx, 1);
    },
    async handleAnnouncement() {
      console.log(this.announcement);
      if (this.originalAnnouncement == this.announcement) return;
      await axiosClient.patch(`/rooms/${this.roomId}`, {
        max_count: this.maxCount,
        service_id: this.serviceId,
        plan_name: this.planName,
        is_public: this.isPublic,
        announcement: this.announcement,
      });
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
      if(data.is_public){
        this.isRoomStart
      }
      this.serviceId = data.service_id;
      this.serviceName = data.service_name;
      this.planName = data.plan_name;
      this.isPublic = data.is_public;
      this.maxCount = data.max_count;
      this.roundInfo = data.round;
      this.admin = data.admin;
      this.memberList = data.members;
      this.originalAnnouncement = data.announcement;
      this.announcement = data.announcement;

      if (data.round.payment_deadline != "") {
        this.isInRound = true;
        this.timelineBoard.paymentDeadline = data.round.payment_deadline;
        this.timelineBoard.interval = data.round.round_interval + "  year";
        this.timelineBoard.date =
          data.round.starting_time + "  ->  " + data.round.ending_time;
      }

      this.memberList = this.memberList.filter(
        (member) => member.user_name != this.admin.name
      );
      if (!this.isAdmin) {
        let idx;
        this.memberList.forEach((member, id) => {
          console.log("member", member.user_id);
          console.log("id", localStorage.getItem("id"));
          if (member.user_id == localStorage.getItem("id")) {
            idx = id;
          }
        });

        this.memberList[idx].user_name = "You";
        const youData = this.memberList[idx];
        this.memberList.splice(idx, 1);
        this.memberList.unshift(youData);
      }

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
  .btn-primary-long {
    height: 40px;
    width: 240px;
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
    .text {
      height: 60%;
    }
    .btn-announce-container {
      display: flex;
      justify-content: flex-end;
      .btn-announce {
        border-radius: 50px;
        margin: 5px 0;
      }
    }
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
