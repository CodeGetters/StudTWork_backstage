<script setup>
import { ref, onMounted } from "vue";
import {
  findArticle,
  updatePublicInfo,
  updatePublicCon,
  deletePublic,
} from "@/api/article";
import { getArticleList } from "@/utils/articleList";
import { useRouter } from "vue-router";
const router = useRouter();

// 从 token 中获取用户权限信息
import UseInfoStore from "@/store/user";
const infoStore = UseInfoStore();
const userAuthority = infoStore.userInfo.authority;
const updateUser = infoStore.userInfo.id;

// 查看文章
const JumpLinkTo = (path, id) => {
  router.push({
    path,
    query: { id },
  });
};

// 表格数据
const tableData = ref();

// 表单宽度
const formLabelWidth = "100px";

// 弹出框控制
const dialogSwitch = ref({
  dialogArticleCon: false, // 修改文章内容
  dialogArticleInfo: false, // 修改文章信息
  articleDelete: false, // 删除文章
  dialogReason: false, // 填写修改
});

// 文章信息
const articleInfo = ref({
  id: "", //数据库中的文章 id
  articleName: "", // 文章名
  author: "", // 作者
  isPublic: "", // 是否公开
  visualArr: [], // 文章可见范围
  visualRange: "", // 文章可见范围
  articleCon: "", // 文章内容
  // TODO：判断是否是本人操作或者是超级管理员
  modifyReason: "", // 修改理由
  userId: "", // 文章作者
});

// 管理员操作 1 -> 更改信息 | 2 -> 更改内容 | 3 -> 删除文章
// 超级管理员或文章发布者操作 4 -> 更改信息 | 4 -> 更改内容 | 6 -> 删除文章
let operation = ref(0);
// TODO;
const operateObj = {
  1: () => {
    operateApi(updatePublicInfo);
  },
  2: () => {
    operateApi(updatePublicCon);
  },
  3: () => {
    operateApi(deletePublic);
  },
  4: () => {},
};

// 操作请求 api
const operateApi = async (postApi) => {
  const res = await postApi(articleInfo).catch((err) => {
    messageTip("error", "操作失败");
    console.log(err);
  });
  if (res.msg === "managerSuccess") {
    // 管理员操作
    getArticleList(tableData, findArticle);
    messageTip("success");
  } else if (res.msg === "authorOrSuperSuccess") {
    // 超级管理员或文章发布者操作
    getArticleList(tableData, findArticle);
    messageTip("success", "修改成功");
  } else {
    messageTip("error", res.msg);
  }
};

const getReason = () => {
  // 处理填写值为空的情况
  if (!articleInfo.value.modifyReason) {
    messageTip("error", "请填写修改理由");
  } else {
    // 根据操作参数调用相应的 api
    operateObj[operation.value]();
  }
  dialogSwitch.value.dialogReason = false;
};

// 修改结果提示
const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: !msg ? "操作成功，请耐心等待超管大大的审核~" : msg,
    type,
  });
};

// 自动填充文章信息
// -1 -> 隐藏||0 -> 公开(1234)||1 -> 游客||2 -> 普通用户||3 -> 管理员||4 -> 超级管理员
const getArticleInfo = (info) => {
  const proxyInfo = new Proxy(info, {});

  // 文章不公开
  if (proxyInfo.visualRange === "-1") {
    proxyInfo.isPublic = "-1";
    // 文章全部公开
  } else if (proxyInfo.visualRange === "0") {
    proxyInfo.isPublic = "0";
    proxyInfo.visualArr = ["1", "2", "3", "4"];
  } else {
    // 文章部分公开
    proxyInfo.isPublic = "0";
    proxyInfo.visualArr = proxyInfo.visualRange.split("");
  }

  articleInfo.value = {
    ...proxyInfo,
  };

  dialogSwitch.value.dialogArticleInfo = true;
};

// 提交修改后的文章信息
const articleSubmit = async () => {
  const visArr = articleInfo.value.visualArr;
  // 处理点击公开缺没有选择范围的情况
  let isReq = true;

  // 隐藏文章
  if (articleInfo.value.isPublic === "-1") {
    articleInfo.value.visualRange = "-1";
  } else {
    // 处理点击公开缺没有选择范围的情况
    if (!visArr || visArr.length === 0) {
      messageTip("error", "操作失败，请选择公开范围");
      isReq = false;
    } else {
      articleInfo.value.visualRange = Object.values(
        articleInfo.value.visualArr,
      ).join("");
    }
  }

  if (isReq) {
    // 修改操作值
    operation.value = 1;

    console.log("修改者 id", updateUser);
    console.log("发布者 id：", articleInfo.value.userId);
    // 判断用户的权限是否是超级管理员或者是文章发布者
    if (!(userAuthority === 4 || updateUser === articleInfo.value.userId)) {
      // 触发打开填写修改理由对话框
      dialogSwitch.value.dialogReason = true;
    } else {
      // 直接执行相应的 api
      operateObj[operation.value]();
    }
  }
  dialogSwitch.value.dialogArticleInfo = false;
};

// 自动填充文章内容
const getArticleCon = (info) => {
  // 自动填充原有的信息
  const proxyInfo = new Proxy(info, {});
  articleInfo.value = {
    ...proxyInfo,
  };

  dialogSwitch.value.dialogArticleCon = true;
};

// 提交修改后的文章内容
const articleConSubmit = async () => {
  // 修改操作值
  operation.value = 2;
  // 判断用户的权限是否是超级管理员或者是文章发布者
  if (!(userAuthority === 4 || updateUser === articleInfo.value.userId)) {
    // 触发打开填写修改理由对话框
    dialogSwitch.value.dialogReason = true;
  } else {
    // 直接执行相应的 api
    operateObj[operation.value]();
  }

  dialogSwitch.value.dialogArticleCon = false;
};

// 获取需要删除的文章 id
const deleteArticle = (info) => {
  const proxyInfo = new Proxy(info, {});
  articleInfo.value = {
    ...proxyInfo,
  };
  dialogSwitch.value.articleDelete = true;
};

// 确认删除文章
const delSubmit = async () => {
  // 修改操作值
  operation.value = 3;
  console.log(userAuthority);
  console.log(updateUser);
  console.log(articleInfo.value.userId);
  // 判断用户的权限是否是超级管理员或者是文章发布者
  if (!(userAuthority === 4 || updateUser === articleInfo.value.userId)) {
    // 触发打开填写修改理由对话框
    dialogSwitch.value.dialogReason = true;
  } else {
    // 直接执行相应的 api
    operateObj[operation.value]();
  }
  dialogSwitch.value.articleDelete = false;
};

onMounted(() => {
  // 渲染图表数据
  getArticleList(tableData, findArticle);
});
</script>

<template>
  <div id="MyArticle" class="w100% h100%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="articleId" label="id" width="60" />
      <el-table-column
        prop="articleName"
        :label="$t('article.articleTitle')"
        width="200"
      />
      <el-table-column
        prop="author"
        :label="$t('article.author')"
        width="130"
      />
      <el-table-column
        prop="releaseTime"
        :label="$t('article.releaseTime')"
        width="210"
      />
      <el-table-column
        prop="lastUpdate"
        :label="$t('article.lastUpdate')"
        width="210"
      />
      <el-table-column
        prop="readers"
        :label="$t('article.readers')"
        width="100"
      />
      <el-table-column :label="$t('article.operation')" width="660">
        <template #default="scope">
          <!-- 修改文章信息 -->
          <el-check-tag
            checked
            class="ml-2"
            @click="getArticleInfo(scope.row, scope.$index)"
            >{{ $t("article.modifyInfo") }}</el-check-tag
          >

          <!-- 修改文章内容 -->
          <el-check-tag
            checked
            class="ml-2"
            @click="getArticleCon(scope.row, scope.$index)"
            >{{ $t("article.modifyCon") }}</el-check-tag
          >

          <!-- 删除文章 -->
          <el-check-tag
            checked
            class="ml-2"
            @click="deleteArticle(scope.row, scope.$index)"
          >
            {{ $t("article.deleteArticle") }}
          </el-check-tag>

          <!-- 查看文章 -->
          <el-check-tag
            checked
            class="ml-2"
            @click="JumpLinkTo('/viewArticle', scope.row.id)"
          >
            {{ $t("article.viewArticle") }}
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框：修改文章信息 -->
    <el-dialog
      v-model="dialogSwitch.dialogArticleInfo"
      :title="$t('article.modifyInfo')"
    >
      <el-form :model="articleInfo">
        <el-form-item
          :label="$t('article.articleTitle')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="articleInfo.articleName"
            autocomplete="off"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          :label="$t('article.author')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="articleInfo.author"
            autocomplete="off"
            maxlength="12"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          :label="$t('article.isVisible')"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="articleInfo.isPublic">
            <el-radio label="0" size="large" border>{{
              $t("article.public")
            }}</el-radio>
            <el-radio label="-1" size="large" border>{{
              $t("article.conceal")
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('article.ArticleVisibility')"
          :label-width="formLabelWidth"
          v-if="articleInfo.isPublic !== '-1'"
        >
          <el-checkbox-group v-model="articleInfo.visualArr">
            <el-checkbox label="1" size="large" border>{{
              $t("article.tourist")
            }}</el-checkbox>
            <el-checkbox label="2" size="large" border>{{
              $t("article.normalUser")
            }}</el-checkbox>
            <el-checkbox label="3" size="large" border>{{
              $t("article.manager")
            }}</el-checkbox>
            <el-checkbox label="4" size="large" border>{{
              $t("article.superAdmin")
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <!-- 尾部内容 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.dialogArticleInfo = false">{{
            $t("article.cancel")
          }}</el-button>
          <el-button type="primary" @click="articleSubmit()">
            {{ $t("article.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 弹出框：修改文章内容 -->
    <el-dialog
      v-model="dialogSwitch.dialogArticleCon"
      :title="$t('article.modifyInfo')"
      width="50%"
    >
      <el-input
        v-model="articleInfo.articleCon"
        :autosize="{ minRows: 2, maxRows: 18 }"
        type="textarea"
        placeholder="Please input"
      />
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.dialogArticleCon = false">
            {{ $t("article.cancel") }}
          </el-button>
          <el-button type="primary" @click="articleConSubmit()">
            {{ $t("article.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 弹出框：删除文章 -->
    <el-dialog
      v-model="dialogSwitch.articleDelete"
      :title="$t('article.deleteArticle')"
      width="30%"
    >
      <span>{{ $t("article.keepDelete") }}</span>
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.articleDelete = false">
            {{ $t("article.cancel") }}
          </el-button>
          <el-button type="primary" @click="delSubmit()">
            {{ $t("article.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改理由 -->
    <el-dialog
      v-model="dialogSwitch.dialogReason"
      title="请您填写修改理由喔 亲~"
      width="30%"
    >
      <el-input
        v-model="articleInfo.modifyReason"
        :autosize="{ minRows: 2, maxRows: 10 }"
        type="textarea"
        placeholder="请填写修改理由"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.dialogReason = false">
            {{ $t("article.cancel") }}</el-button
          >
          <el-button type="primary" @click="getReason()">
            {{ $t("article.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
