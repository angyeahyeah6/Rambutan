<template>
<div id="online">
  <div class="online-button-container">
    <a-button
        type="primary"
        class="addroom-btn btn-primary"
        @click="openAddRoomModal()"
      >
        + {{ $t(`add_room`) }}
        <AddRoomDialog
          :visible="addModalVisible"
          @closeAddModal="closeAddRoomModal()"
        />
    </a-button>
    <a-input-search placeholder="Search Plan" style="width: 200px"/>
  </div>
  <div class="online-table">
    <a-table
      :columns="columns"
      :data-source="rooms"
      rowKey="room_id"
    >
      <span slot="customAdmin">{{ $t(`admin_title`) }}</span>
      <span slot="customPlan">{{ $t(`plan_title`) }}</span>
      <span slot="customPrice">{{ $t(`plan_price`) }}</span>
      <span slot="customDeadline">{{ $t(`matching_deadline`) }}</span>
      <span slot="customMembers">{{ $t(`members`) }}</span>
      <span slot="customMessage">{{ $t(`message`) }}</span>
      <span slot="customAction">{{ $t(`action`) }}</span>


      <span slot="admin_name" slot-scope="text" class="online-table-user">
        <a-space  align="center">
        <img :src="user" />
        <a-space direction="vertical">
        {{ text.admin_name }} 
        <div>
        {{ text.admin_rating }}
        <a-icon type="star" theme="twoTone" two-tone-color="#F2C94C" />
        </div>
        </a-space>
        </a-space>
      </span>

      <span slot="plan_name" slot-scope="text" class="online-table-user">
        {{ text.service_name}} - {{ text.plan_name}}
      </span>

      <span slot="mem" slot-scope="text" class="online-table-user">
        {{ text.member_count }} / {{ text.max_count }} 
      </span>

      <span slot="action" slot-scope="text" class="online-table-action">
        <a-button
          :key="text.room_id"
          type="primary"
          class="btn-action"
          v-if="!text.isApply"
          @click="applyJoinRoom(text.room_id)"
        >
          {{ $t(`apply`) }} {{ text.isApply}}
        </a-button
        >
      </span>
    </a-table>
  </div>
  </div>
</template>
<script>
import user from "../assets/user.png";
import api from "../api";
import AddRoomDialog from "./AddRoomDialog";
import axios from "axios";
const axiosClient = axios.create({
  baseURL: api,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
export default {
  name: "Main",
  components: {
    AddRoomDialog,
  },
  data() {
    return {
      publicRooms:[],
      user,
      addModalVisible: false,
      // data,
      columns: [
        {
          key: "admin_name",
          width: "17%",
          slots: { title: "customAdmin" },
          scopedSlots: { customRender: "admin_name" },
        },
        {
          key: "plan_name",
          width: "17%",
          slots: { title: "customPlan" },
          scopedSlots: { customRender: "plan_name" },
        },
        {
          key: "cost",
          width: "13%",
          dataIndex: "cost",
          slots: { title: "customPrice" },
          scopedSlots: { customRender: "cost" },
        },
        {
          key: "time",
          width: "20%",
          dataIndex: "time",
          slots: { title: "customDeadline" },
          scopedSlots: { customRender: "time" },
        },
        {
          key: "mem",
          width: "9%",
          slots: { title: "customMembers" },
          scopedSlots: { customRender: "mem" },
        },
        {
          key: "mes",
          width: "21%",
          dataIndex: "mes",
          slots: { title: "customMessage" },
          scopedSlots: { customRender: "mes" },
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
  computed: {
    rooms: function() {
      return this.publicRooms;
    },
  },
  methods: {
    openAddRoomModal() {
      this.addModalVisible = true;
    },
    closeAddRoomModal(val) {
      this.addModalVisible = val;
    },
    getPublicRooms() {
      fetch(api + "/rooms/public", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data)
          this.publicRooms = response.data
          this.publicRooms.forEach(function (element) {
            if(element.isApply == undefined){
              element.isApply = false;
            }
          });
        });
    },
    async applyJoinRoom(roomId){
      const res = await axiosClient.get(`/rooms/${roomId}/application`);
      console.log(res);
      if(res.status == 200){
        for (var i = 0; i < this.publicRooms.length; i++) {
          if(this.publicRooms[i].room_id == roomId){
            this.publicRooms[i].isApply = true;
            console.log(this.publicRooms[i])
          }
        }
      }
    }
  },
  mounted: function(){
    this.getPublicRooms();
  }
};
</script>
<style lang="less" scoped>
#online {
}
.online-button-container{
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.online-container {
  width: 100%;
  height: 300px;
}
.online-table {
  // background-color: green;
  margin-top: 40px;
  .online-table-user {
    img {
      width: 50px;
      margin-right: 15px;
    }
  }
  .online-table-state {
  }
  // .online-table-action {
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
.btn-primary {
  height: 40px;
  width: 130px;
  border-radius: 50px;
  color: black;
  font-weight: bold;
}
</style>
