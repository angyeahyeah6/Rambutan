<template>
  <div id="components-modal-demo-position">
    <a-modal
    class="modal-add-room"
      v-model="visible"
      centered
      @ok="closeModal"
    >
    <div class="block-container">
      <p>Plan Select *</p>
      <a-space :size="15">
        <DropDown title="Platform" />
        <DropDown title="Plan" />
      </a-space>
    </div>
    <div class="block-container">
      <p>Plan Price *</p>
      <a-space :size="15">
        <DropDown title="Platform" />
        <a-input-number v-model="value" :min="1" :max="10" @change="onChange" />
        <p> / </p>
        <a-input-number v-model="value" :min="1" :max="10" @change="onChange" />
      </a-space>
    </div>

    <div class="block-container">
      <p>Split </p>
      <a-space :size="15">
        <a-input-number v-model="value" :min="1" :max="10" @change="onChange" />
        <p> people </p>
      </a-space>
    </div>

    <div class="block-container">
      <p>Payment Deadline</p>
      <a-space :size="15">  
        <a-input-number v-model="value" :min="1" :max="10" @change="onChange" />
        <DropDown title="week" />
        <p>before start</p>
      </a-space>
    </div>

    <div class="block-container">
      <p>Members *</p>
      <a-select
        mode="multiple"
        label-in-value
        :value="value"
        placeholder="Select users"
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        @search="fetchUser"
        @change="handleChange"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option v-for="d in data" :key="d.value">
          {{ d.text }}
        </a-select-option>
      </a-select>
    </div>
    <div style="margin-top:40px;"> 
      <a-checkbox @change="onChange">Checkbox</a-checkbox>
    </div>
    <div style="margin-top:40px;"> 
      <a-checkbox @change="onChange">Checkbox</a-checkbox>
    </div>

    <template slot="footer">
        <a-button class="btn-primary" key="add Room" type="primary" :loading="loading" @click="closeModal">
          add Room
        </a-button>
      </template>
    <!-- <a-checkbox @change="onChange">Checkbox</a-checkbox> -->
    </a-modal>
  </div>
</template>
<script>
import DropDown from "./DropDown"
export default {
  components:{
    DropDown
  },
  props: ['visible'],
  data() {
    return {
      value: 3,
    };
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal');
      this.visible = false;
    }
  }
};
</script>
<style scoped>
.modal-add-room{
  padding-top: 30px;
  padding-left: 50px;
  padding-right: 50px;
  line-height: 10px;
}
.block-container{
  margin-bottom: 30px;
}
</style>