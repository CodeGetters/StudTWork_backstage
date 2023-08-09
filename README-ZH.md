<p align="center">
    <img src="./public/favicon.svg">
</p>

<h1 align="center">StudTWork</h1>

[English](./README.md) | 简体中文

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2?ref=badge_shield)

> 一个使用前后台使用 [Vue3.3](https://github.com/vuejs/core) + [Vite4](https://github.com/element-plus/element-plus)，后端使用 [koa2](https://github.com/koajs/koa) 构建打造的博客前后台系统。

---

## 下载

你应该有:

- node >= `16`

```shell
$ git clone https://github.com/CodeGetters/StudTWork_backstage.git

# 如果你想要连接后端
# 配置好后端并运行后需要在本项目根目录中新建 .env 文件
# 在 .env 文件中添加 VITE_BASE_URL="http://127.0.0.1:5000"
$ git clone https://github.com/CodeGetters/StudTWork_backend.git

# 推荐使用 yarn
$ yarn install

# 或者 npm

$ npm install

# 使用 pnpm 可能会出现一些问题 ❗
$ pnpm install

```

## 使用

如果你想要使用定位，在 .env 文件中添加你申请的高德开发者平台中 web 服务密钥

```.env
VITE_GAODE_API="your key"
```

```shell
# 运行
$ yarn dev

# 打包
$ yarn build

# 或者你想打包有 mock 数据的后台项目
$ yarn build:mock
```

## docker

```shell
docker buildx build .

# 获取镜像 id
docker images

# http://localhost:8080
docker run -p 8080:80 images_id
```

## TODO

- echarts 按需引入
- 完善 i18n
- TS 重构
- 主题样式优化
- 图片上传

## 贡献

如果你愿意做项目中的 `TODO` 中的内容，请将你的 `pr` 提交到 `dev` 分支 👀

最重要一点：请在提交代码前运行一下命令检查代码 🤞

```shell
# 这样会避免让你的代码不会被重置
$ yarn lint
```

## 交流群

我们建议使用[issue](https://github.com/CodeGetters/StudTWork_backstage/issues)进行问题反馈，或其他:

- 微信群

正在筹备中

## 赞助这个项目

赞助这个项目，支持我们更好的创作。建议使用爱发电订阅，您的头像将出现在此项目中。

### 爱发电

[https://afdian.net/a/studtwork?tab=home](https://afdian.net/a/studtwork)

### 微信支付 / 支付宝

![Wechat](./public/wechat.jpg)

![Alipay](./public/Alipay.jpg)

## 许可证

> GNU GPL是使用最广泛的自由软件许可证，并且有很强的copyleft要求。当发布衍生作品时，该作品的源代码必须在相同的许可下提供。GNU GPL有多种变体，每种变体都有不同的要求。
