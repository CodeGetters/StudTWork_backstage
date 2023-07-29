<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:48:32
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 15:17:43
-->
<script setup>
import { Tickets, User, View, Clock } from "@element-plus/icons-vue";

import UseInfoStore from "@/store/user.js";
import { getLastInfo } from "@/api/location";
import { onMounted, ref } from "vue";
import { normalDate } from "@/utils/formatTime";

const infoStore = UseInfoStore();

const loginMsg = ref({
  loginTime: "",
  city: "",
  province: "",
});

const registerTime = normalDate(infoStore.userInfo.userRegister);

const loginInfo = async (loginMsg) => {
  const res = await getLastInfo().catch((err) => {
    console.log(err);
  });
  loginMsg.value = {
    ...res.data.loginInfo,
  };
};

onMounted(() => {
  loginInfo(loginMsg);
});
</script>

<template>
  <div id="UserCenter" class="w100% h100%">
    <el-descriptions :column="2" border class="bg-#fff">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
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
            <el-icon>
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
            <el-icon>
              <tickets />
            </el-icon>
            组别
          </div>
        </template>
        <el-tag size="default">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            最后一次登录位置
          </div>
        </template>
        <el-tag size="default">
          {{ `${loginMsg.province}-${loginMsg.city}` }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Clock />
            </el-icon>
            加入时间
          </div>
        </template>
        {{ registerTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Clock />
            </el-icon>
            最后一次登录时间
          </div>
        </template>
        {{ normalDate(loginMsg.loginTime) }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="less"></style>
