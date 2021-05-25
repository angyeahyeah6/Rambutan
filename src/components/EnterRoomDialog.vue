<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    @ok="closeModal"
    @cancel="closeModal"
  >
    <div class="block-container">
      <p>{{ $t(`room_pin`) }}</p>
      <a-input
        :placeholder="$t(`room_number`)"
        v-model="roomNumber"
        class="erd-room"
        style="width: 100%"
      />
      <p v-if="showWarning" class="erd-warning">{{ $t(`pin_is_incorrect`) }}</p>
      <div class="erd-btn-container">
        <a-button
          class="btn-primary"
          key="add Room"
          type="primary"
          @click="joinRoom()"
        >
          {{ $t(`enter_room`) }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>
<script>
import api from "../api";
export default {
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      isVisible: false,
      roomNumber: "",
      showWarning: false,
    };
  },
  watch: {
    visible: function(val) {
      this.isVisible = val;
    },
    roomNumber: function(val) {
      if (val) {
        this.showWarning = false;
      } else {
        this.showWarning = true;
      }
    },
  },
  methods: {
    closeModal: function() {
      this.isVisible = false;
      this.$emit("closeEnterModal", this.isVisible);
    },
    goToInfoPage() {
      this.$router.push("/Info");
    },
    joinRoom() {
      fetch(api + "/rooms/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ invitation_code: this.roomNumber }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res) {
            this.$router.push("/Info/" + res.room_id);
          } else {
            this.showWarning = true;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
.erd-warning {
  margin-top: 10px;
  color: red;
}
.block-container {
  padding: 26px;
}
.erd-room {
  height: 32px;
  width: 395px;
  border-radius: 2px;
  padding: 4px, 12px, 4px, 12px;
}
.btn-primary {
  height: 40px;
  width: 130px;
  margin-bottom: 20px;
  border-radius: 50px;
  color: black;
  font-weight: bold;
}
.erd-btn-container {
  margin-top: 100px;
  justify-content: flex-end;
  display: flex;
}
</style>
