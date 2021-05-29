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
              style="{width:214px;}"
              v-show="isAdmin"
              :disabled="!(this.memberCount == this.maxCount)"
              @click="startRoom()"
            >
              Go
            </a-button>
          </div>
        </div>
        <div class="info-plan">
          <div class="info-plan-detail-container">
            <div class="info-plan-label-container">
              <div class="info-plan-label"> Matching Deadline</div>
              <div class="info-plan-label"> Plan Price</div>
              <div class="info-plan-label"> Member</div>
            </div>
            <div class="info-plan-date-container">
              <div class="info-plan-date">
                {{ this.MatchingDeadline }}
              </div>
              <div class="info-plan-date">
                {{ this.planPrice }}
              </div>
              <div class="info-plan-date">
                {{ this.memberCount }}/ {{ this.maxCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-table">
      <a-table
        :columns="columns"
        :data-source="memberList"
        rowKey="user_id"
        :locale="emptyText"
      >
        <span slot="customUser">{{ $t(`user`) }}</span>
        <span slot="customDate">Application Date</span>
        <span slot="customAction">{{ $t(`action`) }}</span>

        <span slot="user_name" slot-scope="text" class="info-table-user">
          <img :src="user" />
          {{ text.user_name}}
        </span>
        <span slot="action" slot-scope="record" class="info-table-action">
          <div>
            <a-button
              v-if="!record.is_accepted"
              v-show="isAdmin"
              type="primary"
              class="btn-action"
              @click="applyAccept(record.user_id)"
            >
              <a-icon type="user-add" /> Accept
            </a-button>

            <a-button
              v-else
              v-show="isAdmin"
              type="primary"
              class="btn-action"
              disabled>
              <a-icon type="user-add" /> Accepted
            </a-button>

            <a-button
              v-show="isAdmin"
              type="default"
              class="btn-action"
              :disabled="record.is_accepted"
              ><a-icon type="delete" />{{ $t(`remove`) }}</a-button
            >
          </div>
        </span>
      </a-table>
    </div>
    <RemoveDialog
      v-if="serviceId"
      :visible="isRemoveDialogOpen"
      :roomId="roomId"
      @close="closeRemoveDialog()"
      @removeUser="removeUser"
    />
  </div>
</template>

<script>
import axios from "axios";
import api from "../api";
import user from "../assets/user.png";
import RemoveDialog from "./RemoveDialog";
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
    RemoveDialog,
  },
  data() {
    return {
      userName: localStorage.getItem("name"),
      user,
      emptyText: {
        emptyText: this.$t(`go_to_settings_to_add_members`),
      },
      roomId: "",
      isAdmin: true,
      serviceId: 0,
      serviceName: "",
      planName: "",
      isPublic: false,
      maxCount: 0,
      roundInfo: {},
      memberList: [],
      memberCount: 0,
      admin: {},
      MatchingDeadline: "-",
      planPrice:0,
      isRemoveDialogOpen:false,
      // data,
      columns: [
        {
          key: "user_name",
          width: "21%",
          slots: { title: "customUser" },
          scopedSlots: { customRender: "user_name" },
        },
        {
          key: "application_date",
          width: "24%",
          slots: { title: "customDate" },
          dataIndex: "application_date",
          scopedSlots: { customRender: "application_date" },
        },
        {
          key: "action",
          width: "55%",
          slots: { title: "customAction" },
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    startRoom(){
      const response = axiosClient.post(`/rooms/${this.roomId}/start`)
      if(response.status == 201){
        this.$router.push(`/Info/${this.roomId}`);
      }
    },
    applyAccept(userId){
      if(this.memberCount == this.maxCount){
        alert("the room is full")
      }
      else{
        this.memberList.forEach((ele) => {
          if(ele.user_id == userId){
            ele.is_accepted = true
          }
        })
        console.log({
          "room_id": Number(this.roomId), "user_id": userId
        });
        const { data } = axiosClient.post(`/application/accept`, {
          "room_id": this.roomId, "user_id": userId
        })
        if(data){
          console.log(data)
        }
      }
      
    },
    openRemoveDialog(user) {
      this.selectedUserState = user;
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
    },
    closeRemoveDialog() {
      this.isRemoveDialogOpen = !this.isRemoveDialogOpen;
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
    }
  },
  beforeMount() {
    this.roomId = this.$route.params.id;
  },
  async mounted() {
    console.log("router id", this.$route.params);
    this.roomId = this.$route.params.id;
    var  { data }  = await axiosClient.get(`/rooms/${this.roomId}/application`);
    if(data){
      console.log(data)
      this.memberList = JSON.parse(JSON.stringify(data.data))
    }
    data = await (await axiosClient.get(`/rooms/${this.roomId}`)).data;
    if (data) {
      const email = localStorage.getItem("email");
      if (email == data.admin.email) {
        this.isAdmin = true;
      }
      this.serviceId = data.service_id;
      this.serviceName = data.service_name;
      this.planName = data.plan_name;
      this.isPublic = data.is_public;
      this.maxCount = data.max_count;
      this.planPrice = data.payment_fee
      this.memberCount = data.members.length
      this.MatchingDeadline = data.matching_deadline
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
