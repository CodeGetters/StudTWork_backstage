<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:48:32
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-02 12:30:03
-->
<script setup>
import { Tickets, User, View, Clock, Male } from "@element-plus/icons-vue";

import UseInfoStore from "@/store/user.js";
import { getLastInfo } from "@/api/location";
import { findDepartment } from "@/api/department";
import { onMounted, ref } from "vue";
import { normalDate } from "@/utils/formatTime";

const infoStore = UseInfoStore();

const loginMsg = ref({
  loginTime: "",
  city: "",
  province: "",
});

const userMsg = ref({
  userSex: infoStore.userInfo.sex,
  department: "未分配",
  registerTime: normalDate(infoStore.userInfo.userRegister),
});

// 小组 id
const departmentId = infoStore.userInfo.departmentId;

// 查找小组名
const searchDepartment = async (userMsg, departmentId) => {
  if (departmentId !== 0) {
    const res = await findDepartment(departmentId);
    userMsg.value.department = res.data.info.departmentName;
  }
};

// 获取登录信息
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
  searchDepartment(userMsg, departmentId);
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
              <Male />
            </el-icon>
            性别
          </div>
        </template>
        {{ userMsg.userSex }}
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
        <el-tag size="default"> {{ userMsg.department }}</el-tag>
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
            注册时间
          </div>
        </template>
        {{ userMsg.registerTime }}
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
