<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:34:42
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-18 23:43:15
-->
<script setup>
import { ref, onMounted } from "vue";
import { getAllUser } from "@/api/user";

const tableData = ref();

// 删除行
const deleteRow = (index) => {
  tableData.value.splice(index, 1);
};

onMounted(async () => {
  const user = await getAllUser();
  tableData.value = user.data.users;
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
      <el-table-column fixed prop="userName" label="userName" width="250" />
      <el-table-column prop="role" label="role" width="200" />
      <el-table-column prop="registerTime" label="registerTime" width="300" />
      <el-table-column label="operate" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2">修改用户权限</el-check-tag>
          <el-check-tag checked class="ml-2">修改用户信息</el-check-tag>
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
  </div>
</template>

<style scoped lang="less">
#UserManage {
}
</style>
