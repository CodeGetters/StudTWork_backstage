<!--
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-20 16:51:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 11:31:15
-->
<script setup>
import { ref, watch } from "vue";
import LeftMenu from "@/layouts/LeftMenu.vue";
import TopNavbar from "@/layouts/TopNavbar.vue";
import globalConfig from "@/utils/globalConfig";
const collapse = ref(globalConfig.layout.isCollapse);

import router from "@/router";

const loading = ref(false);

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    loading.value = true;
    console.log(`router address changed from ${oldValue} to ${newValue}`);
  },
  { immediate: true },
);
</script>

<template>
  <div id="HomePage" class="w100% h100vh">
    <div class="h5% w100% fixed">
      <TopNavbar />
    </div>

    <div class="main-content w100% flex flex-row">
      <div
        class="sideBar h94.5% top-5.5% w13% fixed"
        :class="{ sidebarOff: collapse }"
      >
        <LeftMenu @update-value="collapse = $event" />
      </div>
      <div
        class="main relative left-13% top-5.5% h100vh m-2%"
        :class="{ mainOff: collapse }"
      >
        <div
          class="main-container w96% h88%"
          element-loading-text="Loading..."
          v-loading="loading"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#HomePage {
  background-color: var(--homePage-bgc);

  .main-content {
    height: calc(100vh - 5.5%);

    .sideBar {
      overflow-y: auto;
    }

    .sidebarOff {
      width: 4%;
    }

    .main {
      width: calc(100% - 13%);
      overflow-y: auto;
      box-sizing: border-box;
      transition: all 0.3s ease-in;
    }

    .mainOff {
      left: 4%;
      width: calc(100% - 4%);
    }
  }
}
</style>
