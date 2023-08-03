<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:38:14
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-03 12:16:17
-->
<script setup>
import ClockChart from "./Echarts/ClockChart.vue";
</script>

<template>
  <div id="UserHome" class="w100% h100% bg-#fff">
    {{ $t("layout.homePage") }}
    <ClockChart />
  </div>
</template>

<style lang="less"></style>
