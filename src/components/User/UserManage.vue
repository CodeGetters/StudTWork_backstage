<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:34:42
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-03 16:26:27
-->
<script setup>
import { ref, onMounted } from "vue";
import { getAllUser } from "@/api/user";
import { findDepartment } from "@/api/department";
import { getUserList } from "@/utils/dataList";

const tableData = ref();

// 修改用户信息
const userInfo = ref({
  userName: "",
  role: "",
});
// 修改用户权限
const radio1 = ref("");

// 弹出框总控
const dialogSwitch = ref({
  userInfo: false,
  authority: false,
  remove: false,
});

// 删除行
const deleteRow = () => {
  dialogSwitch.value.remove = true;
  // tableData.value.splice(index, 1);
};

onMounted(() => {
  getUserList(tableData, getAllUser, findDepartment);
});
</script>

<template>
  <div id="UserManage" class="w100% h100%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="userId" label="id" width="50" />
      <el-table-column prop="userName" label="用户名" width="200" />
      <el-table-column prop="role" label="角色" width="200" />
      <el-table-column prop="departmentName" label="组别" width="180" />
      <el-table-column prop="registerTime" label="注册时间" width="240" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag
            checked
            class="ml-2"
            @click="dialogSwitch.userInfo = true"
            >修改用户信息</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click="dialogSwitch.authority = true"
            >修改用户权限</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click.prevent="deleteRow(scope.$index)"
          >
            移除用户
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改用户信息 -->
    <el-dialog v-model="dialogSwitch.userInfo" title="修改用户信息" width="30%">
      <el-form :model="userInfo">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="userInfo.role" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userInfo.role" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组别">
          <el-input v-model="userInfo.role" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.userInfo = false">取消</el-button>
          <el-button type="primary" @click="dialogSwitch.userInfo = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改用户权限 -->
    <el-dialog v-model="dialogSwitch.authority" title="Tips" width="30%">
      <el-radio-group v-model="radio1">
        <el-radio label="1" size="large" border>游客</el-radio>
        <el-radio label="2" size="large" border>普通用户</el-radio>
        <el-radio label="3" size="large" border>管理员</el-radio>
      </el-radio-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.authority = false">取消</el-button>
          <el-button type="primary" @click="dialogSwitch.authority = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogSwitch.remove" title="Tips" width="30%">
      <span>此操作不可逆，是否继续</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.remove = false">取消</el-button>
          <el-button type="primary" @click="dialogSwitch.remove = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less"></style>
