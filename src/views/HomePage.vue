<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-18 09:54:34
-->
<script setup>
import { ref } from "vue";
import LeftMenu from "../layouts/LeftMenu.vue";
import TopNavbar from "../layouts/TopNavbar.vue";
import globalConfig from "../utils/globalConfig";
const collapse = ref(globalConfig.layout.isCollapse);

// watch(collapse, (preValue, newValue) => {
//   console.log("old,new", preValue, newValue);
// });
</script>

<template>
  <div id="HomePage">
    <div class="topBar">
      <TopNavbar />
    </div>

    <div class="main-content">
      <div class="sideBar" :class="{ sidebarOff: collapse }">
        <LeftMenu @update-value="collapse = $event" />
      </div>
      <div class="main" :class="{ mainOff: collapse }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="less">
#HomePage {
  width: 100%;
  height: 100vh;
  background-color: var(--homePage-bgc);

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

    .sidebarOff {
      width: 4%;
    }

    .main {
      // flex: 1;
      position: relative;
      left: 13%;
      top: 5.5%;
      height: 100vh;
      width: calc(100% - 13%);
      overflow-y: auto;
      box-sizing: border-box;
      transition: all 0.3s ease-in;
      margin: 2%;
    }

    .mainOff {
      left: 4%;
      width: calc(100% - 4%);
    }
  }
}
</style>
