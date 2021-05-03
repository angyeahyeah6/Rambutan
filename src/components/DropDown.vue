<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleMenuClick">
      <template v-for="item in menulist">
      <a-menu-item :key="item.index" >{{item.value}}</a-menu-item>
      </template>
    </a-menu>
    <div class="dd-button-container">
      <a-button block> 
        {{ title }} 
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
    }
  },
  methods:{
    handleMenuClick(e) {
      console.log(e)
      this.title = this.menulist[e.key-1].value;
    },
  }
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
