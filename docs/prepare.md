---
sidebar_position: 2
---

# 准备

`miraicle` 是基于 [mirai-api-http](https://github.com/project-mirai/mirai-api-http) 的，`mirai-api-http` 又是 `mirai-console` 的一个插件。在使用 `miraicle` 之前，请按照 `mirai-api-http` 的文档进行环境搭建和插件配置。

你可以使用 [mirai-console-loader](https://github.com/iTXTech/mirai-console-loader) ，它会对 `mirai-console` 进行一键启动和自动更新。安装好 `mirai-api-http` 之后，将 `mirai-api-http` 的 `setting.yml` 模板复制粘贴到配置文件里，并自己设置一个 `verifyKey` 和 `port`。

:::info 注意

`mirai-api-http` 目前已经更新到 `2.x` 版本，这与 `1.x` 版本相比有不少变动。`miraicle` 仅支持 `2.x` 版本的 `mirai-api-http` ，请检查你的 `mirai-api-http` 版本是否正确。

:::