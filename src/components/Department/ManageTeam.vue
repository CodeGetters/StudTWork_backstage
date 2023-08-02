<script setup>
import { showDepartments } from "@/api/department";
import { ref, onMounted } from "vue";
import { includeSecond } from "@/utils/formatTime";

let tableData = ref(null);

const getDepartments = async () => {
  const departmentList = await showDepartments();
  let count = 1;
  let departmentLen = departmentList.data.departmentList.length;

  departmentList.data.departmentList.forEach((item) => {
    item.departmentRegister = includeSecond(item.departmentRegister);
    item.lastUpdate = includeSecond(item.lastUpdate);
    if (count <= departmentLen) item.departmentId = count++;
  });
  tableData.value = departmentList.data.departmentList;
  // console.log(tableData.value);
};

onMounted(() => {
  getDepartments();
});
</script>

<template>
  <div id="ManageTeam" class="w100% h100% bg-#fff">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
      class="w100% h100%"
    >
      <el-table-column fixed prop="departmentId" label="id" width="100" />
      <el-table-column prop="departmentName" label="小组名" width="250" />
      <el-table-column
        prop="users[0].userName"
        label="小组管理员"
        width="200"
      />
      <el-table-column prop="departmentNum" label="小组人数" width="200" />
      <el-table-column prop="departmentRegister" label="注册时间" width="300" />
      <el-table-column prop="departmentIntro" label="小组介绍" width="200" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <!-- TODO：修改小组名，小组介绍，小组管理员 -->
          <el-check-tag checked class="ml-2" @click="dialogUserInfo = true"
            >修改小组信息</el-check-tag
          >
          <!-- TODO：点击展示所有小组成员 -->
          <el-check-tag checked class="ml-2">查看小组成员</el-check-tag>
          <!-- TODO：删除小组 -->
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
