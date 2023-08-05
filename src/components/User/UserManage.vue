<!--
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-06 23:34:42
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-05 10:54:42
-->
<script setup>
import { ref, onMounted } from "vue";
import { getAllUser, adminUpdate, deleteUser } from "@/api/user";
import { findDepartment, showTeams } from "@/api/department";
import { getUserList } from "@/utils/dataList";
import UseInfoStore from "@/store/user";
import { messageTip } from "@/utils/reminder";

const userStore = UseInfoStore();
const { authority } = userStore.userInfo;

const tableData = ref();

// 值为 1 时，修改用户信息
// 值为 2 时，删除用户
const operation = ref(0);

// 修改用户信息
const userInfo = ref({
  id: "",
  userName: "",
  authority: 2,
  sex: "",
  departmentName: "",
  reason: "",
});

const formLabelWidth = "100px";

// 弹出框总控
const dialogSwitch = ref({
  userInfo: false,
  reason: false,
  remove: false,
});

const links = ref([]);

// 性别
const sexOptions = ["绅士", "淑女", "保密"];

// 修改用户信息
const modifyInfo = async (info) => {
  // 信息填充
  userInfo.value = {
    ...info,
  };
  // 小组信息
  const list = await loadAll();
  links.value = list.map((item) => {
    return {
      id: item.id,
      value: item.departmentName,
    };
  });
  dialogSwitch.value.userInfo = true;
};

// 提交修改
const submitInfo = async () => {
  // 判断用户的权限是否是超级管理员
  if (authority === 4) {
    // 直接修改不需要申请理由
    const res = await adminUpdate(userInfo).catch((err) => {
      console.log(err);
      messageTip("error", err.response.data.msg);
    });
    if (res.msg === "success") {
      messageTip("success", "修改成功");
      getUserList(tableData, getAllUser, findDepartment);
    }
  } else {
    // 需要申请理由
    dialogSwitch.value.reason = true;
    operation.value = 1;
  }
  dialogSwitch.value.userInfo = false;
};

// 修改理由
const submitReason = async () => {
  // TODO:封装整理
  if (userInfo.value.reason) {
    if (operation.value === 1) {
      // 修改用户信息
      const res = await adminUpdate(userInfo).catch((err) => {
        messageTip("error", err.response.data.msg);
        dialogSwitch.value.reason = false;
      });
      if (res.msg === "success") {
        messageTip("success", "客官别急，小的加急给你处理");
        getUserList(tableData, getAllUser, findDepartment);
      }
    } else {
      // 删除用户
      const res = await deleteUser(userInfo).catch((err) => {
        messageTip("error", err.response.data.msg);
        dialogSwitch.value.reason = false;
      });
      if (res.msg) {
        messageTip("success", "客官别急，小的加急给你处理");
        getUserList(tableData, getAllUser, findDepartment);
      }
    }
  } else {
    messageTip("error", "申请理由不能为空");
  }
  dialogSwitch.value.reason = false;
};

// 删除用户
const removeUser = (info) => {
  userInfo.value = {
    ...info,
  };

  dialogSwitch.value.remove = true;
};

// 确认删除
const confirmRemove = async () => {
  if (authority === 4) {
    // 可以直接删除
    const res = await deleteUser(userInfo).catch((err) => {
      messageTip("error", err.response.data.msg);
    });
    if (res.msg === "success") {
      messageTip("success", "删除成功");
      getUserList(tableData, getAllUser, findDepartment);
    }
  } else {
    operation.value = 2;
    dialogSwitch.value.reason = true;
  }
  dialogSwitch.value.remove = false;
};

// 小组信息请求
const loadAll = async () => {
  const res = await showTeams();
  return res.data.teamList;
};

let timeout;
const querySearchAsync = (queryString, cb) => {
  const results = queryString ? links.value.filter(queryString) : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};

// 获取小组 id
const handleSelect = (item) => {
  userInfo.value.departmentId = item.id;
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
          <el-check-tag checked class="ml-2" @click="modifyInfo(scope.row)"
            >修改用户信息</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click.prevent="removeUser(scope.row)"
          >
            移除用户
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改用户信息 -->
    <el-dialog v-model="dialogSwitch.userInfo" title="修改用户信息">
      <el-form :model="userInfo">
        <!-- 用户名 -->
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="userInfo.userName"
            autocomplete="off"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <!-- 权限 -->
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-radio-group v-model="userInfo.authority">
            <el-radio :label="1">游客</el-radio>
            <el-radio :label="2">普通用户</el-radio>
            <el-radio :label="3">管理员</el-radio>
            <el-radio :label="4">超级管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="userInfo.sex" placeholder="性别">
            <el-option
              v-for="item in sexOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 小组 -->
        <el-form-item label="组别" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="userInfo.departmentName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择组别"
            @select="handleSelect"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.userInfo = false">取消</el-button>
          <el-button type="primary" @click="submitInfo()"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 删除用户 -->
    <el-dialog v-model="dialogSwitch.remove" title="删除用户">
      <span>此操作不可逆，是否继续</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.remove = false">取消</el-button>
          <el-button type="primary" @click="confirmRemove()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改理由 -->
    <el-dialog v-model="dialogSwitch.reason" title="申请理由">
      <el-input
        v-model="userInfo.reason"
        :autosize="{ minRows: 2, maxRows: 6 }"
        type="textarea"
        placeholder="请填写修改理由"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.remove = false">取消</el-button>
          <el-button type="primary" @click="submitReason()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less"></style>
