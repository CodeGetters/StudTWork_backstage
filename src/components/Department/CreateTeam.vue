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

// const loadAll = async () => {
//   // const res = await adminList();
//   return [
//     { value: "vue", link: "https://github.com/vuejs/vue" },
//     { value: "element", link: "https://github.com/ElemeFE/element" },
//     { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
//     { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
//     { value: "vuex", link: "https://github.com/vuejs/vuex" },
//     { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
//     { value: "babel", link: "https://github.com/babel/babel" },
//   ];
// };

let timeout = null;

// 异步搜索
// const querySearchAsync = async (queryString, cb) => {
//   const results = queryString
//     ? links.value.filter(createFilter(queryString))
//     : links.value;

//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     cb(results);
//   }, 3000 * Math.random());
// };

// const createFilter = (queryString) => {
//   return (restaurant) => {
//     return (
//       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
//     );
//   };
// };

// 获取选择后的 value;
const handleSelect = (item) => {
  ruleForm.value.state = item.value;
};

onMounted(() => {
  adminList().then((res) => {
    links.value = res.data.adminList;
    console.log(links.value);
  });
  // links.value = loadAll();
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

<style></style>
