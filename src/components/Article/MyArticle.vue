<script setup>
import { ref, onMounted } from "vue";
import {
  personalArticle,
  updatePersonal,
  updateCon,
  deletePersonal,
} from "@/api/article";
import { getArticleList } from "@/utils/articleList";
import i18n from "@/i18n";
const tableData = ref();
const formLabelWidth = "100px";

// 弹出框控制
const dialogSwitch = ref({
  dialogArticleCon: false,
  dialogArticleInfo: false,
  articleDelete: false,
});

// 修改文章
const articleInfo = ref({
  id: "",
  articleName: "",
  author: "",
  isPublic: "",
  visualArr: [],
  visualRange: "",
  articleCon: "",
});

// 修改结果
const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: !msg ? "操作成功" : msg,
    type,
  });
};

// 自动显示文章信息
// -1 -> 隐藏||0 -> 公开(1234)||1 -> 游客||2 -> 普通用户||3 -> 管理员||4 -> 超级管理员
const getArticleInfo = (info) => {
  const proxyInfo = new Proxy(info, {});

  // 自动填充原有的信息
  if (proxyInfo.visualRange === "-1") {
    proxyInfo.isPublic = "-1";
  } else if (proxyInfo.visualRange === "0") {
    proxyInfo.isPublic = "0";
    proxyInfo.visualArr = ["1", "2", "3", "4"];
  } else {
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
    const res = await updatePersonal(articleInfo).catch((err) => {
      messageTip("error", "操作失败");
      console.log(err);
    });
    if (res.msg !== "success") {
      messageTip("error", res.msg);
    } else {
      // 刷新页面数据
      getArticleList(tableData, personalArticle);
      messageTip("success");
    }
  }
  dialogSwitch.value.dialogArticleInfo = false;
};

// 自动显示文章内容
const getArticleCon = (info) => {
  const proxyInfo = new Proxy(info, {});

  articleInfo.value = {
    ...proxyInfo,
  };

  dialogSwitch.value.dialogArticleCon = true;
};

// 提交修改后的文章内容
const articleConSubmit = async () => {
  const res = await updateCon(articleInfo).catch((err) => {
    messageTip("error", "操作失败");
    console.log(err);
  });
  if (res.msg !== "success") {
    messageTip("error", res.msg);
  } else {
    // 刷新页面数据
    getArticleList(tableData, personalArticle);
    messageTip("success");
  }
  dialogSwitch.value.dialogArticleCon = false;
};

// 获取需要删除的文章 id
const deleteArticle = (id) => {
  articleInfo.value.id = id;
  dialogSwitch.value.articleDelete = true;
};

// 确认删除文章
const delSubmit = async () => {
  const res = await deletePersonal(articleInfo).catch((err) => {
    messageTip("error", "操作失败");

    console.log(err);
  });
  if (res.msg === "success") {
    getArticleList(tableData, personalArticle);
    messageTip("success");
  } else {
    messageTip("error", res.msg);
  }
  dialogSwitch.value.articleDelete = false;
};

// TODO：将文章分离出来单独做一个文章管理菜单：包括：管理自己的文章，管理权限内可修改的文章
// 当然，这个要经过超管同意(也就是给超管发送站内信)
onMounted(() => {
  getArticleList(tableData, personalArticle);
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
            @click="deleteArticle(scope.row.id, scope.$index)"
          >
            {{ $t("article.deleteArticle") }}
          </el-check-tag>
          <!-- 查看文章 -->
          <el-check-tag
            checked
            class="ml-2"
            @click="deleteArticle(scope.row.id, scope.$index)"
          >
            {{ $t("article.deleteArticle") }}
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
  </div>
</template>

<style lang="less" scoped></style>
