<p align="center">
    <img src="./public/favicon.svg">
</p>

<h1 align="center">StudTWork</h1>

English | [简体中文](./README-ZH.md)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2?ref=badge_shield)

---

## Install

require:

- node >= `16`

```shell
$ git clone https://github.com/CodeGetters/studTWork.git

# Recommend to use yarn
$ yarn install

# or using npm

$ npm install

# There may be some problems with using pnpm ❗
$ pnpm install

```

## Usage

```shell
# dev
$ yarn dev

# build
$ yarn build

# Or maybe you want to package a background project with mock data
$ yarn build:mock
```

## Contribute

If you would like to work on the TODO project, please submit your pr to the dev branch 👀

Most important: Run a command to check your code before committing it 🤞

```shell
# This will prevent your code from being reset

$ yarn lint
```

## docker

```shell
docker buildx build .

# get the images_id
docker images

# open the http://localhost:8080
docker run -p 8080:80 images_id
```

## Feature

- user login ✔
- register ✔
- location ✔
- create article ✔
- preview article ✔
- article operation ✔
- Token ✔
- user operation 🕐
- authority ✔
- i18n 🕐
- theme 🕐
- image upload ✖
- notification ✖

## Community

We recommend that [issue](https://github.com/CodeGetters/StudTWork_backstage/issues) be used for problem feedback, or others:

- WeChat group

Under preparation...

## Sponsor this project

Sponsor this project to support our better creation. It is recommended to use afdian to subscribe, and your avatar will appear in this project.

### Afdian

[https://afdian.net/a/studtwork?tab=home](https://afdian.net/a/studtwork)

### Wechat / Alipay

## License

GNU

> The GNU GPL is the most widely used free software license and has a strong copyleft requirement. When distributing derived works, the source code of the work must be made available under the same license. There are multiple variants of the GNU GPL, each with different requirements.

# [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FCodeGetters%2FStudTWork2?ref=badge_large)
