<!--
 * @Description-en:Login Page
 * @Description-zh:前置页面
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-18 20:04:17
-->
<script setup>
import { onMounted } from "vue";
import { recallTheme } from "@/utils/index";

onMounted(() => {
  // 首次渲染获取用户设置的主题
  recallTheme();
});
</script>

<template>
  <div
    id="loginPage"
    class="w100% h100vh items-center flex justify-center flex-col"
  >
    <router-view />
    <div
      class="footer w100% flex items-center flex-col mt-4% mb-2% select-none"
    >
      <div>
        <a href="javascript:;"
          ><span>{{ $t("loginPage.privateCon") }}</span></a
        >
        |
        <a href="javascript:;"
          ><span>{{ $t("loginPage.policyAgree") }}</span></a
        >
      </div>
      <div>
        Copyright © 2023
        <a href="javascript:;">
          <span>JohnsonXin</span>
        </a>
        &
        <a href="javascript:;">
          <span>泽泽</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#loginPage {
  min-width: 375px;
  background: var(--loginPage-bgc);

  .footer {
    color: var(--footer-textColor);
  }

  a {
    color: var(--footer-textColor);
    text-decoration: none;
    outline: none;
  }
}
</style>
