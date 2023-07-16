<!--
 * @Description-en:Login Page
 * @Description-zh:前置页面
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 18:10:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-16 15:29:20
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
  <div id="loginPage">
    <router-view />
    <div class="footer">
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
  width: 100%;
  min-width: 375px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--loginPage-bgc);

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 4%;
    margin-bottom: 2%;
    user-select: none;
    color: var(--footer-textColor);
  }

  a {
    color: var(--footer-textColor);
    text-decoration: none;
    outline: none;
  }
}
</style>
