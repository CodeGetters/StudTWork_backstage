<!-- <script setup>
import { ref, onMounted } from "vue";
import { adminList } from "@/api/user";
import { createDepartment } from "@/api/department";
import { messageTip } from "@/utils/reminder";

const ruleFormRef = ref();

// 表单信息
const ruleForm = ref({
  departmentName: "",
  departmentIntro: "",
  departmentAdmin: "",
});

// 管理员列表
const options = ref([]);

// 校验规则
const rules = ref({
  departmentName: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  departmentIntro: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
  departmentAdmin: [{ required: true, message: "please ", trigger: "blur" }],
});

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await createDepartment(ruleForm).catch((err) => {
        messageTip("error", err.response.data.msg);
      });
      if (res.msg === "success") {
        messageTip("success", "创建成功🥰");
      } else {
        messageTip("error", "崩溃了，请联系管理员修复bug😥~");
      }
    } else {
      // 返回错误原因
      console.log("error submit!", fields);
      messageTip("error", "创建失败，你都还没有填好信息怎么创建呀😒~");
    }
  });
};

// 获取管理员列表
const getAdmin = async () => {
  // TODO:执行了两次请求
  const res = await adminList().catch((err) => {
    messageTip("error", err.response.data.msg);
  });
  if (res) {
    options.value = res.data.adminList;
  }
};
// TODO：路由只跳转了一次！
console.log("这个组件为什会执行两次？？？？");

onMounted(() => {
  getAdmin();
});
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
      <el-form-item label="小组名" prop="departmentName">
        <el-input v-model="ruleForm.departmentName" placeholder="请输入组名" />
      </el-form-item>

      <el-form-item label="小组管理员" prop="departmentAdmin">
        <el-select v-model="ruleForm.departmentAdmin" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="小组描述" prop="departmentIntro">
        <el-input
          v-model="ruleForm.departmentIntro"
          type="textarea"
          placeholder="请输入小组描述"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          创建小组
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style> -->

<!-- TODO:elementPlus issues -->
<script setup>
import { reactive, ref, onMounted } from "vue";
import { adminList } from "@/api/user";

const ruleFormRef = ref();

const ruleForm = ref({
  name: "",
  desc: "",
  state: "",
});

// 规则
const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
  state: [{ required: true, message: "please !@", trigger: "blur" }],
});

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const links = ref([]);

const loadAll = async () => {
  const res = await adminList();
  return res.data.adminList;
};

let timeout = null;

// 获取选择后的 value;
const handleSelect = (item) => {
  ruleForm.value.state = item.value;
};

onMounted(async () => {
  const list = await loadAll();
  links.value = list.map((item) => {
    return {
      id: item.id,
      value: item.userName,
    };
  });
});

const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
</script>

<template>
  <div id="CreateTeam" class="w100% h100%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm bg-#fff p3%"
      status-icon
    >
      <!-- 只有超级管理员才能创建组 -->
      <el-form-item label="组名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入组名" />
      </el-form-item>

      <el-form-item label="选择管理员" prop="state">
        <el-autocomplete
          v-model="ruleForm.state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请选择管理员"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="小组描述" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          type="textarea"
          placeholder="请输入小组描述"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          创建小组
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
