<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-07 10:52:30
-->
<script setup>
// import { changeTheme } from "@/utils/index.js";
import LeftMenu from "../layouts/LeftMenu.vue";
import TopNavbar from "../layouts/TopNavbar.vue";
</script>

<template>
  <div id="HomePage">
    <div class="topBar">
      <TopNavbar />
    </div>

    <div class="main-content">
      <div class="sideBar">
        <LeftMenu />
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="less">
#HomePage {
  width: 100%;
  height: 100vh;

  .topBar {
    height: 5%;
    width: 100%;
    position: fixed;
  }

  .main-content {
    height: calc(100vh - 5.5%);
    width: 100%;
    display: flex;
    flex-direction: row;

    .sideBar {
      height: 94.5%;
      top: 5.5%;
      width: 13%;
      position: fixed;
      overflow-y: auto;
    }

    .main {
      flex: 1;
      position: relative;
      left: 13%;
      top: 5.5%;
      height: 100vh;
      font-size: 40px;
      width: calc(100% - 13%);
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
}
</style>
