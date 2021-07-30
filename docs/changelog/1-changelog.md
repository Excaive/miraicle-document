---
sidebar_position: 1
---

# 更新日志

## v0.3.6
> 发布于 2021.07.30

- 将 `Mirai` 和 `AsyncMirai` 类设置为单例模式，仅允许分别创建一个实例
- 给 `Mirai` 和 `AsyncMirai` 类添加 `session_info` 方法，用以获取 `session` 信息（[`mirai-api-http-v2.1.0`](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.1.0)）
- 给 `Message` 类添加 `at_me` 方法，可判断收到的消息中是否 at 了 bot
- 给 `Image`、`FlashImage` 和 `Voice` 类添加 `base64` 属性；添加 `from_base64` 方法，可通过传递 `base64` 编码（`bytes`）或路径（`str`）来构建相应的对象（[#1](https://github.com/Excaive/miraicle/issues/1)）
- 更改了 bot 发送的消息在终端的显示形式
- 修复了 `FlashImage` 显示成 `Image` 的问题

## v0.3.5
> 发布于 2021.07.09

- `Message` 类的 `time` 属性由字符串改为时间戳
- 修复了 `Message` 类的相等判断问题

## v0.3.4
> 发布于 2021.07.01

- 新增计划任务功能

## v0.3.3
> 发布于 2021.06.29

- 修复了 `AsyncMirai` 类使用 `ws adapter` 时响应速度慢的问题

## v0.3.2
> 发布于 2021.06.25

- 为各种过滤器添加了抽象基类 `BaseFilter`，提供了统一的接口
- 为各种消息元素添加了抽象基类 `Element`，简化了一些判断
- 新增对 `Poke` 消息类型的支持

## v0.3.1
> 发布于 2021.06.24

-  修复了 `AsyncMirai` 类无法使用过滤器的问题

## v0.3.0
> 发布于 2021.06.24

- 新增 `AsyncMirai` 类，新增对异步的支持

## v0.2.3
> 发布于 2021.06.22

- 对 `http adapter` 进行了优化

## v0.2.2
> 发布于 2021.06.22

- 修复了使用 `websocket` 时 `Mirai` 类的方法没有返回值的问题
- 弃用了 `mirai-api-http` 2.x 中移除的 `group_file_list` 和 `group_file_info` 方法

## v0.2.1
> 发布于 2021.06.21

- 新增对 `websocket` 的支持
- 新增对骰子（`Dice`）消息类型的支持

## v0.2.0
> 发布于 2021.06.16

- 适配 `mirai-api-http` 的 2.x 版本

## v0.1.2
> 发布于 2021.06.03

- 为 `Mirai` 类添加了一些注释和类型提示
- 修改 `Mirai` 类中一些方法的访问权限
- 修改过滤器的线程锁

## v0.1.1
> 发布于 2021.06.03

- 修改 `Python` 版本需求

## v0.1.0
> 发布于 2021.06.03

- 发布的首个版本