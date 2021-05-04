<template>
  <div>
    <a-row>
      <a-button type="primary" class="btn-primary" @click="openAddRoomModal()">
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
    <a-list :grid="{ gutter: 20, column: 4 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card class="card-home" @click="goToInfoPage()">
          <p>{{ item.identity }}</p>
          <a-space align="baseline">
            <div>
              <h1>{{ item.app }}</h1>
            </div>
            <div>
              <p>{{ item.version }}</p>
            </div>
          </a-space>
          <p v-if="item.status">Owe NT$ {{ item.owe }}</p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const data = [
  {
    identity: "admin",
    app: "Youtube",
    version: "Premuim",
    status: true,
    owe: 720,
  },
  {
    identity: "member",
    app: "Netflix",
    version: "Premuim",
    status: false,
  },
  {
    identity: "admin",
    app: "Spotify",
    version: "standard",
    status: true,
    owe: 300,
  },
  {
    identity: "admin",
    app: "Notion",
    version: "family plan",
    status: false,
  },
  {
    identity: "admin",
    app: "Slack",
    version: "two plan",
    status: true,
    owe: 100,
  },
  {
    identity: "member",
    app: "NSO",
    version: "family plan",
    status: true,
    owe: 300,
  },
  {
    identity: "admin",
    app: "Play Station",
    version: "family plan",
    status: true,
    owe: 300,
  },
];
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
      data,
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
    goToInfoPage() {
      this.$router.push("/Info");
    },
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
.btn-primary:hover {
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
