<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    @ok="closeModal"
    @cancel="closeModal"
  >
    <div class="block-container">
      <p>Room PIN</p>
      <a-input placeholder="Room Number" v-model="roomNumber" class="erd-room" style="width: 100%" />
      <p v-if= "showWarning" class="erd-warning">The PIN is incorrect </p>
      <div class="erd-btn-container">
        <a-button class="btn-primary" key="add Room" type="primary" @click="goToInfoPage()">
          Enter Room
        </a-button>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: { visible: { type: Boolean, default: false } },
  data() {
    return {
      isVisible: false,
      roomNumber:"",
      showWarning:false
    };
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.isVisible = this.visible;
      }
    },
    roomNumber: function(val){
      if(val){
        this.showWarning = false
      }
      else{
        this.showWarning = true
      }
    }
  },
  methods: {
    closeModal: function() {
      this.$emit("closeEnterModal", this.isVisible);
    },
    goToInfoPage() {
      this.$router.push("/Info");
    },
  },
};
</script>
<style scoped>
.erd-warning{
  margin-top: 10px;
  color:red;
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
}
.erd-btn-container {
  margin-top: 100px;
  justify-content: flex-end;
  display: flex;
}
</style>
