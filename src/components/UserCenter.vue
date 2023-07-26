<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:48:32
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-26 23:59:44
-->
<script setup>
import { computed, ref } from "vue";
import {
  OfficeBuilding,
  Tickets,
  User,
  View,
  Clock,
} from "@element-plus/icons-vue";

import UseInfoStore from "../store/user.js";
import dayjs from "dayjs";

const infoStore = UseInfoStore();

const size = ref("large");

const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});

console.log(infoStore.userInfo);
const show = ref(false);

const registerTime = dayjs(infoStore.userInfo.userRegister).format(
  "YYYY-MM-DD hh-mm",
);
</script>

<template>
  <div id="UserCenter" class="w100% h100% bg-#fff">
    <el-descriptions
      :title="$t('layout.userCenter')"
      :column="3"
      :size="size"
      border
      v-show="!show"
    >
      <template #extra>
        <el-button type="primary">Operation</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户名
          </div>
        </template>
        {{ infoStore.userInfo.userName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <View />
            </el-icon>
            角色等级
          </div>
        </template>
        普通用户
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Clock />
            </el-icon>
            注册时间
          </div>
        </template>
        {{ registerTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            组别
          </div>
        </template>
        <!-- TODO：对用户进心分组管理 -->
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            个人说明
          </div>
        </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <!-- TODO：delete -->
    <el-descriptions
      :title="$t('layout.userCenter')"
      :column="3"
      :size="size"
      border
      v-show="show"
    >
      <template #extra>
        <el-button type="primary">Operation</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> </el-icon>
            Username
          </div>
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> </el-icon>
            Telephone
          </div>
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> </el-icon>
            Place
          </div>
        </template>
        Suzhou
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> </el-icon>
            Remarks
          </div>
        </template>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> </el-icon>
            Address
          </div>
        </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="less">
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
