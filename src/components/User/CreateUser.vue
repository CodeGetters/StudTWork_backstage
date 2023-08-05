<script setup>
import { ref, onMounted } from "vue";
import { createDepartment } from "@/api/department";
import { messageTip } from "@/utils/reminder";
// TODO:待完善
const ruleFormRef = ref();

const userInfo = ref({
  userName: "",
  sex: "",
  pwd: "",
  departmentId: "",
});

// 表单信息
const ruleForm = ref({});

// 校验规则
const rules = ref({
  departmentName: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  departmentIntro: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
});

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await createDepartment(ruleForm).catch((err) => {
        messageTip("error", err.response.data.msg);
      });
      if (res.msg === "success") messageTip("success", "创建成功🥰");
      else messageTip("error", "崩溃了，请联系管理员修复bug😥~");
    } else {
      // 返回错误原因
      console.log("error submit!", fields);
      messageTip("error", "创建失败，你都还没有填好信息怎么创建呀😒~");
    }
  });
};

const sexOptions = ["绅士", "淑女", "保密"];

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
];

// TODO:error 信息弹两次
onMounted(() => {});

// TODO：执行了两次
console.log("这个组件会被执行两次吗？");
</script>

<template>
  <div
    id="CreateTeam"
    class="w100% h100% bg-#fff flex items-center justify-center"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="p3"
      status-icon
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="departmentName">
        <el-input
          v-model="ruleForm.departmentName"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="departmentAdmin">
        <el-select v-model="userInfo.sex" placeholder="Select">
          <el-option
            v-for="item in sexOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 部门 -->
      <el-form-item label="部门">
        <el-select
          v-model="userInfo.departmentId"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="departmentIntro">
        <el-input
          v-model="ruleForm.departmentIntro"
          placeholder="请输入登录密码"
        />
      </el-form-item>

      <!-- 二次密码 -->
      <el-form-item label="密码" prop="departmentIntro">
        <el-input
          v-model="ruleForm.departmentIntro"
          placeholder="请再次输入密码"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          创建用户
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
