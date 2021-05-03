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
      <a-button type="default" class="btn-primary">Find Plan Online</a-button>
    </a-row>
    <a-list :grid="{ gutter: 20, column: 4 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card class="card-home">
          <p>{{ item.title }}</p>
          <a-space align="baseline">
            <div>
              <h1>Netflix</h1>
            </div>
            <div>
              <p>premium</p>
            </div>
          </a-space>
          <p>Owe NT$ 720</p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];
import AddRoomDialog from "./AddRoomDialog";
import EnterRoomDialog from "./EnterRoomDialog";
export default {
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
  },
};
</script>
<style scoped>
.btn-primary {
  height: 40px;
  width: 130px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 8px, 16px, 8px, 16px;
}
.card-home {
  height: 179px;
  border-radius: 10px;
  margin-top: 40px;
}
</style>
