---
sidebar_position: 3
---

# message

## 消息元素类型

包含 `Plain`、`At`、`AtAll`、`Face`、`Image`、`FlashImage`、`Voice`、`Xml`、`Json`、`App`、`Poke`、`Dice`、`File`、`MiraiCode`，详见 [消息链](../guides/5-message-chain.md)。

## 消息类型

### *class* `Message`

消息基类

#### `json`

- **说明：** `dict`，`mirai-api-http` 的原始 `json`

#### `msg_chain`

- **说明：** `dict`，`mirai-api-http` 的原始 `messageChain`

#### `id`

- **说明：** `int`，消息的 `messageId`

#### `time`

- **说明：** `int`，消息的时间戳

#### `chain`

- **说明：** `List[miraicle.Element]`，消息链列表

#### `text` 

- **说明：** 消息在控制台中打印出的格式

#### `plain`

- **说明：** 返回消息链中的所有文字

#### `first_image`

- **说明：** 返回消息链中的第一张图片（`Imagr` 或 `FlashImage`），没有图片则返回 `None`

#### `images`

- **说明：** 返回消息链中所有图片的列表

#### `file`

- **说明：** 返回消息链中的文件

#### `at_me()`

- **说明：** 返回这条消息中是否 at 了 bot

### *class* `GroupMessage`

`Message` 的子类，群消息

#### `sender`

- **说明：** 消息发送者的 qq 号

#### `sender_name`

- **说明：** 消息发送者的群名片

#### `group`

- **说明：** 消息发送的群号

#### `group_name`

- **说明：** 消息发送的群名称

### *class* `FriendMessage`

`Message` 的子类，好友消息

#### `sender`

- **说明：** 消息发送者的 qq 号

#### `sender_name`

- **说明：** 消息发送者的昵称

### *class* `TempMessage`

`Message` 的子类，群临时消息

#### `sender`

- **说明：** 消息发送者的 qq 号

#### `sender_name`

- **说明：** 消息发送者的群名片

#### `group`

- **说明：** 消息发送者来自的群号

#### `group_name`

- **说明：** 消息发送者来自的群名称

### *class* `GroupRecallEvent`

群消息撤回事件

TODO

### *class* `MemberCardChangeEvent`

群名片更改事件

TODO