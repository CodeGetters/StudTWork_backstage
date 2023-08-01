<script setup>
// import { showDepartments } from "@/api/department";
import { ref, onMounted } from "vue";
let tableData = ref(null);

onMounted(() => {});
</script>

<template>
  <div id="ManageTeam" class="w100% h100% bg-#fff p2%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="userId" label="id" width="100" />
      <el-table-column prop="userName" label="小组名" width="250" />
      <el-table-column prop="role" label="小组介绍" width="200" />
      <el-table-column prop="registerTime" label="注册时间" width="300" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2" @click="dialogUserInfo = true"
            >修改小组信息</el-check-tag
          >
          <el-check-tag checked class="ml-2" @click="dialogUserRole = true"
            >修改小组权限</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click.prevent="deleteRow(scope.$index)"
          >
            移除小组
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style></style>
