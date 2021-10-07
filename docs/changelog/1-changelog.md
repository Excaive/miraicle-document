---
sidebar_position: 1
---

# 更新日志

## v0.3.10
> 发布于 2021.10.07

- **【新增】** 给 `Mirai` 和 `AsyncMirai` 类添加 `member_admin` 方法，用于修改群员的管理员权限（[mirai-api-http-v2.3.0](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.3.0)）
- **【新增】** 给 `Mirai` 和 `AsyncMirai` 类的 `file_list`、`file_info` 方法添加 `path` 参数用于模糊定位（群文件相同目录可重名）, 优先级高于 `dir_id` 和 `file`（[mirai-api-http-v2.3.0](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.3.0)）
- **【新增】** 给 `Voice` 类添加 `length` 参数（[mirai-api-http-v2.3.0](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.3.0)）
- **【新增】** 给 `Mirai` 和 `AsyncMirai` 类添加 `delete_friend` 方法，用于删除好友；添加 `set_essence` 方法，用于设置群精华消息
- **【新增】** 给 `Message` 类添加 `voice` 方法，可返回消息链中的语音
- **【优化】** `Mirai` 类使用线程池，降低线程创建和销毁造成的开销
- **【调整】** `Mirai` 和 `AsyncMirai` 类的 `recall` 方法 `id` 参数更改为 `msg_id`
- **【弃用】** 统一接口名称，弃用 `Mirai` 和 `AsyncMirai` 类中的 `get_version`、`get_friend_list`、`get_group_list`、`get_member_list` 方法，由 `version`、`friend_list`、`group_list`、`member_list` 代替

## v0.3.9
> 发布于 2021.09.06

- **【修复】** 修复了 `Mirai` 和 `AsyncMirai` 类中 `recall` 方法无效的问题（[#12](https://github.com/Excaive/miraicle/discussions/12)）

## v0.3.8
> 发布于 2021.09.06

- **【修复】** 修复了 `Mirai` 和 `AsyncMirai` 类中 `is_owner` 和 `is_administrator` 方法抛出异常的问题，以及判断 bot 自身权限结果错误的问题
- **【修复】** 修复了 `Mirai` 和 `AsyncMirai` 类中 `mute`、`unmute`、`kick`、`quit`、`mute_all`、`unmute_all` 方法无效的问题（[#12](https://github.com/Excaive/miraicle/discussions/12)）

## v0.3.7
> 发布于 2021.08.10

- **【新增】** 新增对 `MiraiCode` 的支持，可作为一种消息类型使用（[`mirai-api-http-v2.2.0`](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.2.0)）
- **【新增】** `Mirai` 和 `AsyncMirai` 类的 `file_list` 和 `file_info` 方法新增参数 `with_download_info`，可返回额外的下载信息（[`mirai-api-http-v2.2.0`](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.2.0)）
- **【修复】** 修复了电脑从睡眠状态恢复时，已过期的定时任务被错误触发的问题
- **【优化】** 优化了 `Mirai` 和 `AsyncMirai` 类中 `ws adapter` 获取响应的方式
- **【调整】** 对 bot 发送的消息在终端的显示形式作进一步调整，可显示消息的 `id`、类型和发送的对象
- **【移除】** 移除 `Mirai` 类中已弃用的 `group_file_list` 和 `group_file_info` 方法

## v0.3.6
> 发布于 2021.07.30

- **【新增】** 给 `Mirai` 和 `AsyncMirai` 类添加 `session_info` 方法，用以获取 `session` 信息（[`mirai-api-http-v2.1.0`](https://github.com/project-mirai/mirai-api-http/releases/tag/v2.1.0)）
- **【新增】** 给 `Message` 类添加 `at_me` 方法，可判断收到的消息中是否 at 了 bot
- **【新增】** 给 `Image`、`FlashImage` 和 `Voice` 类添加 `base64` 属性；添加 `from_base64` 方法，可通过传递 `base64` 编码（`bytes`）或路径（`str`）来构建相应的对象（[#1](https://github.com/Excaive/miraicle/issues/1)）
- **【修复】** 修复了 `FlashImage` 显示成 `Image` 的问题
- **【调整】** 更改了 bot 发送的消息在终端的显示形式
- **【调整】** 将 `Mirai` 和 `AsyncMirai` 类设置为单例模式，仅允许分别创建一个实例

## v0.3.5
> 发布于 2021.07.09

- **【修复】** 修复了 `Message` 类的相等判断问题
- **【调整】** `Message` 类的 `time` 属性由字符串改为时间戳

## v0.3.4
> 发布于 2021.07.01

- **【新增】** 新增计划任务功能

## v0.3.3
> 发布于 2021.06.29

- **【优化】** 提高了 `AsyncMirai` 类使用 `ws adapter` 时的响应速度

## v0.3.2
> 发布于 2021.06.25

- **【新增】** 新增对 `Poke` 消息类型的支持
- **【调整】** 为各种过滤器添加了抽象基类 `BaseFilter`，提供了统一的接口
- **【调整】** 为各种消息元素添加了抽象基类 `Element`，简化了一些判断

## v0.3.1
> 发布于 2021.06.24

- **【修复】** 修复了 `AsyncMirai` 类无法使用过滤器的问题

## v0.3.0
> 发布于 2021.06.24

- **【新增】** 新增 `AsyncMirai` 类，新增对异步的支持

## v0.2.3
> 发布于 2021.06.22

- **【优化】** 对 `http adapter` 进行了优化，所有请求使用同一个 `session`

## v0.2.2
> 发布于 2021.06.22

- **【修复】** 修复了使用 `ws adapter` 时 `Mirai` 类的方法没有返回值的问题
- **【弃用】** 弃用了 `mirai-api-http` 2.x 中移除的 `group_file_list` 和 `group_file_info` 方法，由 `file_list`、`file_info` 代替

## v0.2.1
> 发布于 2021.06.21

- **【新增】** 新增对 `websocket` 的支持
- **【新增】** 新增对骰子（`Dice`）消息类型的支持

## v0.2.0
> 发布于 2021.06.16

- **【调整】** 适配 `mirai-api-http` 的 2.x 版本

## v0.1.2
> 发布于 2021.06.03

- **【优化】** 为 `Mirai` 类添加了一些注释和类型提示
- **【优化】** 修改过滤器的线程锁
- **【调整】** 修改 `Mirai` 类中一些方法的访问权限

## v0.1.1
> 发布于 2021.06.03

- **【调整】** 修改 `Python` 版本需求

## v0.1.0
> 发布于 2021.06.03

- **【新增】** 发布的首个版本
