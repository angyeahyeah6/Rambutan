<template>
  <a-modal
    v-model="isVisible"
    :footer="null"
    @ok="closeModal"
    @cancel="closeModal"
  >
    <div class="block-container">
      <p>Room PIN</p>
      <a-input class="input-room" style="width: 100%" />
      <div class="btn-container">
        <a-button class="btn-primary" key="add Room" type="primary">
          add Room
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
    };
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.isVisible = this.visible;
      }
    },
  },
  methods: {
    closeModal: function() {
      this.$emit("closeEnterModal", this.isVisible);
    },
  },
};
</script>
<style scoped>
.block-container {
  padding: 26px;
}
.input-room {
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
.btn-container {
  margin-top: 100px;
  justify-content: flex-end;
  display: flex;
}
</style>
