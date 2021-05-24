<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleMenuClick">
      <template  v-for="item in menulist">
      <a-menu-item :key="item.id" >{{item.value}}</a-menu-item>
      </template>
    </a-menu>
    <div class="dd-button-container">
      <a-button block> 
        {{ select }} 
        <a-icon type="down" /> 
      </a-button>
    </div>
  </a-dropdown>
</template>
<script>
export default {
  props: ["title", "menulist"],
  data(){
    return{
      iconType:"user",
      select:this.title
    }
  },
  methods:{
    handleMenuClick(e) {
      this.select = this.menulist[e.key-1].value
      this.$emit("selectValue", {
        id: this.menulist[e.key-1].id, 
        value: this.menulist[e.key-1].value
      });
    },
  },
  watch: {
    title(newVal) {
      if (newVal) {
        this.select = this.title
      }
    },
  },
};
</script>
<style scoped>
.dd-button-container{
  justify-content: space-between;
  display: flex;
  width: 109px;
  height: 32px;
}
</style>
