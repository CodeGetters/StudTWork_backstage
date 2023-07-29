<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:34:42
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-22 11:35:32
-->
<script setup>
import { ref, onMounted } from "vue";
import { getAllUser } from "@/api/user";
import dayjs from "dayjs";
const tableData = ref();

// 修改用户信息
const dialogUserInfo = ref(false);
const userInfo = ref({
  userName: "",
  role: "",
});
// 修改用户权限
const radio1 = ref("");
const dialogUserRole = ref(false);

// 删除用户
const dialogDelete = ref(false);

// 删除行
const deleteRow = () => {
  dialogDelete.value = true;
  // tableData.value.splice(index, 1);
};

onMounted(async () => {
  const user = await getAllUser();
  let count = 1;
  let userLength = user.data.users.length;
  user.data.users.forEach((item) => {
    item.registerTime = dayjs().format("YYYY-MM-DD HH-mm:ss");
    if (count <= userLength) item.userId = count++;
  });
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
      <el-table-column fixed prop="userId" label="id" width="100" />
      <el-table-column prop="userName" label="用户名" width="250" />
      <el-table-column prop="role" label="角色" width="200" />
      <el-table-column prop="registerTime" label="注册时间" width="300" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2" @click="dialogUserInfo = true"
            >修改用户信息</el-check-tag
          >
          <el-check-tag checked class="ml-2" @click="dialogUserRole = true"
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
    <el-dialog
      v-model="dialogUserInfo"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="userInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userInfo.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="userInfo.role" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogUserInfo = false">取消</el-button>
          <el-button type="primary" @click="dialogUserInfo = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogUserRole"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-radio-group v-model="radio1">
        <el-radio label="1" size="large" border>游客</el-radio>
        <el-radio label="2" size="large" border>普通用户</el-radio>
        <el-radio label="3" size="large" border>管理员</el-radio>
      </el-radio-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogUserRole = false">取消</el-button>
          <el-button type="primary" @click="dialogUserRole = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogDelete"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>此操作不可逆，是否继续</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDelete = false">取消</el-button>
          <el-button type="primary" @click="dialogDelete = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less"></style>
