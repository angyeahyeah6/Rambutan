<template>
  <div>
    <a-row>
      <a-button
        type="primary"
        class="addroom-btn btn-primary"
        @click="openAddRoomModal()"
      >
        + Add Room
        <AddRoomDialog
          :visible="addModalVisible"
          @closeAddModal="closeAddRoomModal()"
        />
      </a-button>

      <a-button
        type="default"
        class="btn-primary"
        @click="() => openEnterRoomModal()"
      >
        Enter Room
        <EnterRoomDialog
          :visible="enterModalVisible"
          @closeEnterModal="closeEnterRoomModal()"
        />
      </a-button>
      <a-button type="default" class="btn-primary find-plan-btn"
        >Find Plan Online</a-button
      >
    </a-row>
    <a-list :grid="{ gutter: 20, column: 4 }" :data-source="rooms">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card
          v-show="item.room_status == 'created'"
          class="card-home"
          @click="goToInfoPage(item.room_id)"
        >
          <p v-if="item.is_host">admin</p>
          <p v-else>member</p>
          <a-space align="baseline">
            <div>
              <h1>{{ item.service_name }}</h1>
            </div>
            <div>
              <p>{{ item.plan_name }}</p>
            </div>
          </a-space>
          <p v-if="item.payment_status == 'unpaid'">Owe NT$ {{ item.cost }}</p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import api from "../api";
import AddRoomDialog from "./AddRoomDialog";
import EnterRoomDialog from "./EnterRoomDialog";
export default {
  name: "Main",
  components: {
    AddRoomDialog,
    EnterRoomDialog,
  },
  data() {
    return {
      rooms: [],
      addModalVisible: false,
      enterModalVisible: false,
    };
  },
  methods: {
    openAddRoomModal() {
      this.addModalVisible = true;
    },
    closeAddRoomModal(val) {
      this.addModalVisible = val;
    },
    openEnterRoomModal() {
      this.enterModalVisible = true;
    },
    closeEnterRoomModal(val) {
      this.enterModalVisible = val;
    },
    goToInfoPage(room_id) {
      this.$router.push(`/Info/${room_id}`); // should be automatically route to the new id
    },
    getRooms() {
      fetch(api + "/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          this.rooms = response.data;
          console.log(this.rooms);
        });
    },
  },
  created() {
    this.getRooms();
  },
  mounted() {
    // work around
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../ant-design-vue/dist/antd.less";
.btn-primary {
  height: 40px;
  width: 130px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 8px, 16px, 8px, 16px;
  color: black;
  font-weight: bold;
}
.addroom-btn:hover {
  color: @my-grey-3;
}
.find-plan-btn {
  width: 170px;
}
.card-home {
  height: 179px;
  border-radius: 10px;
  margin-top: 40px;
  cursor: pointer;
}
</style>
