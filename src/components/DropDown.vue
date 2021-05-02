<template>
    <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
        </a-menu>
      <a-button> {{title}} <a-icon type="down" /> </a-button>
      </a-dropdown>
</template>
<script>

export default {
    props:["title"]
};
</script>
<style scoped>

</style>